const router = require('express').Router();

const { handlerUsers } = require('../services/db');
const { generalErrorMessages, clientErrorMessages } = require('../utils/error_messages');
const verifyId = require('../utils/verifyId');

router.post('/', async (req, res, next) => {
  try {
    const newUser = await handlerUsers.create(req.body);
    res.status(201).json(newUser);

  } catch (err) {
    next(err);
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await handlerUsers.get();
    res.status(200).json(users);

  } catch (err) {
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    verifyId(req.params.id);

    const users = await handlerUsers.get(req.params.id);

    res.status(200).json(users);

  } catch (err) {
    next(err);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    verifyId(req.params.id);

    const updatedUser = await handlerUsers.update(req.body, req.params.id);

    res.status(200).json(updatedUser);
    
  } catch (err) {
    next(err);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    verifyId(req.params.id);

    const deletedUser = await handlerUsers.delete(req.params.id);

    res.status(200).json(deletedUser);
    
  } catch (err) {
    next(err);
  }
})

module.exports = router