const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/Practice')

const userSchema = mongoose.Schema({
  username:String,
  age:Number,
  name:String
})

module.exports =  mongoose.model('User',userSchema)

