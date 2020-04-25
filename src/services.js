import axios from "axios";

const apiClient = axios.create({
  baseURL: `https://corona.lmao.ninja/v2/`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getData() {
    return apiClient.get("/all");
  },
  getCountryData(name) {
    return apiClient.get("/countries/" + name);
  }
};
