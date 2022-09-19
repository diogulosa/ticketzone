import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    index: {type: Number, required: true, unique: true },  
    name: {type: String, required: true},
    count: {type: Number, required: true, default: 0},
})

export default mongoose.model('Category', categorySchema)