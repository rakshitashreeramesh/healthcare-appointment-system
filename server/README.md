# 🏥 Healthcare Appointment Booking System

A full-stack web application built for a Healthcare Appointment System internship project. It allows patients to book, view, edit, and cancel appointments dynamically.

## 🚀 Features
* **Full CRUD Operations:** Book, view, update, and delete appointments.
* **Smart Validation:** Prevents double-booking same doctor/date/time slots.
* **Auto-Cleanup:** Automatically removes expired appointments from the database.
* **Dynamic Dashboard:** Real-time statistics on total bookings.
* **User Authentication Flow:** UI implemented for Login and Registration with state persistence.

## 💻 Tech Stack
* **Frontend:** React.js (Vite), Bootstrap, React Router
* **Backend:** Node.js, Express.js
* **Database:** MySQL

## 🛠️ Setup Instructions
1. Clone the repository.
2. Run `npm install` inside both the `client` and `server` folders.
3. Create a MySQL database named `healthcareDB` and run the SQL table creation script.
4. Add a `.env` file in the `server` directory with your database credentials.
5. Run `npm run dev` in the client, and `node server.js` in the server.