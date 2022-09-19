import mongoose from 'mongoose'
const {Schema} = mongoose

const addressSchema = Schema({
    name: {type: String, required: false},
    type: {type: String, enum: ['event', 'home', 'work', 'billing', 'shipping'], required: true},
    address: {type: String, required: true},
    zipCode: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: Schema.Types.ObjectId, ref: 'Country'},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

export default mongoose.model('Address', addressSchema)