import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3008/api/v1/restaurants",
});

export default api;
