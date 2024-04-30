const User = require("../models/dataregister.model.js");
const bcrypt = require("bcrypt");
const login = async (req, res) =>{
    try {
        const {email,password}= req.body;

        const userExists = await User.findOne({email:email});

        if(!userExists){
            return res.status(404).json({
                msg:"Invalid details"
            })
        }
        console.log(userExists);
        const user = await bcrypt.compare(password, userExists.password);
        if(user){
            res.status(200).json({
                msg:"Login Successfull",
                token: await userExists.generateToken(),
                userId: userExists._id.toString()
            });
        }
        else{
            res.status(401).json({
                msg:"Invalid Email or Password"
            })
        }
    } catch (error) {
        res.status(500).json("internal server error")   
    }
};

module.exports = { login };
