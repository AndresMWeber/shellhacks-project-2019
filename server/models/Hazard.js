const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HazardSchema = new Schema({
    position: { lat: Number, lon: Number },
    type: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Hazard = mongoose.Model('Hazard', HazardSchema)

module.exports = Hazard