const express = require('express')
const credentialsCtrl = require('../controllers/credentials.controller') 
const verify = require('../verifyToken')

const router = express.Router()

router.route('/credentials')
    .get(verify, credentialsCtrl.get)
    .post(verify, credentialsCtrl.add)

module.exports = router
