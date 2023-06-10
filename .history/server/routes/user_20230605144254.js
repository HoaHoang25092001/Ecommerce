const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router
    .route('/register')
    .post(ctrls.register)

router
    .route('/login')
    .post(ctrls.login)

router
    .route('/current')
    .get(verifyAccessToken,ctrls.getCurrent)

module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE