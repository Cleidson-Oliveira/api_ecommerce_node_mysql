const router = require('express').Router();

const { handlerUsers } = require('../services/db');

router.get('/', async (req, res) => {
  try {
    const id = parseInt(req.query.id);

    const users = await handlerUsers.get(id);
    res.status(200).json(users);

  } catch (err) {
    console.log(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const newUser = await handlerUsers.create(req.body);
    res.status(201).json(newUser);

  } catch (err) {
    console.log(err);
  }
})

router.put('/', async (req, res) => {
  try {
    const updatedUser = await handlerUsers.update(req.body);
    res.json(updatedUser);
    
  } catch (err) {
    console.log(err);
  }
})

router.delete('/', async (req, res) => {
  try {
    const id = parseInt(req.query.id);

    const deletedUser = await handlerUsers.delete(id);
    res.json(deletedUser);
    
  } catch (err) {
    console.log(err);
  }
})

module.exports = router