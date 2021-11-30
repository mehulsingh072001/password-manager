const express = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

const router = express.Router()

// router.route('/users')

router.get('/user', (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    }
    catch(err) {
        return res.status(400).json({
            error: err
        })
    }
})

router.post('post', (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
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


router.get('/user/:userId', (req, res) => {
    try {
        var id = req.params.userId
        let user = await User.findById(id)
        if(!user){
            return res.status(400).json({
                error: "User not found"
            })
        }
        req.profile = user
        next()
    }
    catch(err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
})

    
router.get('/user/remove', (req, res) => {
    try {
        let user = req.body
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

const read = (req, res) => {
    req.profile.password = undefined
    return res.json(req.profile)
}
module.exports = router
