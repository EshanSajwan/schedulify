import axios from "axios";

const API = axios.create({
baseURL: "https://schedulify-elfv.onrender.com/api",
});

export const login = async (email, password) => {

    const response = await API.post("/auth/login", {
        email,
        password
    });

    localStorage.setItem("token", response.data.token);

    return response.data;
};