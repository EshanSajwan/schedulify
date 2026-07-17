import api from "./axios";

export const createStudent = async (student) => {
    const response = await api.post("/api/students", student);
    return response.data;
};