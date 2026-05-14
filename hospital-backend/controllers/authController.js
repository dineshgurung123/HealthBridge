const User = require("../models/userModel");
const Patient = require("../models/patientModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER 
const registerUser = async (req, res) => {

  const {
    name,
    email,
    password,
    roles,
    age,
    gender,
    phone
  } = req.body;

  try {

    console.log("Received registration data:", {  
      name,
      email,
      password,
      roles,
      age,
      gender,
      phone
    });

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles,
    });

    // create patient profile if role is patient
    if (roles === "patient") {

      await Patient.create({
        userId: user._id,
        age,
        gender,
        phone,
      });

    }

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });

  }
};


// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }

    // create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.roles,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });

  }

};


module.exports = {
  registerUser,
  loginUser,
};