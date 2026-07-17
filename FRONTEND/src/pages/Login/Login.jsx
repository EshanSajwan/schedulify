import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail
} from "lucide-react";

import { login as loginApi } from "../../api/AuthApi";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await loginApi(email, password);

            login(response);

            if (response.role === "ADMIN") {
                navigate("/");
            } else if (response.role === "TEACHER") {
                navigate("/teacher");
            } else {
                navigate("/student");
            }

        } catch {
            alert("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 px-4">

            <div className="w-full max-w-md">

                {/* Brand */}
                <div className="text-center mb-8">

                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 border border-white/20 shadow-xl mb-5">
                        <CalendarDays
                            size={42}
                            strokeWidth={1.8}
                            className="text-white"
                        />
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Schedulify
                    </h1>

                    <p className="text-purple-200 mt-2 text-sm">
                        Smart Timetable Generator
                    </p>

                </div>

                {/* Login Card */}
                <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8 sm:p-10">

                    <div className="mb-7">
                        <h2 className="text-2xl font-semibold text-white">
                                    Sign in
                        </h2>

                        <p className="text-sm text-purple-200 mt-1">
                            Enter your credentials to access your dashboard
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-purple-100 mb-2">
                                Email
                            </label>

                            <div className="relative">

                                <Mail
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200"
                                />

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-white placeholder-purple-200 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30"
                                />

                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-purple-100 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <LockKeyhole
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3.5 pl-12 pr-12 text-white placeholder-purple-200 outline-none transition focus:border-purple-300 focus:ring-2 focus:ring-purple-400/30"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white transition"
                                >
                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                </button>

                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-white py-3.5 font-semibold text-purple-900 transition hover:bg-purple-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>

                    </form>

                    <p className="text-center text-sm text-purple-200 mt-6">
                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-semibold text-white hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>

                    <div className="mt-7 text-center text-sm text-purple-200">
                        Access your personalized timetable dashboard
                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-xs text-purple-300 mt-6">
                    Created by{" "}
                    <span className="font-semibold text-white">
                        Eshan Sajwan
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Login;