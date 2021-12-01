const express = require('express')
const verify = require('../verifyToken')
const Credentials = require('../models/credentials.model')
const User = require('../models/user.model')

const router = express.Router()

router.get('/credentials', verify, async (req, res) => {
    try{
        let credentials = await Credentials.find()
        res.json(credentials)
    }
    catch(err){
        return res.status(400).json({
            error: err
        })
    }
})


router.post('/credentials', verify, async (req, res) => {
    const credentials = new Credentials({
        username: req.body.username,
        password: req.body.password
    })
    try {
        // save credentials to database
        const savedCredentials = await credentials.save()

        const user = await User.findOne({name: req.body.name})
        user.credentials.push(savedCredentials._id)
        const savedUser = await user.save()
        return res.status(200).json({
            message: savedUser
        })
    }
    catch (err) {
        return res.status(400).json({
            error: err
        })
    }
})

module.exports = router
