const router = require('express').Router();

const { handlerUsers } = require('../services/db');
const { generalErrorMessages, clientErrorMessages } = require('../utils/error_messages');
const verifyId = require('../utils/verifyId');

router.get('/', async (req, res) => {
  try {
    const users = await handlerUsers.get();
    res.status(200).json(users);

  } catch (err) {
    res.status(500).json({"Error": err})
  }
})

router.get('/:id', async (req, res) => {
  try {
    verifyId(req.params.id);

    const users = await handlerUsers.get(req.params.id);

    if (users.length === 0) {
      throw new Error(clientErrorMessages.notfound)
    }

    res.status(200).json(users);

  } catch (err) {
    switch (err.message) {
      case clientErrorMessages.notfound:
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
    const newUser = await handlerUsers.create(req.body);
    res.status(201).json(newUser);

  } catch (err) {
    if (err.errno == 1062) {
      res.status(400).json({"error": clientErrorMessages.cpfAlreadyExists});
    }
    res.status(500).json({"error": err});
  }
})

router.put('/:id', async (req, res) => {
  try {
    verifyId(req.params.id);

    const updatedUser = await handlerUsers.update(req.body, req.params.id);
    if (updatedUser.userUpdatedData.affectedRows === 0) {
      throw new Error(clientErrorMessages.notfound)
    }

    res.status(200).json(updatedUser);
    
  } catch (err) {
    const invalidIdValueOrType = err.message === generalErrorMessages.invalidIdValue | err.message === generalErrorMessages.invalidIdType;
    
    if (invalidIdValueOrType) {
      res.status(400).json({"error": err.message});
    } else if (err.message === clientErrorMessages.notfound) {
      res.status(404).json({"error": clientErrorMessages.notfound})
    } else {
      res.status(500).json({"error": err});
    }
  }
})

router.delete('/:id', async (req, res) => {
  try {
    verifyId(req.params.id);

    const deletedUser = await handlerUsers.delete(req.params.id);
    res.status(200).json(deletedUser);
    
  } catch (err) {
    const invalidIdValueOrType = err.message === generalErrorMessages.invalidIdValue | err.message === generalErrorMessages.invalidIdType;
    
    if (invalidIdValueOrType) {
      res.status(400).json({"error": err.message});
    } else if (err.message === clientErrorMessages.notfound) {
      res.status(404).json({"error": clientErrorMessages.notfound})
    } else {
      res.status(500).json({"error": err});
    }
  }
})

module.exports = router