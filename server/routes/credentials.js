const express = require('express')
const verify = require('../verifyToken')
const Credentials = require('../models/credentials.model')
const Folders = require('../models/folder.model')
const User = require('../models/user.model')

const router = express.Router()

router.delete('/credentials/:credId', verify, async (req, res) => {
    try {
        let credential = await Credentials.findById(req.params.credId) 
        let deletedUser = await credential.remove()
        return res.json(deletedUser)
    }
    catch(err) {
        return res.status(400).json({
            error: err
        })
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
