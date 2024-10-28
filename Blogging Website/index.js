const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { checkForAuthenticationCookie } = require('./middlewares/authentatication');

const userRoute = require('./routes/users');
const blogRoute = require('./routes/blog')
const Blog = require('./models/blog')

const app = express();
const PORT = 3000
app.set('view engine','ejs')

app.use(express.urlencoded({ extended:false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.use('/user', userRoute)
app.use('/blog',blogRoute)

mongoose.connect('mongodb://localhost:27017/blogify').then(()=>{
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log('Failed to connect to MongoDB. Error:',err);
})

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({})
    // console.log('User Before: ',req.user);
    // const user = JSON.stringify(req.user)
    console.log('User After: ',req.user);
    res.render('home',{
        user:req.user,
        blogs:allBlogs
    })
})

app.listen(PORT,()=>{ console.log(`Server Started on Port:${PORT}`) })