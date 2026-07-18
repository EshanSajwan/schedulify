import api from "./axios";

export const generateTimeTable = async () => {
    const response = await api.post("/api/timetable/generate");
    return response.data;
};

export const getRuns = async () => {
    const response = await api.get("/api/timetable/run");
    return response.data;
};

export const exportExcel = (runId) => {
    window.open(
        `https://schedulify-elfv.onrender.com/api/timetable/export/excel/${runId}`,
        "_blank"
    );
};

export const exportPdf = (runId) => {
    window.open(
        `https://schedulify-elfv.onrender.com/api/timetable/export/pdf/${runId}`,
        "_blank"
    );
};

export const getActiveTimetable = async () => {
    const response = await api.get("/api/timetable/active");
    return response.data;
};