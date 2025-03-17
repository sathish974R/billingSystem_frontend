import axios from "axios";

const BASE_URL = "http://localhost:8080/api/products";

const ProductService = {
  getAllProducts: () => axios.get(BASE_URL),
  getProductById: (id) => axios.get(`${BASE_URL}/${id}`),
  createProduct: (product) => axios.post(BASE_URL, product),
  updateProduct: (id, product) => axios.put(`${BASE_URL}/${id}`, product),
  deleteProduct: (id) => axios.delete(`${BASE_URL}/${id}`),
};

export default ProductService;
