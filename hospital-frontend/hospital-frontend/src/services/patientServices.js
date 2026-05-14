import axios from "axios";

const API_URL = "https://healthbridge-v0v2.onrender.com/api/patients";

export const getPatients = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
