const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HazardSchema = new Schema({
    position: { lat: Number, lon: Number },
    type: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

const Hazard = mongoose.Model('Hazard', HazardSchema)

module.exports = Hazard