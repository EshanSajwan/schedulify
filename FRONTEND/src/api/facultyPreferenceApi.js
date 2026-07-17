import api from "./axios";

export const getAllFacultyPreferences = async () => {
    const { data } = await api.get("/api/faculty-preference");
    return data;
};

export const createFacultyPreference = async (preference) => {
    const { data } = await api.post("/api/faculty-preference", preference);
    return data;
};

export const updateFacultyPreference = async (id, preference) => {
    const { data } = await api.put(`/api/faculty-preference/${id}`, preference);
    return data;
};

export const deleteFacultyPreference = async (id) => {
    const { data } = await api.delete(`/api/faculty-preference/${id}`);
    return data;
};