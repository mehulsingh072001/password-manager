const express = require('express')
const verify = require('../verifyToken')
const Folders = require('../models/folder.model')
const User = require('../models/user.model')

const router = express.Router()

router.post('/folder/:userId', verify, async (req, res) => {
    const id = req.params.userId
    const folders = new Folders({
        name: req.body.name.toLowerCase()
    })
    
    try {
        const savedFolder = await folders.save()

        const user = await User.findById(id)
        user.folders.push(savedFolder._id)

        const savedUser = await user.save()
        return res.status(201).json({
            message: savedUser
        })
    }

    catch(err){
        return res.status(400).json({
            error: err
        })
    }
})

router.delete('/folder/:foldId/:userId', verify, async (req, res) => {
    const id = req.params.userId
    try {
        let folder = await Folders.findById(req.params.foldId) 
        let user = await User.findById(id)
        let deletedUser = await folder.remove()
        user.folders.pull(req.params.foldId)
        return res.json(deletedUser)
    }
    catch(err) {
        return res.status(400).json({
            error: err
        })
    }
})

module.exports = router
