const Credentials = require('../models/credentials.model')

const add = async(req, res) => {
    const credentials = new Credentials({
        username: req.body.username,
        password: req.body.password
    })
    try {
        await credentials.save()
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    }
    catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}


const get = async(req, res) => {
    try{
        let credentials = await Credentials.find()
        res.json(credentials)
    }
    catch(err){
        return res.status(400).json({
            error: err
        })
    }
}

module.exports = {add, get}
