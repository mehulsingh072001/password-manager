const mongoose = require('mongoose')
const app = require('./express')
require('dotenv').config()

//connection url
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${process.env.MONGODB_URI}`)
})

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(err)
    }
    console.info('Server started on port %s', process.env.PORT)
})
