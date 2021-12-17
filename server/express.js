const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const credentialsRoute = require('./routes/credentials')
const folderRoute = require('./routes/folder')
var bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//parse body params and attach them to req.body
app.use(express.json())
app.use(cookieParser())

//get current working directory
const cwd = process.cwd()

//enable cors
app.use(cors())

app.use('/public', express.static(path.join(cwd, 'public')))
app.use('/api', userRoute)
app.use('/api', authRoute)
app.use('/api', credentialsRoute)
app.use('/api', folderRoute)

module.exports = app
