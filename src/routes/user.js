const router = require('express').Router();

const { 
  getUsers, 
  createUser, 
  deleteUser, 
  updateUser, 
} = require('../services/db');

router.get('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const users = await getUsers(id);
  res.status(200).json(users);
})

router.post('/', async (req, res) => {
  const newUser = await createUser(req.body);
  res.status(201).json(newUser);
})

router.put('/', async (req, res) => {
  const updatedUser = await updateUser(req.body);
  res.json(updatedUser);
})

router.delete('/', async (req, res) => {
  const id = parseInt(req.query.id);

  const deletedUser = await deleteUser(id);
  res.json(deletedUser);
})

module.exports = router