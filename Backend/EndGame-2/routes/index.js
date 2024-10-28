var express = require('express');
const userModel = require('./users.js')
const passport = require("passport")
const localStrategy = require("passport-local")

var router = express.Router();
passport.use(new localStrategy(userModel.authenticate()))

router.get('/',(req,res)=>{
  res.render('index')
})

router.get('/profile', isLoggedIn,(req, res) => {
  res.render('profile')
})

router.post('/register', (req, res) => {
  var userdata = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
      });
    });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function (req, res) {
});

router.get('/logout', function (req, res, next) {
  req.logOut(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
