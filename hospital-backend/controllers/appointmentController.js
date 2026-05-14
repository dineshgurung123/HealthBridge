const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");

// ========================
// BOOK APPOINTMENT (PATIENT)
// ========================
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const userId = req.user.id;

    const patient = await Patient.findOne({ userId });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId,
      date,
      time,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================
// GET ALL APPOINTMENTS (ADMIN)
// ========================
const getAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find()
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email",
        },
      })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "name email",
        },
      });

    res.json({
      message: "All appointments fetched successfully",
      appointments,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================
// GET MY APPOINTMENTS (PATIENT)
// ========================
const getMyAppointments = async (req, res) => {
  try {

    const patient = await Patient.findOne({ userId: req.user.id });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const appointments = await Appointment.find({
      patientId: patient._id,
    }).populate({
      path: "doctorId",
      populate: {
        path: "userId",
        select: "name",
      },
    });

    res.json({
      message: "My appointments fetched successfully",
      appointments,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointmentStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

     
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.json({
      message: "Appointment status updated",
      appointment,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



const getDoctorAppointments = async (req, res) => {

  try {
          
    console.log(req.body)
    const doctor = await Doctor.findOne({
      userId: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const appointments = await Appointment.find({
      doctorId: doctor._id,
    })

      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name email",
        },
      });

    res.json({
      message: "Doctor appointments fetched successfully",
      appointments,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

 
module.exports = {
  bookAppointment,
  getAppointments,
  getMyAppointments,
  updateAppointmentStatus,
  getDoctorAppointments,
};