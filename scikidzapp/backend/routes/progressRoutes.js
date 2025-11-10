import express from 'express'
import Progress from '../models/Progress.js'
const router = express.Router()

router.post('/', async (req,res) => {
    const { userId, lessonId, score, completionStatus } = req.body

    const progress = await Progress.findOneAndUpdate(
        { userId, lessonId },
        { score, completionStatus, updatedAt: new Date() },
        { upsert: true, new: true }
    )

    res.json(progress)
})

router.get('/userId', async (req,res) => {
    const data = await Progress.find({ userId: req.params.userId }).populate('lessonId')
    res.json(data)
})

export default router