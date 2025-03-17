import axios from "axios";

const API_URL = "http://localhost:8080/api/invoices";

export const getInvoices = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createInvoice = async (customerId, productIds) => {
  const response = await axios.post(API_URL, { customerId, productIds });
  return response.data;
};

export const deleteInvoice = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
