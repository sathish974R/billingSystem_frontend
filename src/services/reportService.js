import axios from "axios";

const API_URL = "http://localhost:8080/api/reports";

export const getSalesReport = async () => {
  const response = await axios.get(`${API_URL}/sales`);
  return response.data;
};
