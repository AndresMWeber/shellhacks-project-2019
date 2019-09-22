const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere',
        required: true
    }
});

const HazardSchema = new Schema({
    description: { type: String },
    incidentNumber: { type: String },
    address: { type: String },
    location: {
        type: pointSchema,
        required: true
    },
    agency: { type: String },
    date: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

const Hazard = mongoose.model('Hazard', HazardSchema)
module.exports = Hazard