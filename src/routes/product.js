const router = require('express').Router();

const { 
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require('../services/db');

router.get('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const products = await getProducts(id);
  res.status(200).json(products);
})

router.post('/', async (req, res) => {
  const newProduct = await createProduct(req.body);
  res.status(201).json(newProduct);
})

router.put('/', async (req, res) => {
  const updatedProduct = await updateProduct(req.body);
  res.json(updatedProduct);
})

router.delete('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const deletedProduct = await deleteProduct(id);
  res.json(deletedProduct);
})

module.exports = router