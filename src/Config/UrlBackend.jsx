import axios from "axios";

const urlBackend = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/ia/`,
});

export default urlBackend;