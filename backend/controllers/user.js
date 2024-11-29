// controllers/userController.js
const userService = require('../services/user');

exports.createUser = async (req, res) => {
  try {
    const { googleId, name, email } = req.body;

    // Validate required fields
    if (!googleId || !name || !email) {
      return res.status(400).json({ message: 'Required fields missing', error: 'Missing required fields' });
    }

    const newUser = await userService.createUser({ googleId, name, email });
    return res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ message: 'Users fetched successfully', data: users });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found', error: 'User not found' });
    }

    return res.status(200).json({ message: 'User fetched successfully', data: user });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { googleId, name, email } = req.body;

    const updatedUser = await userService.updateUser(id, { googleId, name, email });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found', error: 'User not found' });
    }

    return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found', error: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully', data: deletedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
