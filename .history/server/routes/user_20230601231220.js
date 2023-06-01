const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body

    if (!email || !password || !firstname || !lastname)
        return res.status(400).json({
            success: false,
            mess: 'Missing inputs'
        })
    const user = await User.findOne({ email })
    if (user) throw new Error('User has existed')
    else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            sucess: newUser ? true : false,
            mess: newUser ? 'Register is successfully. Please go login~' : 'Something went wrong'
        })
    }
})

module.exports = {
    register 
}