const express = require('express')
const multer = require("multer")
const path = require('path')
const Blog = require('../models/blog')
const Comment = require('../models/comments')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage })


router.get("/add-new", (req, res) => {
    return res.render('addblog', {
        user: req.user,
    })
})
router.get('/:id',async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({blogID:req.params.id}).populate('createdBy');
    res.render('blog',{
        user:req.user,
        blog,
        comments
    })
})

router.post('/', upload.single('coverImage'), async (req, res) => {
    const { title, body } = req.body;

    await Blog.create({
        title: title,
        body: body,
        createdBy: req.user._id,
        coverImageURL: `${req.file.filename}`
    })

    return res.redirect(`/`)
})

router.post('/comment/:blogId', async(req,res)=>{
   await Comment.create({
        content: req.body.content,
        blogID: req.params.blogId,
        createdBy:req.user._id
    });
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router



