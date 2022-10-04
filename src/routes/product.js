const router = require('express').Router();

const { handlerProducts } = require('../services/db');

router.get('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const products = await handlerProducts.get(id);
  res.status(200).json(products);
})

router.post('/', async (req, res) => {
  const newProduct = await handlerProducts.create(req.body);
  res.status(201).json(newProduct);
})

router.put('/', async (req, res) => {
  const updatedProduct = await handlerProducts.update(req.body);
  res.json(updatedProduct);
})

router.delete('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const deletedProduct = await handlerProducts.delete(id);
  res.json(deletedProduct);
})

module.exports = router