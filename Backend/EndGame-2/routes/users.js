const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
mongoose.connect('mongodb://localhost:27017/textEndGame')

const userSchema = new mongoose.Schema({
  username: String,
  password:String,
  secret:String
});

userSchema.plugin(plm);
const userModel = mongoose.model('authUser',userSchema);
 
module.exports = userModel



