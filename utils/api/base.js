import axios from "axios";

// base api client
const apiClient = axios.create({
    baseURL: '/api/',
    timeout: 1000,
    headers: {"Content-Type": "application/json"}
});

export { apiClient, }