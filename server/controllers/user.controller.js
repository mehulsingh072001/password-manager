const User = require('../models/user.model')
const extend = require('lodash/extend')
const bcrypt = require('bcryptjs')

const create = async (req, res) => {
}

const userById = async (req, res, next) => {
}

const read = (req, res) => {
    req.profile.password = undefined
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.password = undefined
        res.json(user)
    }

    catch(err) {
        return res.status(400).json({
            error: err
        })
    }
}

const remove = async (req, res) => {
}

module.exports = {create, userById, read, list, remove, update}
