import api from "./axios";

export const getAllClassGroups = async () => {
    const response = await api.get("/api/class-group");
    return response.data;
};

export const createClassGroup = async (classGroup) => {
    const response = await api.post("/api/class-group", classGroup);
    return response.data;
};

export const updateClassGroup = async (id, classGroup) => {
    const response = await api.put(`/api/class-group/${id}`, classGroup);
    return response.data;
};

export const deleteClassGroup = async (id) => {
    await api.delete(`/api/class-group/${id}`);
};