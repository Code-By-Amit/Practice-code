const express = require('express')
const multer = require('multer')
const app = express();

app.set('view engine','ejs')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

app.get("/",(req,res)=>{
    res.render('home')
})

app.post('/upload',upload.single("profileImage"),(req,res)=>{
    // console.log(req);
    console.log(req.file);
    // const msg = "Done"
    res.redirect('/')
})
 
app.listen(3000,()=>{
    console.log(`Server Started on the port 3000`);
})