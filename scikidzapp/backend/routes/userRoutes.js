import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        console.log('Incoming body: ', req.body)
        const { name, email, password } = req.body;

if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields required'})
}

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