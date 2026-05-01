const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, roles } = req.body;

  try {
    console.log("Received registration data:", {
      name,
      email,
      password,
      roles,
    });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async(req, res) =>{


    const {email, password} = req.body;
    
    const user = await User.findOne({email})

        if(!user){

            return res.status(400).json({message : "User not found"})
        }

        //check password

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message : "Invalid credentials"})
        }

        //create token

        const token = jwt.sign({id : user._id, roles : user.roles}, process.env.JWT_SECRET, {expiresIn : "1h"})

        res.status(200).json({message : "Login successful", token})

}

module.exports = {
  registerUser,
  loginUser
};
