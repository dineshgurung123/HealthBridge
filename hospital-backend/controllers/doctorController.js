const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// create doctor by admin

const createDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, experience } = req.body;

    console.log(req.body);
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles: "doctor",
    });

    const doctor = await Doctor.create({
      userId: user._id,
      specialization,
      experience,
    });

    res.status(201).json({
      message: "Doctor created successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get all doctors

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email");

    res.status(200).json({
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching doctors",
      error,
    });
  }
};

// get doctor by id

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "userId",
      "name email",
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctorById,
};
