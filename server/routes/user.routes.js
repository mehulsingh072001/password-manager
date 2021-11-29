const express = require('express')
const userCtrl = require('../controllers/user.controller')
const authCtrl = require('../controllers/auth.controller')

const router = express.Router()

router.route('/users')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/login')
    .post(authCtrl.signin)

module.exports = router
