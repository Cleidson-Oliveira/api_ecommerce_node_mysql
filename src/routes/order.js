const router = require('express').Router();

const { handlerOrders } = require('../services/db');

router.get('/', async (req, res) => {
  try {
    const id = parseInt(req.query.id);

    const orders = await handlerOrders.get(id);
    res.status(200).json(orders);
    
  } catch (err) {
    console.log(err);
  }

})

router.post('/', async (req, res) => {
  try {
    const newOrder = await handlerOrders.create(req.body);
    res.status(201).json(newOrder);
    
  } catch (err) {
    console.log(err);
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