import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            passwordHash: password
        });
        await user.save()
        res.status(201).json(user)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

export default router