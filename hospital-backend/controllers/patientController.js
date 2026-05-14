
const Patient = require("../models/patientModel")

const getPatient = async(req, res) => {

      
 try {
     
    const patients = await Patient.find()
    .populate("userId", "name email")

     res.json({
        message : "Patient Fetched successfully",
        patients
     })
       


 } catch (error) {
    res.error(error)
    
 }
}

module.exports = {getPatient}