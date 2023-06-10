const router = require('express').Router()
const ctrls = require('../controllers/user')


router
    .route('/register')
    .post(ctrls.register)

module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE