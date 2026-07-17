import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";

import {
    generateTimeTable,
    getRuns,
    getActiveTimetable,
    exportExcel,
    exportPdf
} from "../../api/TimeTableApi";

import { toast } from "react-toastify";
import DataTable from "../../components/tables/DataTable";

function Timetable() {

    const [generating, setGenerating] = useState(false);

    const [entries, setEntries] = useState([]);

    const classGroups = [
        ...new Set(entries.map(entry => entry.classGroupName))
    ];

    const [selectedClass, setSelectedClass] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadActiveTimetable();
    }, []);

    const loadActiveTimetable = async () => {

        try {

            setLoading(true);

            const data = await getActiveTimetable();

            setEntries(data);

            if (data.length > 0) {
                setSelectedClass(data[0].classGroupName);

                // Get run ID for export
                const runs = await getRuns();

                if (runs.length > 0) {
                    const latestRun = runs.reduce((a, b) =>
                        a.id > b.id ? a : b
                    );

                    setRunId(latestRun.id);
                }
            }

        } catch (err) {

            console.error(err);

            // If there is no active timetable
            setEntries([]);

        } finally {

            setLoading(false);

        }

    };

    const filteredEntries = entries.filter(
        entry => entry.classGroupName === selectedClass
    );

    const [runId, setRunId] = useState(null);

    const handleGenerate = async () => {

        if (generating) return;

        try {

            setGenerating(true);

            const data = await generateTimeTable();

            setEntries(data);

            if (data.length > 0) {
                setSelectedClass(data[0].classGroupName);
            }

            // Get the latest run after generation
            const runs = await getRuns();

            const latestRun = runs.reduce((a, b) =>
                a.id > b.id ? a : b
            );

            setRunId(latestRun.id);

            toast.success("Timetable generated successfully");

        } catch (err) {

            console.error(err);

            toast.error("Failed to generate timetable");

        } finally {

            setGenerating(false);

        }

    };

        const handleExcelDownload = () => {

            if (!runId) {
                toast.error("Please generate a timetable first.");
                return;
            }

            exportExcel(runId);
        };

        const handlePdfDownload = () => {

            if (!runId) {
                toast.error("Please generate a timetable first.");
                return;
            }

            exportPdf(runId);
        };


    const columns = [
        {
            key: "subjectName",
            label: "Subject"
        },
        {
            key: "teacherName",
            label: "Teacher"
        },
        {
            key: "classGroupName",
            label: "Class"
        },
        {
            key: "roomNumber",
            label: "Room",

            render: (entry) => (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {entry.roomNumber}
                </span>
            )
        },
        {
            key: "day",
            label: "Day",

            render: (entry) => (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                    {entry.day}
                </span>
            )
        },
        {
            key: "time",
            label: "Time",

            render: (entry) =>
                `${entry.startTime} - ${entry.endTime}`
        }
    ];

    const days = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY"
    ];

    const timeSlots = [...new Set(
        filteredEntries.map(entry => `${entry.startTime} - ${entry.endTime}`)
    )];

    const getEntry = (day, time) => {
        return filteredEntries.find(
            entry =>
                entry.day === day &&
                `${entry.startTime} - ${entry.endTime}` === time
        );
    };

    if (!loading && entries.length === 0) {
        return (
            <div className="space-y-6">

                <PageHeader
                    title="Timetable"
                    subtitle="No timetable generated"
                />

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">

                    <div className="text-6xl mb-4">📅</div>

                    <h2 className="text-2xl font-bold">
                        No Timetable Generated
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Click below to generate a timetable.
                    </p>

                    <div className="mt-8">
                        <Button
                            onClick={() => {

                                const confirmed = window.confirm(
                                    "An active timetable already exists. Do you want to generate a new timetable?"
                                );

                                if (confirmed) {
                                    handleGenerate();
                                }

                            }}
                            disabled={generating}
                        >
                            {generating
                                ? "Generating..."
                                : "Generate New Timetable"
                            }
                        </Button>
                    </div>

                </div>

            </div>
        );
    }

    return (

        <div className="space-y-6">

            {generating && (
                <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center gap-3">

                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>

                        <div>
                            <p className="font-semibold text-blue-800">
                                Generating timetable...
                            </p>

                            <p className="text-sm text-blue-600">
                                Please wait. This may take a few seconds.
                            </p>
                        </div>

                    </div>
                </div>
            )}

            <PageHeader
                title="Timetable"
                subtitle={`${entries.length} timetable entries`}
                action={
                    <div className="flex gap-3">

                        <Button
                            onClick={handleGenerate}
                            disabled={generating}
                        >
                            {generating ? "Generating..." : "Generate Timetable"}
                        </Button>

                        <Button
                            onClick={handleExcelDownload}
                            disabled={!runId}
                        >
                            Export Excel
                        </Button>

                        <Button
                            onClick={handlePdfDownload}
                            disabled={!runId}
                        >
                            Export PDF
                        </Button>

                    </div>
                }
            />

            <div className="mb-6 flex items-center gap-4">

                <label className="font-semibold">
                    Class Group
                </label>

                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="rounded-lg border p-2"
                >

                    {classGroups.map(group => (

                        <option
                            key={group}
                            value={group}
                        >
                            {group}
                        </option>

                    ))}

                </select>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">

                <div className="overflow-x-auto">

                <table className="min-w-full border-collapse">

                    <thead>

                        <tr>

                            <th className="border bg-slate-100 p-3">
                                Time
                            </th>

                            {days.map(day => (

                                <th
                                    key={day}
                                    className="border bg-slate-100 p-3"
                                >
                                    {day}
                                </th>

                            ))}

                        </tr>

                    </thead>

                    <tbody>

                        {timeSlots.map(time => (

                            <tr key={time}>

                                <td className="border p-3 font-semibold whitespace-nowrap">

                                    {time}

                                </td>

                                {days.map(day => {

                                    const entry = getEntry(day, time);

                                    return (

                                        <td
                                            key={day}
                                            className="border p-2 align-top w-52 h-28"
                                        >

                                            {entry && (

                                                <div className="rounded-lg bg-blue-50 p-3">

                                                    <div className="font-bold">

                                                        {entry.subjectName}

                                                    </div>

                                                    <div className="text-sm text-slate-600">

                                                        {entry.teacherName}

                                                    </div>

                                                    <div className="text-sm">

                                                        {entry.classGroupName}

                                                    </div>

                                                    <div className="text-xs text-slate-500">

                                                        Room {entry.roomNumber}

                                                    </div>

                                                </div>

                                            )}

                                        </td>

                                    );

                                })}

                            </tr>

                        ))}

                    </tbody>

                </table>

                </div>

            </div>

        </div>

    );

}

export default Timetable;
