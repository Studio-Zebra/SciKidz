import express from 'express'
import Progress from '../models/Progress.js'

const router = express.Router()

// POST /progress
router.post('/', async (req, res) => {
  try {
    const { userId, lessonId, completionPercent, score } = req.body

    if (!userId || !lessonId) {
      return res.status(400).json({ error: 'userId and lessonId are required.' })
    }

    // Support either completionPercent or score from client
    const raw = completionPercent ?? score
    const n = Number(raw)

    if (!Number.isFinite(n)) {
      return res.status(400).json({ error: 'completionPercent (or score) must be a number.' })
    }

    const percent = Math.max(0, Math.min(100, Math.round(n)))

    const progress = await Progress.findOneAndUpdate(
      { userId, lessonId },
      {
        $set: {
          'quiz.lastScore': percent,
          'quiz.lastAttemptAt': new Date(),
        },
        $max: {
          'quiz.bestScore': percent,
          completionPercent: percent, // keep best module completion %
        },
        $inc: { 'quiz.attempts': 1 },
      },
      { upsert: true, new: true, runValidators: true }
    )

    // NOTE: completionStatus will NOT be updated by your pre('save') hook here,
    // because findOneAndUpdate doesn't run save middleware.
    // We can compute it server-side and include it in the update:
    const status =
      percent <= 0 ? 'not_started' : percent >= 100 ? 'completed' : 'in_progress'

    // Ensure status stays consistent in the stored document
    if (progress.completionStatus !== status) {
      progress.completionStatus = status
      await progress.save()
    }

    return res.json(progress)
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: 'Progress already exists, retry.' })
    }
    return res.status(500).json({ error: 'Server error', details: err?.message })
  }
})

// GET /progress/:userId  (you had '/userId' before — this is the correct param form)
router.get('/:userId', async (req, res) => {
  try {
    const data = await Progress.find({ userId: req.params.userId })
      .populate('lessonId')
      .sort({ updatedAt: -1 })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err?.message })
  }
})

// OPTIONAL: GET /progress/:userId/lesson/:lessonId (single module progress)
router.get('/:userId/lesson/:lessonId', async (req, res) => {
  try {
    const { userId, lessonId } = req.params
    const doc = await Progress.findOne({ userId, lessonId }).populate('lessonId')
    res.json(doc)
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err?.message })
  }
})

export default router
