import {
    LayoutDashboard,
    Users,
    BookOpen,
    Building2,
    UsersRound,
    Clock3,
    ClipboardList,
    Star,
    CalendarCheck,
    CalendarRange,
    CalendarDays,
    Settings
} from "lucide-react";

export const getSidebarMenu = (role) => {

    if (role === "TEACHER") {

        return [
            {
                section: "MAIN",
                items: [
                    {
                        title: "Dashboard",
                        icon: LayoutDashboard,
                        path: "/teacher"
                    },
                    {
                        title: "My Timetable",
                        icon: CalendarRange,
                        path: "/teacher/timetable"
                    }
                ]
            }
        ];
    }

    if (role === "STUDENT") {

        return [
                    {
                        section: "MY ACADEMICS",

                        items: [
                            {
                                title: "My Timetable",
                                path: "/student",
                                icon: CalendarDays
                            }
                        ]
                    }
                ];
    }

    // ADMIN
    return [
        {
            section: "MAIN",
            items: [
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    path: "/"
                }
            ]
        },
        {
            section: "ACADEMIC",
            items: [
                {
                    title: "Teachers",
                    icon: Users,
                    path: "/teachers"
                },
                {
                    title: "Subjects",
                    icon: BookOpen,
                    path: "/subjects"
                },
                {
                    title: "Rooms",
                    icon: Building2,
                    path: "/rooms"
                },
                {
                    title: "Class Groups",
                    icon: UsersRound,
                    path: "/class-groups"
                },
                {
                    title: "Time Slots",
                    icon: Clock3,
                    path: "/time-slots"
                }
            ]
        },
        {
            section: "SCHEDULING",
            items: [
                {
                    title: "Assignments",
                    icon: ClipboardList,
                    path: "/teaching-assignment"
                },
                {
                    title: "Preferences",
                    icon: Star,
                    path: "/preferences"
                },
                {
                    title: "Availability",
                    icon: CalendarCheck,
                    path: "/teacher-availability"
                }
            ]
        },
        {
            section: "TIMETABLE",
            items: [
                {
                    title: "Timetable",
                    icon: CalendarRange,
                    path: "/timetable"
                }
            ]
        },
        {
            section: "SYSTEM",
            items: [
                {
                    title: "Settings",
                    icon: Settings,
                    path: "/settings"
                }
            ]
        }
    ];
};