import api from "./axios";

export const getAllSubjects = async () => {
    return (await api.get("/api/subject")).data;
};

export const createSubject = async (subject) => {
    const response = await api.post("/api/subject", subject);
    return response.data;
};

export const updateSubject = async (id, subject) => {
    const response = await api.put(`/api/subject/${id}`, subject);
    return response.data;
};

export const deleteSubject = async (id) => {
    await api.delete(`/api/subject/${id}`);
};