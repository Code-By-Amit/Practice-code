const express = require('express')
const URL = require('../models/url.js')
const User = require('../models/user.js')
const { restrictToUser } = require('../middlewares/auth.js')
const router = express.Router();

router.get('/admin/urls',restrictToUser(["ADMIN"]),async (req, res) => {
  const allurls = await URL.find({ });
    return res.render("home", {
    urls: allurls,
  });
});

router.get("/", restrictToUser(['NORMAL','ADMIN']) ,async (req, res) => {
    // if (!req.user) return res.redirect("/login");
    const allurls = await URL.find({ createdBy : req.user._id });
    return res.render("home", {
      urls: allurls,
    });
  });


router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
module.exports = router;