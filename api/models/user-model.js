import mongoose from "mongoose"
const {Schema} = mongoose

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fname: {type: String, required: false},
    lname: {type: String, required: false},
    active: {type: Boolean, required: true, default: true},
    address: {type: [Schema.Types.ObjectId], ref: 'Address', required: false},
    status: {type: String, enum: ['user', 'admin']}
}, {timestamps: true})

export default mongoose.model('User', userSchema)