import { NavLink } from "react-router-dom";
import { getSidebarMenu } from "../../constants/sidebarMenu";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    const sidebarMenu = getSidebarMenu(user?.role);

    return (
        <aside className="w-72 h-screen bg-slate-900 border-r border-slate-800 flex flex-col shadow-xl">

            {/* Logo */}

            <div className="h-20 flex items-center justify-center border-b border-slate-800">

                 <h1 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-blue-500">Sched</span>
                    <span className="text-white">ulify</span>
                </h1>

{/*                     <h1 className="text-4xl font-extrabold tracking-tight text-blue-500"> */}
{/*                         Schedulify */}
{/*                     </h1> */}

            </div>

            {/* Navigation */}

            <div className="flex-1 overflow-y-auto py-5">

                {sidebarMenu.map((group) => (

                    <div key={group.section} className="mb-8">

                        {/* Section Title */}

                        <p className="px-6 mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">

                            {group.section}

                        </p>

                        {/* Menu Items */}

                        <div className="space-y-1 px-3">

                            {group.items.map((item) => {

                                const Icon = item.icon;

                                return (

                                    <NavLink
                                        key={item.title}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `group flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200
                                            ${
                                                isActive
                                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                            }`
                                        }
                                    >

                                        <Icon
                                            size={20}
                                            className="transition-transform duration-200 group-hover:scale-110"
                                        />

                                        <span>{item.title}</span>

                                    </NavLink>

                                );

                            })}

                        </div>

                    </div>

                ))}

            </div>

            {/* Footer */}

            <div className="border-t border-slate-800 p-4">

                <p className="text-center text-xs text-slate-500">
                    TimeTable Generator v1.0
                </p>

            </div>

        </aside>
    );
}

export default Sidebar;