import axios from "axios";

const instance = axios.create({
  baseURL: "https://risedentalbackend.onrender.com",
});

export default instance;
