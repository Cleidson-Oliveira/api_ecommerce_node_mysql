const router = require('express').Router();

const { handlerUsers } = require('../services/db');

router.get('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const users = await handlerUsers.get(id);
  res.status(200).json(users);
})

router.post('/', async (req, res) => {
  const newUser = await handlerUsers.create(req.body);
  res.status(201).json(newUser);
})

router.put('/', async (req, res) => {
  const updatedUser = await handlerUsers.update(req.body);
  res.json(updatedUser);
})

router.delete('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const deletedUser = await handlerUsers.delete(id);
  res.json(deletedUser);
})

module.exports = router