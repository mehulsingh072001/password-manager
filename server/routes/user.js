const express = require('express')
const verify = require('../verifyToken')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

const router = express.Router()

// router.route('/users')

router.get('/users',  verify, async (req, res) => {
    try {
        await User.find().sort({date: -1})
            .then(users => res.json(users))
    }
    catch(err) {
        return res.status(400).json({
            error: err
        })
    }
})

router.post('/users', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        await user.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    }
    catch (err) {
        return res.status(400).json({
            error: err
        })
    }
})


router.get('/user/:userId', verify, async (req, res) => {
    try {
        var id = req.params.userId
        let user = await User.findById(id)
            .populate('credentials')
        if(!user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        return res.json(user)
    }
    catch(err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
})

    
router.delete('/users', verify, async (req, res) => {
    try {
        let user = await User.findOne({name: req.body.name}) 
        let deletedUser = await user.remove()
        deletedUser.password = undefined
        res.json(deletedUser)
    }
    catch(err) {
        return res.status(400).json({
            error: err
        })
    }
})

module.exports = router
