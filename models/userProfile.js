const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userProfileSchema = new Schema ({
    username: String,
    email:{type:String, require: true},
    password:{type:String, require:true},
    createdAccount:{type:Date, default:Date.now},
    isAdmin:{type: Boolean, default:false}
});
module.exports = mongoose.model('userProfile', userProfileSchema)