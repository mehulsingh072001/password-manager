const mongoose = require('mongoose')

const credentialSchema = new mongoose.Schema({
    label: {
        type: String,
        trim: true,
    },

    username: {
        type: String,
        trim: true,
    },

    password: {
        type: String,
    }
})


module.exports = mongoose.model('credentials', credentialSchema)
