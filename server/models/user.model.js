const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
    },
    credentials: [{type: mongoose.Schema.Types.ObjectId, ref: "credentials"}]
})


module.exports = mongoose.model('User', userSchema)
