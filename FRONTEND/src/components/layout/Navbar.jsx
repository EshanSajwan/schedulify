import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, LogOut, ChevronDown } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const roleNames = {
        ADMIN: "Administrator",
        TEACHER: "Faculty",
        STUDENT: "Student"
    };

    const displayName = user?.name || user?.username || "User";

    const displayRole = roleNames[user?.role] || user?.role || "User";

    const initial = displayName.charAt(0).toUpperCase();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <header className="h-16 bg-white border-b flex items-center justify-between px-8">

            {/* Brand */}
            <div className="flex items-center gap-2 text-blue-600">

                <Sparkles size={22} />

                <span className="font-semibold">
                    Smart Timetable Generator
                </span>

            </div>


            {/* User Section */}
            <div className="relative">

                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-50 transition"
                >

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">

                        {initial}

                    </div>


                    {/* User Info */}
                    <div className="text-left hidden sm:block">

                        <p className="text-sm font-semibold text-gray-800">
                            {displayName}
                        </p>

                        <p className="text-xs text-gray-500">
                            {displayRole}
                        </p>

                    </div>


                    <ChevronDown
                        size={17}
                        className={`text-gray-500 transition-transform ${
                            open ? "rotate-180" : ""
                        }`}
                    />

                </button>


                {/* Dropdown */}
                {open && (

                    <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg overflow-hidden z-50">

                        <div className="px-4 py-3 border-b">

                            <p className="font-semibold text-gray-800">
                                {displayName}
                            </p>

                            <p className="text-sm text-gray-500">
                                {displayRole}
                            </p>

                        </div>


                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition"
                        >

                            <LogOut size={18} />

                            <span className="font-medium">
                                Logout
                            </span>

                        </button>

                    </div>

                )}

            </div>

        </header>

    );

}

export default Navbar;