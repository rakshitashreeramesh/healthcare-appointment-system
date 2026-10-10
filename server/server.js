const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// MySQL Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rakshi@2006", 
  database: process.env.DB_NAME || "healthcareDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection()
  .then((connection) => {
    console.log("MySQL Connected");
    connection.release();
  })
  .catch((err) => {
    console.error("MySQL connection failed. Is MySQL running?", err);
  });

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Healthcare Appointment API Running with MySQL");
});

// Test Route
app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend Connected Successfully",
  });
});

// Get Dashboard Stats (With Auto-Delete for past dates)
app.get("/api/stats", async (req, res) => {
  try {
    await db.execute(`
      DELETE FROM appointments 
      WHERE date < CURDATE() 
      OR (date = CURDATE() AND time < CURTIME())
    `);

    const [rows] = await db.execute("SELECT COUNT(*) AS total FROM appointments");
    res.json({ totalAppointments: rows[0].total });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

// Save Appointment
app.post("/api/appointments", async (req, res) => {
  try {
    const { patientName, email, doctor, date, time, reason } = req.body;

    const [existingAppointment] = await db.execute(
      "SELECT * FROM appointments WHERE doctor = ? AND date = ? AND time = ?",
      [doctor, date, time]
    );

    if (existingAppointment.length > 0) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already booked.",
      });
    }

    await db.execute(
      "INSERT INTO appointments (patientName, email, doctor, date, time, reason) VALUES (?, ?, ?, ?, ?, ?)",
      [patientName, email, doctor, date, time, reason]
    );

    res.json({ success: true, message: "Appointment Saved Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Saving Appointment" });
  }
});

// Get All Appointments (With Auto-Delete for past dates)
app.get("/api/appointments", async (req, res) => {
  try {
    await db.execute(`
      DELETE FROM appointments 
      WHERE date < CURDATE() 
      OR (date = CURDATE() AND time < CURTIME())
    `);

    const [appointments] = await db.execute("SELECT * FROM appointments");
    res.json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// Update (Edit) Appointment
app.put("/api/appointments/:id", async (req, res) => {
  try {
    const { date, time, reason } = req.body;
    const appointmentId = req.params.id;

    await db.execute(
      "UPDATE appointments SET date = ?, time = ?, reason = ? WHERE id = ?",
      [date, time, reason, appointmentId]
    );

    res.json({ success: true, message: "Appointment Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error updating appointment" });
  }
});

// Delete Appointment
app.delete("/api/appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await db.execute("DELETE FROM appointments WHERE id = ?", [appointmentId]);
    
    res.json({ success: true, message: "Appointment Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error deleting appointment" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});