import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { decodeToken } from '../middlewares/decodeToken';

const router = express.Router();

// Get all users
// router.get('/', getAllUsers);

// Get a single user by ID
// router.get('/:id', getUserById);

// Create a new user
// router.post('/', createUser);

// Update a user by ID
// router.put('/', decodeToken, updateUser);

// Delete a user by ID
// router.delete('/:id', deleteUser);

export default router;
