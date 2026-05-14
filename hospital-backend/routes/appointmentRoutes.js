const express = require("express");
const Router = express.Router();

const {
  bookAppointment,
  getAppointments,
  getMyAppointments,
  updateAppointmentStatus,
  getDoctorAppointments
} = require("../controllers/appointmentController");

const { protect } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

Router.post("/", protect, bookAppointment);
Router.get("/my", protect, getMyAppointments);
Router.get("/", protect, roleMiddleware("admin"), getAppointments);
Router.put("/:id/status", protect, roleMiddleware("admin"), updateAppointmentStatus); 
Router.get( "/doctor-dashboard",protect, roleMiddleware("doctor"),getDoctorAppointments);

module.exports = Router;