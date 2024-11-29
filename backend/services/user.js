// services/user.js
const db = require("../models");

exports.createUser = async (userData) => {
  try {
    const newUser = await db.User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    return user;
  } catch (error) {
    throw new Error('Error fetching user');
  }
};

exports.updateUser = async (id, userData) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(userData);
    return user;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return user;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};
