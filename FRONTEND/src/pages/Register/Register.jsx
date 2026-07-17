import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    User,
    Users
} from "lucide-react";

import { getAllClassGroups } from "../../api/classGroupApi";
import { createStudent } from "../../api/StudentApi";

function Register() {

    const navigate = useNavigate();

    const [classGroups, setClassGroups] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        classGroupId: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchClassGroups = async () => {

            try {

                const data = await getAllClassGroups();

                setClassGroups(data);

            } catch (error) {

                console.error("Failed to load class groups", error);

                setError("Unable to load class groups");

            }

        };

        fetchClassGroups();

    }, []);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (formData.password !== confirmPassword) {

            setError("Passwords do not match");

            return;

        }

        try {

            setLoading(true);

            await createStudent({
                ...formData,
                classGroupId: Number(formData.classGroupId)
            });

            alert("Account created successfully!");

            navigate("/login");

        } catch (error) {

            setError(
                error.response?.data ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 px-4 py-8">

            <div className="w-full max-w-md">

                {/* Brand */}
                <div className="text-center mb-6">

                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 border border-white/20 shadow-xl mb-4">

                        <CalendarDays
                            size={34}
                            className="text-white"
                        />

                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Schedulify
                    </h1>

                    <p className="text-purple-200 mt-1 text-sm">
                        Create your student account
                    </p>

                </div>


                {/* Card */}
                <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-7">

                    <h2 className="text-2xl font-semibold text-white">
                        Create an account
                    </h2>

                    <p className="text-sm text-purple-200 mt-1 mb-6">
                        Register as a student to access your timetable
                    </p>


                    {error && (

                        <div className="mb-5 rounded-lg bg-red-500/20 border border-red-400/30 px-4 py-3 text-sm text-red-100">
                            {error}
                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Name */}
                        <div>

                            <label className="block text-sm font-medium text-purple-100 mb-2">
                                Full Name
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-white placeholder-purple-200 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30"
                                />

                            </div>

                        </div>


                        {/* Email */}
                        <div>

                            <label className="block text-sm font-medium text-purple-100 mb-2">
                                Email
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-white placeholder-purple-200 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30"
                                />

                            </div>

                        </div>


                        {/* Class Group */}
                        <div>

                            <label className="block text-sm font-medium text-purple-100 mb-2">
                                Class Group
                            </label>

                            <div className="relative">

                                <Users
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200"
                                />

                                <select
                                    name="classGroupId"
                                    value={formData.classGroupId}
                                    onChange={handleChange}
                                    required
                                    className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-white outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30"
                                >

                                    <option
                                        value=""
                                        className="text-gray-800"
                                    >
                                        Select your class group
                                    </option>

                                    {classGroups.map((group) => (

                                        <option
                                            key={group.id}
                                            value={group.id}
                                            className="text-gray-800"
                                        >
                                            {group.name}
                                        </option>

                                    ))}

                                </select>

                            </div>

                        </div>


                        {/* Password */}
                        <div>

                            <label className="block text-sm font-medium text-purple-100 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-12 text-white placeholder-purple-200 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white"
                                >
                                    {showPassword
                                        ? <EyeOff size={18} />
                                        : <Eye size={18} />
                                    }
                                </button>

                            </div>

                        </div>


                        {/* Confirm Password */}
                        <div>

                            <label className="block text-sm font-medium text-purple-100 mb-2">
                                Confirm Password
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200"
                                />

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-12 text-white placeholder-purple-200 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white"
                                >
                                    {showConfirmPassword
                                        ? <EyeOff size={18} />
                                        : <Eye size={18} />
                                    }
                                </button>

                            </div>

                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-white py-3.5 font-semibold text-purple-900 transition hover:bg-purple-100 active:scale-[0.98] disabled:opacity-60"
                        >
                            {loading
                                ? "Creating account..."
                                : "Create account"
                            }
                        </button>

                    </form>


                    {/* Login Link */}
                    <p className="text-center text-sm text-purple-200 mt-6">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-white hover:underline"
                        >
                            Sign in
                        </Link>

                    </p>

                </div>


                <p className="text-center text-xs text-purple-300 mt-5">
                    Created by{" "}
                    <span className="font-semibold text-white">
                        Eshan Sajwan
                    </span>
                </p>

            </div>

        </div>

    );

}

export default Register;