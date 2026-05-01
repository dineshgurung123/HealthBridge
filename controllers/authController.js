const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, roles } = req.body;

  console.log(name, email, password, roles);
  await User.findOne();

  try {
    console.log("Received registration data:", {
      name,
      email,
      password,
      roles,
    });

       const existingUser = await User.findOne({ email });
       if(existingUser){
        console.log("User already exists with email:", email);
        return res.status(400).json({ message : "User already exists"})
       }

        const hashedPassword = await bcrypt.hash(password,10)


        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            roles
        });

        res.status(201).json({ message : "User registered successfully", user}) 


  } catch (error) {

    res.status(500).json({ message : "Server error", error : error.message})    
  }
};


module.exports = {
  registerUser,
};