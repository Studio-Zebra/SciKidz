import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
               ref: 'User', 
               required: true
    },
    lessonId: { type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson',
                required: true,
                index: true,
    },
    completionPercent: { type: Number,
                        min: 0,
                        max: 100,
                        default: 0,
    },
    completionStatus: {
                         type: String,
                         enum: ['not_started', 'in_progress', 'completed'],
                         default: 'not_started',
    },
    quiz: {
     bestScore: { type: Number, min: 0, max: 100, default: 0 },
     lastScore: { type: Number, min: 0, max: 100, default: 0 },
     attempts:  { type: Number, min: 0, default: 0},
     lastAttemptAt: { type: Date },
          },
       },
    { timestamps: true }
)

progressSchema.index({ userId: 1, lessonId: 1}, { unique: true })

progressSchema.pre('save', function(next) {
     const pct = this.completionPercent ?? 0
     if (pct <= 0) this.completionStatus = 'not_started'
     else if (pct >= 100) this.completionStatus = 'completed'
     else this.completionStatus = 'in_progress'
     next()
   })
   

export default mongoose.model('Progress', progressSchema)