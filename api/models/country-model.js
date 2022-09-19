import mongoose from "mongoose"

const countryModel = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    code: {type: String, required: false}
}, {timestamps: true})

export default mongoose.model('Country', countryModel)