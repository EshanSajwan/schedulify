import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { toast } from "react-toastify";
import { getMyTimetable } from "../../api/teacherApi";

function Timetable() {

    const [entries, setEntries] = useState([]);

    const classGroups = [
        ...new Set(entries.map(entry => entry.classGroupName))
    ];

    const [selectedClass, setSelectedClass] = useState("");

    const [loading, setLoading] = useState(true);

    const filteredEntries = entries.filter(
        entry => entry.classGroupName === selectedClass
    );

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

    useEffect(() => {
        loadTimetable();
    }, []);

    const loadTimetable = async () => {

        try {

            const data = await getMyTimetable();

            setEntries(data);

            if (data.length > 0) {
                setSelectedClass(data[0].classGroupName);
            }

        } catch (err) {

            console.error(err);

            toast.error("Failed to load timetable");

        } finally {

            setLoading(false);

        }

    };

    if (!loading && entries.length === 0) {
        return (
            <div className="space-y-6">

                <PageHeader
                    title="My Timetable"
                    subtitle="No lectures assigned"
                />

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">

                    <div className="text-6xl mb-4">📅</div>

                    <h2 className="text-2xl font-bold">
                        No Timetable Generated
                    </h2>

                    <p className="mt-2 text-slate-500">
                        No lectures have been assigned to you.
                    </p>

                </div>

            </div>
        );
    }

    return (

        <div className="space-y-6">

            <PageHeader
                title="My Timetable"
                subtitle={`${entries.length} lectures assigned`}
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