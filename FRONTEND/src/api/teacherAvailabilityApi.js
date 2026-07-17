import api from "./axios";

export const getAllTeacherAvailability = async () => {
    const { data } = await api.get("/api/teacher-availability");
    return data;
};

export const createTeacherAvailability = async (availability) => {
    const { data } = await api.post(
        "/api/teacher-availability",
        availability
    );
    return data;
};

export const updateTeacherAvailability = async (id, availability) => {
    const { data } = await api.put(
        `/api/teacher-availability/${id}`,
        availability
    );
    return data;
};

export const deleteTeacherAvailability = async (id) => {
    const { data } = await api.delete(
        `/api/teacher-availability/${id}`
    );
    return data;
};