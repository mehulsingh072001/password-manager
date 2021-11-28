const express = require('express')
const credentialsCtrl = require('../controllers/credentials.controller') 

const router = express.Router()

router.route('/credentials')
    .get(credentialsCtrl.get)
    .post(credentialsCtrl.add)

module.exports = router
