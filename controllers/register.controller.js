const User = require("../models/dataregister.model.js");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    console.log(userExist);

    if (userExist) {
      return res.status(400).json({ msg: "Email Already Exists" });
    }

    const userCreate = await User.create({ username, email, password });
    console.log(userCreate);
    res
      .status(201)
      .json({ data: "registration successfull", token: await userCreate.generateToken(), userID: userCreate._id.toString()});
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register };
