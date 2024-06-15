import axios from "axios";

export const apiBoticario = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 5000,
});