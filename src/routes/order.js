const router = require('express').Router();

const { handlerOrders } = require('../services/db');
const verifyId = require('../utils/verifyId');

router.post('/', async (req, res, next) => {
  try {
    const newOrder = await handlerOrders.create(req.body);
    res.status(201).json(newOrder);
    
  } catch (err) {
    next(err);
  }

})

router.get('/', async (req, res, next) => {
  try {
    const orders = await handlerOrders.get();

    res.status(200).json(orders);

  } catch (err) {
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    verifyId(req.params.id);
    
    const orders = await handlerOrders.get(req.params.id);

    res.status(200).json(orders);
    
  } catch (err) {
    next(err);
  }

})

router.put('/:id', async (req, res, next) => {
  try {
    verifyId(req.params.id);

    const updatedOrder = await handlerOrders.update(req.body, req.params.id);
    res.status(200).json(updatedOrder);
    
  } catch (err) {
    next(err);
  }

})

router.delete('/:id', async (req, res, next) => {
  try {
    verifyId(req.params.id);

    const deletedOrder = await handlerOrders.delete(req.params.id);

    res.status(200).json(deletedOrder);
    
  } catch (err) {
    next(err);
  }

})

module.exports = router