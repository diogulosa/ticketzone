import mongoose from "mongoose"
const {Schema} = mongoose

const eventSchema = new Schema({
    title: {type: String, required: true},
    organizer: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    address: {type: Schema.Types.ObjectId, ref: 'Address'},
    country: {type: Schema.Types.ObjectId, ref: 'Country'},
    dateStart:{type: Number, required: true}, 
    dateEnd: {type: Number, required: false},
    timeStart: {type: String, required: true}, 
    timeEnd: {type: String, required: false},
    ticketName: {type: String, required: true, default: "General Admission"}, 
    ticketPrice: {type: Number, required: true},
    salesStart: {type: Number, required: false},
    salesEnd: {type: Number, required: false},
    initialTicketsAvailable: {type: Number, required: true},   
    ticketsSold: {type: Number, required: true, default: 0},
    ticketsAvailable: {type: Number, required: false},
    absorbFees: {type: Boolean, required: true, default: true},
    image: {data: {type: Buffer}, contentType: {type: String}},
    description: {type: String, required: true},
    tags: {type: Array},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    status: {type: String, enum: ['draft', 'active', 'finished', 'sold out'], required: true},
    privacy: {type: Boolean, required: true, default: false},
    privacySettings: {type: String, required: false},
    eventURL: {type: String, required: false}
}, {timestamps: true})

export default mongoose.model('Event', eventSchema)