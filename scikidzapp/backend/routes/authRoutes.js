import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const createToken = ( user ) => {
    return jwt.sign(
        { id: user._id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

router.post('/register', async (req, res) => {
    try {
       console.log('Incoming registration payload:', req.body); 
       
        const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.'});
    } 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ error: 'Email already in use.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        passwordHash,
    });
    
    const token = jwt.sign(
        { id: user._id, email: user.email, role:  user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(201).json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
} catch (err) {
    console.error('Registration error', err);
    res.status(500).json({ error: 'Server error during registration.'});
}
});



router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      const token = createToken(user);
  
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error during login.' });
    }
  });

export default router;
