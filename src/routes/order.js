const router = require('express').Router();

const { handlerOrders } = require('../services/db');
const { orderErrorMessages, generalErrorMessages } = require('../utils/error_messages');
const verifyId = require('../utils/verifyId');

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
    verifyId(req.params.id);
    
    const orders = await handlerOrders.get(req.params.id);

    if (orders.length === 0) {
      throw new Error(orderErrorMessages.notfound);
    }

    res.status(200).json(orders);
    
  } catch (err) {
    switch (err.message) {
      case orderErrorMessages.notfound:
        res.status(404).json({"error": err.message});
      break;
      case generalErrorMessages.invalidIdType:
      case generalErrorMessages.invalidIdValue:
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
    verifyId(req.params.id);

    const updatedOrder = await handlerOrders.update(req.body, req.params.id);
    res.status(200).json(updatedOrder);
    
  } catch (err) {
    const invalidIdValueOrType = err.message === generalErrorMessages.invalidIdValue | err.message === generalErrorMessages.invalidIdType;
    
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
    verifyId(req.params.id);

    const deletedOrder = await handlerOrders.delete(req.params.id);

    if (deletedOrder.affectedRows === 0) {
      throw new Error(orderErrorMessages.notfound)
    }

    res.status(200).json(deletedOrder);
    
  } catch (err) {
    const invalidIdValueOrType = err.message === generalErrorMessages.invalidIdValue | err.message === generalErrorMessages.invalidIdType;
    
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