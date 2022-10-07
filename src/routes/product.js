const router = require('express').Router();

const { handlerProducts } = require('../services/db');
const { productErrorMessages, generalErrorMessages } = require('../utils/error_messages');
const verifyId = require('../utils/verifyId');

router.get('/', async (req, res) => {
  try {
    const products = await handlerProducts.get();
    res.status(200).json(products);

  } catch (err) {
    res.status(500).json({"Error": err})
  }
})

router.get('/:id', async (req, res) => {
  try {
    verifyId(req.params.id);

    const products = await handlerProducts.get(req.params.id);

    if (products.length === 0) {
      throw new Error(productErrorMessages.notfound)
    }

    res.status(200).json(products);

  } catch (err) {
    switch (err.message) {
      case productErrorMessages.notfound:
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
    const newProduct = await handlerProducts.create(req.body);
    res.status(201).json(newProduct);

  } catch (err) {
    res.status(500).json({"error": err});
  }
})

router.put('/:id', async (req, res) => {
  try {
    verifyId(req.params.id);

    const updatedProduct = await handlerProducts.update(req.body, parseInt(req.params.id));
    
    if (updatedProduct.productUpdatedData.affectedRows === 0) {
      throw new Error(productErrorMessages.notfound)
    }

    res.json(updatedProduct);

  } catch (err) {
    const invalidIdValueOrType = err.message === generalErrorMessages.invalidIdValue | err.message === generalErrorMessages.invalidIdType;
    
    if (invalidIdValueOrType) {
      res.status(400).json({"error": err.message});
    } 
    else if (err.message === productErrorMessages.notfound) {
      res.status(404).json({"error": productErrorMessages.notfound})
    }

    res.status(500).json({"error": err});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    verifyId(req.params.id);

    const deletedProduct = await handlerProducts.delete(req.params.id);
    res.json(deletedProduct);

  } catch (err) {
    const invalidIdValueOrType = err.message === generalErrorMessages.invalidIdValue | err.message === generalErrorMessages.invalidIdType;
    
    if (invalidIdValueOrType) {
      res.status(400).json({"error": err.message});
    }
    else if (err.message === productErrorMessages.notfound) {
      res.status(404).json({"error": productErrorMessages.notfound})
    }

    res.status(500).json({"error": err});
  }
})

module.exports = router