import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const login = async (email, password) => {

    const response = await API.post("/auth/login", {
        email,
        password
    });

    localStorage.setItem("token", response.data.token);

    return response.data;
};