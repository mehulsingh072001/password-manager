const express = require('express')
const verify = require('../verifyToken')
const Credentials = require('../models/credentials.model')
const Folders = require('../models/folder.model')

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

router.post('/credentials/:folderId',  async (req, res) => {
    const id = req.params.folderId
    const credentials = new Credentials({
        label: req.body.label,
        username: req.body.username,
        password: req.body.password
    })
        // save credentials to database
        const savedCredentials = await credentials.save()

        const folder = await Folders.findById(id)

        folder.credentials.push(savedCredentials._id)
        const savedFolder = await folder.save()
        return res.status(201).json({
            message: savedFolder
        })
})

module.exports = router
