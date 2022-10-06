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

    if (/REFERENCED/.test(err.code)) {
      res.status(400).json({"error": orderErrorMessages.invalidClientIdOrProductId});
    } else {
      res.status(500).json({"error": err});
    }
  }

})

router.put('/', async (req, res) => {
  try {
    const updatedOrder = await handlerOrders.update(req.body);
    res.json(updatedOrder);
    
  } catch (err) {
    console.log(err);
  }

})

router.delete('/', async (req, res) => {
  try {
    const id = parseInt(req.query.id);

    const deletedOrder = await handlerOrders.delete(id);
    res.json(deletedOrder);
    
  } catch (err) {
    console.log(err);
  }

})

module.exports = router