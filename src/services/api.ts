import axios from "axios";

const REACT_ENV: string = process.env.REACT_ENV || "production";

const baseURLs: { [key: string]: string } = {
    development: "http://localhost:5000",
    production: "https://todorial.herokuapp.com",
};

const api = axios.create({ baseURL: baseURLs[REACT_ENV] });

export default api;
