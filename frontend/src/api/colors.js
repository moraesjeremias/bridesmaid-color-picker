import axios from "axios";
const API_URL = "http://localhost:4000/colors";

export const getAvailableColors = async () => {
  const res = await axios.get(`${API_URL}?available=true`, { withCredentials: true });
  return res.data;
};

export const getAllColors = async () => {
  const res = await axios.get(API_URL, { withCredentials: true });
  return res.data;
};

export const pickColor = async (payload) => {
  const res = await axios.post(API_URL, payload, { withCredentials: true });
  return res.data;
};
