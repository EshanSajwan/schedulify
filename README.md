# 🚀 Schedulify – AI Powered Automated Timetable Generation System

Schedulify is a full-stack web application that automates academic timetable generation by efficiently scheduling classes while satisfying complex constraints such as faculty availability, room allocation, subject assignments, and class conflicts. The system uses **Timefold Solver (OptaPlanner successor)** to generate optimized timetables with minimal manual intervention.

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-Based Access Control (Admin , Faculty & Student)
- 👨‍🏫 Faculty Management
- 👨‍🎓 Student Management
- 📚 Subject Management
- 🏫 Room Management
- 👨‍🎓 Class Group Management
- ⏰ Time Slot Management
- 📋 Teaching Assignment Management
- 📅 Faculty Availability Management
- ⚙️ Automated Timetable Generation using Timefold Solver
- 📊 Interactive Dashboard with Statistics
- 📄 Export Timetable to PDF & Excel
- 📱 Responsive Modern UI
- 🔒 Secure REST APIs using Spring Security

---

# 🛠 Tech Stack

## Backend

- Java 25
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Timefold Solver
- Maven

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Vite

---

# 🧠 Constraint Optimization

Schedulify uses **Timefold Solver** to generate conflict-free and optimized timetables.

## Hard Constraints

- ✅ No faculty conflicts
- ✅ No room conflicts
- ✅ No class group conflicts
- ✅ Lab subjects assigned only to lab rooms
- ✅ Faculty availability strictly respected
- ✅ One lecture per class at a time

## Soft Constraints

- 📌 Balanced lecture distribution
- 📌 Reduced timetable gaps
- 📌 Better classroom utilization
- 📌 Improved schedule quality
- 📌 Even workload distribution for faculty

---

# 📂 Project Structure

```
Schedulify/
│
├── BACKEND/                 # Spring Boot Backend
├── FRONTEND/                # React Frontend
├── pom.xml
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/EshanSajwan/schedulify.git

cd schedulify
```

---

## Backend Setup

Configure your MySQL database in:

```
src/main/resources/application.properties
```

Run the backend:

```bash
mvn clean install

mvn spring-boot:run
```

Backend:

```
http://localhost:8080
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🔐 Authentication

Schedulify uses **JWT Authentication** with Spring Security.

### Roles

- 👑 Admin
- 👨‍🏫 Faculty
- 👨‍🎓 Student

All protected endpoints require a valid JWT access token.

---

# 📄 Export Features

- PDF Timetable Export
- Excel Timetable Export

---

# 📸 Screenshots

Add screenshots for:

- Login Page
- Dashboard
- Faculty Management
- Timetable Generation
- Generated Timetable
- PDF Export
- Excel Export

---

# 🚀 Future Improvements

- Multi-department scheduling
- Semester-wise timetable management
- Drag & Drop timetable editing
- Email notifications
- Attendance integration
- Mobile application
- AI-assisted timetable optimization

---

# 👨‍💻 Developer

## Eshan

**Aspiring Software Engineer | Java Backend Developer**

### Connect with me

- GitHub: https://github.com/EshanSajwan
- LinkedIn: https://linkedin.com/in/eshan-sajwan-14996b281/

---

⭐ If you found this project useful, consider giving it a **Star**.
