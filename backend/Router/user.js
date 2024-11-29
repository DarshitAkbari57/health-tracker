// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// POST: Create user
router.post('/', userController.createUser);

// GET: Get all users
router.get('/', userController.getAllUsers);

// GET: Get user by ID
router.get('/:id', userController.getUserById);

// PUT: Update user by ID
router.put('/:id', userController.updateUser);

// DELETE: Delete user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
