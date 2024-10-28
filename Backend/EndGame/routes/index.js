var express = require('express');
var router = express.Router();
const userModel = require('./users')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Server is Running Fine")
});

// router.get('/create', async (req, res) => {
//   let userInsData = await userModel.create({
//     username: "Amit",
//     age: 19,
//     name: "amit"
//   })
//   res.send(userInsData);
// })

// router.get('/delete',async (req,res)=>{
//   let data = await userModel.findOneAndDelete({
//     name:'amit'
//   })

//   res.send(data)
// })

// router.get('/create',(req,res)=>{
//   req.session.ban = true;
//   console.log(req.session)
//   res.send(`Your session is Crated`)
// })

// router.get('/delete',(req,res)=>{
//   req.session.destroy((err)=>{
//     if(err) throw err;
//     res.send("sesson Sestoryed")
//   })
//   res.send("Ban Removed")
// })

// router.get('/checkban',(req,res)=>{
//   if(req.session.ban == true){
//     res.send("You Are Banned")
//   }
//   res.send("You Are not Banned")
// })

router.get('/create',(req,res)=>{
  res.cookie("age",23);
  res.render('index')
})

router.get('/read',(req,res)=>{
  console.log(req.cookies.age)
  res.send("Check karo console")
})

router.get('/delete',(req,res)=>{
  res.clearCookie('age')
  res.send("Cookie Clear ho gayi")
})
module.exports = router;
