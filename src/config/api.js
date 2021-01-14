import axios from "axios";
require("dotenv").config();

//! creating a proxy request to change the base url using AXIOS
export default axios.create({
  baseURL: process.env.BASEURL || "http://localhost:3002",
  // baseURL: "https://sotrpc-server.herokuapp.com",
  timeout: 5000,
  withCredentials: true,
});
