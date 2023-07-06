const router = require('express').Router()
const ctrls = require('../controllers/productCategory')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router
    .route('/')
    .post([verifyAccessToken, isAdmin], ctrls.createCategory)

router
    .route('/')
    .get(ctrls.getCategories)

router
    .route('/:pcid')
    .put([verifyAccessToken, isAdmin], ctrls.updateCategory)

router
    .route('/:pcid')
    .delete([verifyAccessToken, isAdmin], ctrls.deleteCategory)

module.exports = router