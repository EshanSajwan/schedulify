import api from "./axios";

export const getAllTeachers = async () => {
    const response = await api.get("/api/teacher");
    return response.data;
};

export const getTeacherById = async (id) => {
    const response = await api.get(`/api/teacher/${id}`);
    return response.data;
};

export const createTeacher = async (teacher) => {
    const response = await api.post("/api/teacher", teacher);
    return response.data;
};

export const updateTeacher = async (id, teacher) => {
    const response = await api.put(`/api/teacher/${id}`, teacher);
    return response.data;
};

export const deleteTeacher = async (id) => {
    const response = await api.delete(`/api/teacher/${id}`);
    return response.data;
};

export const getMyTimetable = async () => {

    const response = await api.get("/api/teacher/me/timetable");

    return response.data;
};