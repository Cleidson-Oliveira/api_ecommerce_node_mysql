const router = require('express').Router();

const { handlerOrders } = require('../services/db');
const { orderErrorMessages } = require('../utils/error_messages');

router.get('/', async (req, res) => {
  try {
    const orders = await handlerOrders.get();

    res.status(200).json(orders);

  } catch (err) {
    res.status(500).json({"error": err.message});
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (id <= 0) {
      throw new RangeError(orderErrorMessages.invalidIdValue);
    }
    if (!id) {
      throw new TypeError(orderErrorMessages.invalidIdType);
    }
    
    const orders = await handlerOrders.get(id);

    if (orders.length === 0) {
      throw new Error(orderErrorMessages.notfound);
    }

    res.status(200).json(orders);
    
  } catch (err) {
    switch (err.message) {
      case orderErrorMessages.notfound:
        res.status(404).json({"error": err.message});
      break;
      case orderErrorMessages.invalidIdType:
      case orderErrorMessages.invalidIdValue:
        res.status(400).json({"error": err.message});
      break;
    
      default:
        res.status(500).json({"error": err.message});

      break;
    }
  }

})

router.post('/', async (req, res) => {
  try {
    const newOrder = await handlerOrders.create(req.body);
    res.status(201).json(newOrder);
    
  } catch (err) {

    if (err.errno == 1451 | err.errno == 1452) {
      res.status(400).json({"error": orderErrorMessages.invalidClientIdOrProductId});
    } else {
      res.status(500).json({"error": err});
    }
  }

})

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (id <= 0) {
      throw new RangeError(orderErrorMessages.invalidIdValue);
    }
    if (!id) {
      throw new TypeError(orderErrorMessages.invalidIdType);
    }

    const updatedOrder = await handlerOrders.update(req.body, id);
    res.status(200).json(updatedOrder);
    
  } catch (err) {
    const invalidIdValueOrType = err.message === orderErrorMessages.invalidIdValue | err.message === orderErrorMessages.invalidIdType;
    
    if (err.errno == 1451 | err.errno == 1452) {
      res.status(400).json({"error": orderErrorMessages.invalidClientIdOrProductId});
    } else if (invalidIdValueOrType) {
      res.status(400).json({"error": err.message});
    } else {
      res.status(500).json({"error": err});
    }
  }

})

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (id <= 0) {
      throw new RangeError(orderErrorMessages.invalidIdValue);
    }
    if (!id) {
      throw new TypeError(orderErrorMessages.invalidIdType);
    }

    const deletedOrder = await handlerOrders.delete(id);

    if (deletedOrder.affectedRows === 0) {
      throw new Error(orderErrorMessages.notfound)
    }

    res.status(200).json(deletedOrder);
    
  } catch (err) {
    const invalidIdValueOrType = err.message === orderErrorMessages.invalidIdValue | err.message === orderErrorMessages.invalidIdType;
    
    if (invalidIdValueOrType) {
      res.status(400).json({"error": err.message});
    } else if (err.message === orderErrorMessages.notfound) {
      res.status(404).json({"error": orderErrorMessages.notfound})
    } else {
      res.status(500).json({"error": err});
    }
  }

})

module.exports = router