const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if (!title || !description || !category) throw new Error('Missing inputs')
    const response = await Blog.create(req.body)
    return res.status(200).json({
        status: response ? 'success' : 'error',
        data: response ? response : 'Cannot create new blog'
    })
})

const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })
    return res.status(200).json({
        status: response ? 'success' : 'error',
        data: response ? response : 'Cannot update new blog'
    })
})

const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find()
    return res.status(200).json({
        status: response ? 'success' : 'error',
        data: response ? response : 'Cannot get blogs'
    })
})

/**
 Khi người dùng like 1 bài blog thì:
 1. Check xem người đó trước đó có dislike hay không => bỏ dislike
 2. Check xem người đó trước đó có like hay không => bỏ like / thêm like
 */

const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.disLikes?.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true })
        return res.status(200).json({
            status: response ? 'success' : 'error',
            data: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.status(200).json({
            status: response ? 'success' : 'error',
            data: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.status(200).json({
            status: response ? 'success' : 'error',
            data: response
        })
    }
})

const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.status(200).json({
            status: response ? 'success' : 'error',
            data: response
        })
    }
    const idDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if (idDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true })
        return res.status(200).json({
            status: response ? 'success' : 'error',
            data: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { disLikes: _id } }, { new: true })
        return res.status(200).json({
            status: response ? 'success' : 'error',
            data: response
        })
    }
})


const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndUpdate(bid, {$inc: {numberViews: 1}}, {new: true})
        .populate('likes', 'firstname lastname')
        .populate('disLikes', 'firstname lastname')
    return res.status(200).json({
        status: blog ? 'success' : 'error',
        data: blog
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    return res.status(200).json({
        status: blog ? 'success' : 'error',
        data: blog || 'Some thing went wrong'
    })
})
module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog
}