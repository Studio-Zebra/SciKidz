import express from 'express'
import Lesson from '../models/Lesson.js'
const router = express.Router()

router.post('/', async (req, res) => {
    const lesson = new Lesson(req.body)
    await lesson.save()
    res.status(201).json(lesson)
})

router.get('/', async (req, res) => {
    const lessons = await Lesson.find()
    res.json(lessons)
})

router.get('/:id', async (req, res) => {
    const lesson = await lesson.findById(req.params.id)
    res.json(lesson)
})

export default router