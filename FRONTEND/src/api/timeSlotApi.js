import api from "./axios";

export const getAllTimeSlots = async () => {
    const response = await api.get("/api/time-slot");
    return response.data;
};

export const createTimeSlot = async (timeSlot) => {
    const response = await api.post("/api/time-slot", timeSlot);
    return response.data;
};

export const updateTimeSlot = async (id, timeSlot) => {
    const response = await api.put(`/api/time-slot/${id}`, timeSlot);
    return response.data;
};

export const deleteTimeSlot = async (id) => {
    await api.delete(`/api/time-slot/${id}`);
};