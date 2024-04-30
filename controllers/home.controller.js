const home = async (req,res) =>{
    try {
        res.status(201).send("Home Page");
    } catch (error) {
        console.log("HOme error",error);
    }
}

module.exports = {home};