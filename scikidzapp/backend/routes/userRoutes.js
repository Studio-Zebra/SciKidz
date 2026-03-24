import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();
import bcrypt from 'bcrypt';

// ----------------------------------
// GET logged-in user's info
// ----------------------------------
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('GET /me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// ----------------------------------
// UPDATE logged-in user's info
// ----------------------------------
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { username, firstName, lastName, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, firstName, lastName, email },
      { new: true }
    ).select('-passwordHash');

    res.json(updatedUser);
  } catch (error) {
    console.error('PUT /me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ----------------------------------
// DELETE logged-in user's account
// ----------------------------------
router.delete('/me', authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    await User.findByIdAndDelete(req.user.id);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('DELETE /me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    console.error('GET /users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
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