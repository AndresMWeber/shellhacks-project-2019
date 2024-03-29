const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const Hazard = require('../models/Hazard')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) throw new Error('Password cannot contain "password"')
        }
    },
    hazardNotifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Hazard'
    }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('Unable to login')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 8)
    next()
})

// Delete user groups when user is removed
userSchema.pre('remove', async function(next) {
    // TODO remove the user from all groups they are a part of as well as delete groups they own.
    await Hazard.deleteMany({ creator: this._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User