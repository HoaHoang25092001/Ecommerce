const router = require('express').Router()
const ctrls = require('../controllers/blogCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router
    .route('/')
    .post([verifyAccessToken, isAdmin], ctrls.createCategory)

router
    .route('/')
    .get(ctrls.getCategories)

router
    .route('/:bcid')
    .put([verifyAccessToken, isAdmin], ctrls.updateCategory)

router
    .route('/:bcid')
    .delete([verifyAccessToken, isAdmin], ctrls.deleteCategory)

module.exports = router