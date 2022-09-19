import mongoose from "mongoose"
const {Schema} = mongoose

const paymentResultSchema = new mongoose.Schema({
    id :{type: String, required: true}, status: {type: String, required: true}, updateTime: {type: String, required: true}, email_address: {type: String, required: true}
})

const orderSchema = new mongoose.Schema({
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    event: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    ticketQty: {type: Number, required: true},
    totalAmount: {type: Number, required: true},
    paymentMethod: {type: String, required: true, default: 'Paypal'},
    isPaid: {type: Boolean, required: true},
    paymentResult: {type: paymentResultSchema, required: false}
}, {timestamps: true})

export default mongoose.model('Order', orderSchema)