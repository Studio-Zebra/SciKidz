import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// ----------------------------------
// GET logged-in user's info
// ----------------------------------
router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json(user);
});

// ----------------------------------
// UPDATE logged-in user's info
// ----------------------------------
router.put('/me', authMiddleware, async (req, res) => {
  const { username, firstName, lastName, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { username, firstName, lastName, email },
    { new: true }
  ).select('-passwordHash');

  res.json(updatedUser);
});

// ----------------------------------
// DELETE logged-in user's account
// ----------------------------------
router.delete('/me', authMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.user.id);
  res.json({ message: 'Account deleted' });
});

// ----------------------------------
// ADMIN protected: get all users
// ----------------------------------
router.get('/', authMiddleware, async (req, res) => {
  // optionally check req.user.role === "admin"
  const users = await User.find().select('-passwordHash');
  res.json(users);
});

export default router;