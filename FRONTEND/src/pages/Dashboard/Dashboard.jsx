import { useEffect, useState } from "react";

import StatCard from "../../components/dashboard/StatCard";
import { CalendarDays } from "lucide-react";
import { getDashboardStats } from "../../api/DashboardApi";
import {
    Users,
    BookOpen,
    DoorOpen,
    GraduationCap
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";

function Dashboard() {

    console.log("Dashboard rendered");

    const [stats, setStats] = useState({
        teachers: 0,
        subjects: 0,
        rooms: 0,
        classGroups: 0
    });

    useEffect(() => {
        console.log("useEffect called");
        loadStats();
    }, []);

    const navigate = useNavigate();

    async function loadStats() {

        console.log("loadStats started");

        try {

            const data = await getDashboardStats();

            console.log("API Response:", data);

            setStats(data);

        } catch (err) {

            console.error("Dashboard API Error:", err);

        }

    }

    return (
        <div className="space-y-8">

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    bg-gradient-to-br
                    from-sky-600
                    via-blue-600
                    to-indigo-700
                    p-10
                    text-white
                    shadow-2xl
                    shadow-blue-500/30
                    transition-all
                    duration-500
                    hover:scale-[1.01]
                    hover:shadow-blue-500/50
                "
            >
                {/* Background blobs */}
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse"></div>

                <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl animate-pulse"></div>

                <div className="relative z-10 flex items-center justify-between">

                    {/* Left Content */}
                    <div>

                        <h1 className="text-5xl font-extrabold tracking-tight">
                            Welcome to Schedulify 👋
                        </h1>

                        <div className="mt-5 flex gap-3 flex-wrap">

                            <span className="rounded-full bg-white/15 px-4 py-1 text-sm">
{/*                                 ⚡ AI Powered */}
                                    ⚡ Enterprise Timetable Management Platform
                            </span>

                            <span className="rounded-full bg-white/15 px-4 py-1 text-sm">
                                📅 Powered by Timefold
                            </span>

                            <span className="rounded-full bg-white/15 px-4 py-1 text-sm">
                                🚀 Optimization-Driven Scheduling Engine
                            </span>

                        </div>

                        <h2 className="mt-2 text-3xl font-semibold text-blue-100">
                            Smart Timetable Generator
                        </h2>

                        <p className="mt-5 max-w-2xl text-lg text-blue-100 leading-relaxed">
                            Powered by <span className="font-semibold">Timefold Optimization</span>.
                            Generates clash-free schedules while respecting teacher
                            preferences, room allocation and availability constraints.
                        </p>

                        <div className="mt-8 flex gap-4">

                            <Button
                                onClick={() => navigate("/timetable")}
                                className="
                                    bg-white
                                    text-blue-700
                                    px-6
                                    py-3
                                    rounded-xl
                                    shadow-lg
                                    hover:shadow-2xl
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "
                            >
                                View Timetable
                            </Button>

                            <Button
                                onClick={() => navigate("/teachers")}
                                className="
                                    border
                                    border-white/40
                                    bg-white/10
                                    backdrop-blur
                                    px-6
                                    py-3
                                    rounded-xl
                                    hover:bg-white
                                    hover:text-blue-700
                                    hover:-translate-y-1
                                    transition-all
                                    duration-300
                                "
                            >
                                Manage Teachers
                            </Button>

                        </div>

                    </div>

                    {/* Right Icon */}
                    <div className="relative hidden lg:flex items-center justify-center">

                        <div className="absolute h-72 w-72 rounded-full bg-white/10 blur-3xl animate-pulse"></div>

                        <CalendarDays
                            size={170}
                            strokeWidth={1.3}
                            className="
                                relative
                                text-white/80
                                drop-shadow-2xl
                                animate-bounce
                            "
                        />

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Teachers"
                    value={stats.teachers}
                    icon={Users}
                    color="blue"
                    onClick={() => navigate("/teachers")}
                />

                <StatCard
                    title="Subjects"
                    value={stats.subjects}
                    icon={BookOpen}
                    color="green"
                    onClick={() => navigate("/subjects")}
                />

                <StatCard
                    title="Rooms"
                    value={stats.rooms}
                    icon={DoorOpen}
                    color="orange"
                    onClick={() => navigate("/rooms")}
                />

                <StatCard
                    title="Class Groups"
                    value={stats.classGroups}
                    icon={GraduationCap}
                    color="purple"
                    onClick={() => navigate("/class-groups")}
                />

            </div>

        </div>
    );

}

export default Dashboard;