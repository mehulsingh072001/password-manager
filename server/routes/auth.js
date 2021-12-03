const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({
            "email": req.body.email,
        })
        if(!user){
            return res.status(401).json({
                error: "User not found"
            })
        }
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass) return res.status(400).send('Invalid Password')
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('Bearer', token).send({token: token, id: user._id})
    }
    catch(err) {
        return res.status(401).json({
            error: err
        })
    }
})

module.exports = router
