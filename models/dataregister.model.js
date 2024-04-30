const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

userSchema.pre('save',async function (){
    if(!this.isModified('password')){
        next()
    }

    try {
        this.password = await bcrypt.hash(this.password,10);
    } catch (error) {
        console.log(error);
    }
})

// json web token
userSchema.methods.generateToken =async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },"thisisaprivatekeysetinenvfile",{
            expiresIn:"1d"
        }
    )
    } catch (error) {
        console.log(error);
    }
}

// password compare
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password,this.password);
}

const User =new mongoose.model("User",userSchema);

module.exports = User;