import axios from "axios";

const API_URL = "https://healthbridge-v0v2.onrender.com/api/auth/";

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}login`, data);

  return response.data;
};

export const RegisterUSer = async (data) => {
  const response = await axios.post(`${API_URL}register`, data);

  return response.data;
};
