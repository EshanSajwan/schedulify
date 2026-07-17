import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/Register/Register";

import Login from "../pages/Login/Login";

// Admin Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Teachers from "../pages/Teachers/Teachers";
import Subjects from "../pages/Subjects/Subjects";
import Rooms from "../pages/Rooms/Rooms";
import ClassGroups from "../pages/ClassGroups/ClassGroups";
import TimeSlots from "../pages/TimeSlots/TimeSlots";
import TimeTable from "../pages/Timetable/Timetable";
import Assignments from "../pages/Assignments/Assignments";
import Preferences from "../pages/Preferences/Preferences";
import Availability from "../pages/Availability/Availability";
// import Layout from "../components/layout/Layout";
// Teacher Pages
import TeacherDashboard from "../pages/Teachers/Dashboard";
import MyTimetable from "../pages/Teachers/MyTimetable";

// Student Pages (later)
// import StudentDashboard from "../pages/Student/Dashboard";
import StudentTimetable from "../pages/Student/StudentTimetable";;

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Protected Dashboard Layout */}
                <Route element={<DashboardLayout />}>

                    {/* Admin */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute role="ADMIN">
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Other admin routes */}

                    <Route index element={<Dashboard />} />
                     <Route path="teachers" element={
                                                    <ProtectedRoute role="ADMIN">
                                                        <Teachers />
                                                    </ProtectedRoute>

                                                    } />
                      <Route path="/subjects" element={
                          <ProtectedRoute role="ADMIN">
                              <Subjects />
                          </ProtectedRoute>
                          } />
                       <Route path="/rooms" element={
                           <ProtectedRoute role="ADMIN">
                                 <Rooms />
                             </ProtectedRoute>

                           } />
                        <Route path="/class-groups" element={
                            <ProtectedRoute role="ADMIN">
                                                          <ClassGroups />
                                                      </ProtectedRoute>

                            } />
                         <Route path="/time-slots" element={
                             <ProtectedRoute role="ADMIN">
                                                           <TimeSlots />
                                                       </ProtectedRoute>

                             } />
                          <Route path="/timetable" element={
                              <ProtectedRoute role="ADMIN">
                                                            <TimeTable />
                                                        </ProtectedRoute>

                              } />
                           <Route path="teaching-assignment" element={
                               <ProtectedRoute role="ADMIN">
                                                             <Assignments />
                                                         </ProtectedRoute>

                               } />
                            <Route path="/preferences" element={
                                <ProtectedRoute role="ADMIN">
                                                              <Preferences />
                                                          </ProtectedRoute>

                                } />
                            <Route path="/teacher-availability" element={
                                <ProtectedRoute role="ADMIN">
                                                              <Availability />
                                                          </ProtectedRoute>

                                } />

                    {/* Teacher */}
                    <Route
                        path="/teacher"
                        element={
                            <ProtectedRoute role="TEACHER">
                                <TeacherDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/teacher/timetable"
                        element={
                            <ProtectedRoute role="TEACHER">
                                <MyTimetable />
                            </ProtectedRoute>
                        }
                    />

                    {/* Student */}
                    <Route
                        path="/student"
                        element={
                            <ProtectedRoute role="STUDENT">
                                <StudentTimetable />
                            </ProtectedRoute>
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;