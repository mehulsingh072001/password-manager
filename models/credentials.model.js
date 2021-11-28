const mongoose = require('mongoose')

const credentialSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
    }
})


module.exports = mongoose.model('Credentials', credentialSchema)
