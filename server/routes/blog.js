const router = require('express').Router()
const ctrls = require('../controllers/blog')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router
    .route('/')
    .post([verifyAccessToken, isAdmin], ctrls.createNewBlog)

router
    .route('/')
    .get(ctrls.getBlogs)

router
    .route('/one/:bid')
    .get(ctrls.getBlog)

router
    .route('/like/:bid')
    .put([verifyAccessToken], ctrls.likeBlog)

router
    .route('/dislike/:bid')
    .put([verifyAccessToken], ctrls.dislikeBlog)

router
    .route('/:bid')
    .put([verifyAccessToken, isAdmin], ctrls.updateBlog)

router
    .route('/:bid')
    .delete([verifyAccessToken, isAdmin], ctrls.deleteBlog)


module.exports = router