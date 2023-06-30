import axios from "axios";

const apiClient = axios.create({
    baseURL: '/api/',
    timeout: 1000,
    headers: {"Content-Type": "application/json"}
});

export { apiClient, }