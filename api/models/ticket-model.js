import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
    name: {type: String, required: true},
    order: {type: Schema.Types.ObjectId, ref: 'Order', required: true},
    event:  {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    orderedBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    checkedIn: {type: Boolean, required: true, default: false}
}, {timestamps: true})

export default mongoose.model('Ticket', ticketSchema)