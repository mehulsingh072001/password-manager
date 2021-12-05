const express = require('express')
const verify = require('../verifyToken')
const Credentials = require('../models/credentials.model')
const User = require('../models/user.model')

const router = express.Router()
    
router.delete('/credentials/:credId', verify, async (req, res) => {
    try {
        let credential = await Credentials.findById(req.params.credId) 
        let deletedUser = await credential.remove()
        res.json(deletedUser)
    }
    catch(err) {
        return res.status(400).json({
            error: err
        })
    }
})

router.post('/credentials/:userId',  async (req, res) => {
    const id = req.params.userId
    const credentials = new Credentials({
        label: req.body.label,
        username: req.body.username,
        password: req.body.password
    })
    try {
        // save credentials to database
        const savedCredentials = await credentials.save()

        const user = await User.findById(id)
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
