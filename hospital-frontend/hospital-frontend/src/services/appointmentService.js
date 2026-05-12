import axios from "axios";

const API_URL = "http://localhost:3000/api/appointments";

const getAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const bookAppointment = async (appointmentData) => {
  const response = await axios.post(
    API_URL,
    appointmentData,
    getAuthHeader()
  );

  return response.data;
};

export const getMyAppointments = async () => {
  const response = await axios.get(
    `${API_URL}/my`,
    getAuthHeader()
  );

  return response.data;
};



export const getAllAppointments = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeader()
  );

  return response.data;
};



export const updateAppointmentStatus = async (id, status) => {
  const response = await axios.put(
    `${API_URL}/${id}/status`,
    { status },
    getAuthHeader()
  );
  return response.data; 
};



export const getDoctorAppointments = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/doctor`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};