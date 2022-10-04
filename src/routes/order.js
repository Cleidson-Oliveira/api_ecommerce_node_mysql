const router = require('express').Router();

const { handlerOrders } = require('../services/db');

router.get('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const orders = await handlerOrders.get(id);
  res.status(200).json(orders);
})

router.post('/', async (req, res) => {
  const newOrder = await handlerOrders.create(req.body);
  res.status(201).json(newOrder);
})

router.put('/', async (req, res) => {
  const updatedOrder = await handlerOrders.update(req.body);
  res.json(updatedOrder);
})

router.delete('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const deletedOrder = await handlerOrders.delete(id);
  res.json(deletedOrder);
})

module.exports = router