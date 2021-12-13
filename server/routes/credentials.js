const express = require('express')
const verify = require('../verifyToken')
const Credentials = require('../models/credentials.model')
const Folders = require('../models/folder.model')
const User = require('../models/user.model')

const router = express.Router()

router.delete('/credentials/:credId/:userId', verify, async (req, res) => {
    const id = req.params.userId
    if(req.body.folder){
        try {
            let credential = await Credentials.findById(req.params.credId) 
            let user = await User.findById(id)
            let folder = await Folders.findOne({'name': req.body.folder})
            let deletedUser = await credential.remove()
            folder.credentials.pull(req.params.credId)
            user.credentials.pull(req.params.credId)
            return res.json(deletedUser)
        }
        catch(err) {
            return res.status(400).json({
                error: err
            })
        }
    }
    else{
        try {
            let credential = await Credentials.findById(req.params.credId) 
            let user = await User.findById(id)
            let deletedUser = await credential.remove()
            user.credentials.pull(req.params.credId)
            return res.json(deletedUser)
        }
        catch(err) {
            return res.status(400).json({
                error: err
            })
        }
    }
})

router.post('/credentials/:userId',  verify, async (req, res) => {

    const id = req.params.userId

    const credentials = new Credentials({
        label: req.body.label,
        username: req.body.username,
        password: req.body.password
    })

    if(req.body.folder){
        // save credentials to database
        const savedCredentials = await credentials.save()

        const folder = await Folders.findOne({"name": req.body.folder})
        const user = await User.findById(id)

        folder.credentials.push(savedCredentials._id)
        user.credentials.push(savedCredentials._id)

        const savedFolder = await folder.save()
        const savedUser = await user.save()
        return res.status(201).json({
            message: {
                Folder: savedFolder,
                User: savedUser
            }
        })
    }
    else{
        // save credentials to database
        const savedCredentials = await credentials.save()

        const user = await User.findById(id)
        console.log(user)
        user.credentials.push(savedCredentials._id)

        const savedUser = await user.save()
        return res.status(201).json({
            message: savedUser
        })
    }
})

module.exports = router
