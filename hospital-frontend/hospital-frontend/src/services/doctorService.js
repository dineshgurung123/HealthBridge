import axios from "axios";

const API_URL = "http://localhost:3000/api/doctors/get-all";

// GET ALL DOCTORS
export const getDoctors = async () => {
  const response = await axios.get(API_URL);

  return response.data.doctors;
};