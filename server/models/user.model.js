const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    credentials: [{type: mongoose.Schema.Types.ObjectId, ref: "credentials"}]
})


module.exports = mongoose.model('User', userSchema)
