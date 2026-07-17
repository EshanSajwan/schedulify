import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

function StudentTimetable() {

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

    const groupedEntries = days.reduce((acc, day) => {
        acc[day] = entries
            .filter(entry => entry.day === day)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));

        return acc;
    }, {});

    useEffect(() => {

        const loadTimetable = async () => {

            try {

                const response = await api.get(
                    "/api/students/me/timetable"
                );

                setEntries(response.data);

            } catch (error) {

                console.error(error);

                toast.error(
                    "Unable to load your timetable"
                );

            } finally {

                setLoading(false);

            }

        };

        loadTimetable();

    }, []);

    if (loading) {
        return (
            <div className="p-8 text-xl font-semibold">
                Loading your timetable...
            </div>
        );
    }

    return (

        <div className="space-y-6">

            <div>
                <h1 className="text-3xl font-bold">
                    My Timetable
                </h1>

                <p className="mt-1 text-slate-500">
                    Your personalized weekly class schedule
                </p>
            </div>

            {entries.length === 0 ? (

                <div className="rounded-2xl bg-white p-10 text-center shadow">
                    No timetable available.
                </div>

            ) : (

                <>

                    {/* Day Summary */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

                        {days.map(day => (

                            <div
                                key={day}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >

                                <h2 className="text-2xl font-bold text-slate-800">
                                    {day.charAt(0) + day.slice(1).toLowerCase()}
                                </h2>

                                <p className="mt-4 text-lg font-semibold text-blue-600">
                                    {groupedEntries[day].length} Classes
                                </p>

                            </div>

                        ))}

                    </div>

                    {/* Weekly Timetable */}

                    <div className="overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-200">

                        {/* Weekly Timetable Header */}

                        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">

                            <div>

                                <h2 className="text-2xl font-bold">
                                    Weekly Timetable
                                </h2>

                                <p className="mt-1 text-slate-500">
                                    Your classes for the week
                                </p>

                            </div>

                        </div>

                        <div className="overflow-x-auto">

                            <table className="min-w-full border-collapse">

                                <thead className="sticky top-0 z-10 bg-slate-50">

                                    <tr>

                                        <th className="border border-slate-200 bg-slate-50 p-4 text-left font-bold text-lg">
                                            Time
                                        </th>

                                        {days.map(day => (

                                            <th
                                                key={day}
                                                className="border border-slate-200 bg-slate-50 p-4 text-center font-bold text-lg"
                                            >
                                                {day.charAt(0) + day.slice(1).toLowerCase()}
                                            </th>

                                        ))}

                                    </tr>

                                </thead>

                                <tbody>

                                    {Array.from(
                                        new Set(
                                            entries
                                                .map(e => `${e.startTime}-${e.endTime}`)
                                                .sort()
                                        )
                                    ).map(time => (

                                        <tr
                                            key={time}
                                            className="h-36 transition-colors hover:bg-slate-50"
                                        >

                                            <td className="border border-slate-200 bg-slate-50 text-center font-semibold w-40">

                                                <div className="flex flex-col items-center justify-center h-full py-6">

                                                    <span className="text-lg">
                                                        {time.split("-")[0].slice(0,5)}
                                                    </span>

                                                    <span className="text-slate-300 text-2xl my-1">
                                                        —
                                                    </span>

                                                    <span className="text-lg">
                                                        {time.split("-")[1].slice(0,5)}
                                                    </span>

                                                </div>

                                            </td>

                                            {days.map(day => {

                                                const lecture = groupedEntries[day].find(
                                                    e =>
                                                        `${e.startTime}-${e.endTime}` ===
                                                        time
                                                );

                                                const getSubjectColor = (subject) => {

                                                    const name = subject.toLowerCase();

                                                    if (name.includes("operating"))
                                                        return "bg-green-50 border-green-200 text-green-700";

                                                    if (name.includes("database"))
                                                        return "bg-blue-50 border-blue-200 text-blue-700";

                                                    if (name.includes("dbms"))
                                                        return "bg-blue-50 border-blue-200 text-blue-700";

                                                    if (name.includes("data"))
                                                        return "bg-purple-50 border-purple-200 text-purple-700";

                                                    if (name.includes("computer"))
                                                        return "bg-cyan-50 border-cyan-200 text-cyan-700";

                                                    if (name.includes("network"))
                                                        return "bg-cyan-50 border-cyan-200 text-cyan-700";

                                                    if (name.includes("theory"))
                                                        return "bg-yellow-50 border-yellow-200 text-yellow-700";

                                                    if (name.includes("software"))
                                                        return "bg-pink-50 border-pink-200 text-pink-700";

                                                    if (name.includes("web"))
                                                        return "bg-indigo-50 border-indigo-200 text-indigo-700";

                                                    return "bg-slate-50 border-slate-200 text-slate-700";

                                                };



                                                return (


                                                    <td
                                                        key={day}
                                                        className="border border-slate-200 p-4 align-top"
                                                    >

                                                        {lecture ? (


                                                            <div
                                                                className={`h-full rounded-2xl border p-4 transition duration-200 hover:-translate-y-1 hover:shadow-lg ${getSubjectColor(lecture.subjectName)}`}
                                                            >



                                                                <div className="text-lg font-bold leading-snug">
                                                                    {lecture.subjectName}
                                                                </div>

                                                                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">

                                                                    👨‍🏫

                                                                    <span>{lecture.teacherName}</span>

                                                                </div>

                                                                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                                                                    📍

                                                                    <span>Room {lecture.roomNumber}</span>

                                                                </div>

                                                            </div>

                                                        ) : (

                                                            <div className="flex h-full min-h-[120px] items-center justify-center">
                                                                <span className="text-4xl font-light text-slate-200">—</span>
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

                </>

            )}

        </div>

    );

}

export default StudentTimetable;