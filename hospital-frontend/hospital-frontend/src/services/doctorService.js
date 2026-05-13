import axios from "axios";

// Base URL
const BASE_URL = "http://localhost:3000/api/doctors";

// GET ALL DOCTORS
export const getDoctors = async () => {
  const response = await axios.get(`${BASE_URL}/get-all`);
  return response.data;
};

// CREATE DOCTOR
export const createDoctor = async (doctorData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
     `${BASE_URL}/create`,
    doctorData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};