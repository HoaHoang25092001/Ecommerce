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
    .get(verifyAccessToken, ctrls.getCurrent)

router
    .route('/refreshtoken')
    .post(ctrls.refreshAccessToken)

router
    .route('/logout')
    .get(verifyAccessToken, ctrls.logout)

router
    .route('/forgotpassword')
    .get(ctrls.forgotPassword)

router
    .route('/resetpassword')
    .put(ctrls.resetPassword)

router
    .route('/')
    .get([verifyAccessToken, isAdmin], ctrls.getUsers)

router
    .route('/')
    .delete([verifyAccessToken, isAdmin], ctrls.deleteUser)

router
    .route('/current')
    .put(verifyAccessToken, ctrls.updateUser)

router
    .route('/:uid')
    .put([verifyAccessToken, isAdmin], ctrls.updateUserByAdmin)

module.exports = router

// CRUD | Create - Read - Update - Delete | POST - GET - PUT - DELETE