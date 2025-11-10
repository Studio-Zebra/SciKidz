import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    category: String,
    difficulty: {type: String, enum: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade',
                                      '4th Grade', '5th Grade', '6th Grade', '7th Grade',
                                      '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'], default: '1st Grade'},
    createdAt: {type:Date,default:Date.now}
})

export default mongoose.model('Lesson', lessonSchema)