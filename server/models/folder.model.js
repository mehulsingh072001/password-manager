const mongoose = require('mongoose')

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    credentials: [{type: mongoose.Schema.Types.ObjectId, ref: "credentials"}]
})

module.exports = mongoose.model('folders', folderSchema)
