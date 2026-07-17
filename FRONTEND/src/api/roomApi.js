import api from "./axios";

export const getAllRooms = async () => {
    const response = await api.get("/api/rooms");
    return response.data;
};

export const createRoom = async (room) => {
    const response = await api.post("/api/rooms", room);
    return response.data;
};

export const updateRoom = async (id, room) => {
    const response = await api.put(`/api/rooms/${id}`, room);
    return response.data;
};

export const deleteRoom = async (roomNumber) => {
    await api.delete(`/api/rooms/${roomNumber}`);
};