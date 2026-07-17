import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function DashboardLayout() {

    return (

        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Navbar />

                <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;