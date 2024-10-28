const express = require('express');
const User = require('../models/user')

const router = express.Router();

router.get('/signin', (req, res) => {
    res.render('signin')
})
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    let user = await User.create({
        fullName,
        email,
        password
    })
    return res.redirect('/')
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenetateToken(email, password)
        return res.cookie('token', token).redirect('/');
    }
    catch (error) {
        res.render('signin',{error:"Invalid Password or Email"})
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})

module.exports = router; 