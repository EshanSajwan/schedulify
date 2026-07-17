import api from "./axios";

export const getAllTeachingAssignments = async () => {
    const { data } = await api.get("/api/teaching-assignment");
    return data;
};

export const createTeachingAssignment = async (assignment) => {
    const { data } = await api.post("/api/teaching-assignment", assignment);
    return data;
};

export const updateTeachingAssignment = async (id, assignment) => {
    const { data } = await api.put(`/api/teaching-assignment/${id}`, assignment);
    return data;
};

export const deleteTeachingAssignment = async (id) => {
    const { data } = await api.delete(`/api/teaching-assignment/${id}`);
    return data;
};