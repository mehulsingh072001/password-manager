const express = require('express')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user.routes')
const credentialsRoute = require('./routes/credentials.routes')
var bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//parse body params and attach them to req.body
app.use(express.json())
app.use(cookieParser())

//get current working directory
const cwd = process.cwd()

//secure apps by setting various http headers
app.use(helmet())

//enable cors
app.use(cors())

app.use('/public', express.static(path.join(cwd, 'public')))
app.use('/api', userRoute)
app.use('/api', credentialsRoute)
app.get('/api/test/:id', (req, res) => {
    var id = req.params.id
    res.json(id)
})

module.exports = app
