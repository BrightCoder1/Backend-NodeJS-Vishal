require("dotenv").config();
const mongoose = require("mongoose");
const URL = process.env.URL;

const connectDB = async() =>{
    try {
        await mongoose.connect(URL);
        console.log("Database connected successfull")
    } catch (error) {
        console.log("DB Error",error);
    }
}
module.exports  = connectDB;