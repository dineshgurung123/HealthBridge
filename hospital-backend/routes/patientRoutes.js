

 const express = require('express')
const {  getPatient } = require('../controllers/patientController')
const { roleMiddleware } = require('../middlewares/roleMiddleware')
const { protect } = require('../middlewares/authMiddleware')

 const Router =  express.Router()

 
 Router.get("/", protect, roleMiddleware("admin"), getPatient )

 module.exports = Router