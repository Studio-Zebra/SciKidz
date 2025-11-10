import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
               ref: 'User', 
               required: true
    },
    lessonId: { type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson',
                required: true
    },
    completionStatus: { type: String,
                        enum: ['not_started','in_progress', 'completed'],
                        default: 'not_started'
    },
    score: { type: Number,
         default: 0
    },
    updatedAt: { type: Date,
         default: Date.now 
    }
})

export default mongoose.model('Progress', progressSchema)