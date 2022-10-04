const router = require('express').Router();

const { handlerProducts } = require('../services/db');

router.get('/', async (req, res) => {
  try {
    const id = parseInt(req.query.id);

    const products = await handlerProducts.get(id);
    res.status(200).json(products);

  } catch (err) {
    console.log(err);
  }

})

router.post('/', async (req, res) => {
  try {
    const newProduct = await handlerProducts.create(req.body);
    res.status(201).json(newProduct);

  } catch (err) {
    console.log(err);
  }
})

router.put('/', async (req, res) => {
  try {
    const updatedProduct = await handlerProducts.update(req.body);
    res.json(updatedProduct);

  } catch (err) {
    console.log(err);
  }
})

router.delete('/', async (req, res) => {
  try {
    const id = parseInt(req.query.id);

    const deletedProduct = await handlerProducts.delete(id);
    res.json(deletedProduct);

  } catch (err) {
    console.log(err);
  }
})

module.exports = router