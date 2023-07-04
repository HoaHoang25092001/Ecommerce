const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router
    .route('/')
    .post([verifyAccessToken, isAdmin], ctrls.createProduct)

router
    .route('/')
    .get(ctrls.getProducts)

router
    .route('/ratings')
    .put(verifyAccessToken, ctrls.ratings)

router
    .route('/:pid')
    .put([verifyAccessToken, isAdmin], ctrls.updateProduct)

router
    .route('/:pid')
    .delete([verifyAccessToken, isAdmin], ctrls.deleteProduct)

router
    .route('/:pid')
    .get(ctrls.getProduct)

module.exports = router