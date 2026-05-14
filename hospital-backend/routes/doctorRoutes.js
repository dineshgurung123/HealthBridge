

const express = require('express');
const router = express.Router();
const { createDotor, getDoctors, getDoctorById, createDoctor } = require('../controllers/doctorController');

const {protect} =  require('../middlewares/authMiddleware');
const {roleMiddleware} = require('../middlewares/roleMiddleware');
const { getDoctorAppointments } = require('../controllers/appointmentController');



router.post("/create", protect, roleMiddleware("admin"), createDoctor);
router.get("/get-all", getDoctors);
router.get("/get/:id", getDoctorById);
router.get("/doctorAppointments", protect, getDoctorAppointments)


module.exports = router;