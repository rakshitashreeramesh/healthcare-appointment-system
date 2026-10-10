import { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ date: "", time: "", reason: "" });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios
      .get("http://localhost:5000/api/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await axios.delete(`http://localhost:5000/api/appointments/${id}`);
        setAppointments(appointments.filter((app) => app.id !== id));
        alert("Appointment canceled successfully!");
      } catch (error) {
        console.log(error);
        alert("Error canceling appointment");
      }
    }
  };

  const handleEditClick = (appointment) => {
    setEditingId(appointment.id);
    // Format date string for the date input field
    const formattedDate = new Date(appointment.date).toISOString().split('T')[0];
    setEditFormData({ date: formattedDate, time: appointment.time, reason: appointment.reason });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/${id}`, editFormData);
      setEditingId(null);
      fetchAppointments();
      alert("Appointment updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Error updating appointment");
    }
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h1>Appointment History</h1>

      {appointments.length === 0 ? (
        <p className="mt-3">No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div className="card p-3 mb-3 shadow-sm" key={appointment.id}>
            <h5>{appointment.patientName}</h5>
            <p className="mb-1"><strong>Email:</strong> {appointment.email}</p>
            <p className="mb-2"><strong>Doctor:</strong> {appointment.doctor}</p>

            {editingId === appointment.id ? (
              <div className="mb-3 p-3 bg-light rounded border">
                <label className="fw-bold">New Date</label>
                <input type="date" name="date" className="form-control mb-2" value={editFormData.date} onChange={handleChange} />
                
                <label className="fw-bold">New Time</label>
                <input type="time" name="time" className="form-control mb-2" value={editFormData.time} onChange={handleChange} />
                
                <label className="fw-bold">New Reason</label>
                <input type="text" name="reason" className="form-control mb-2" value={editFormData.reason} onChange={handleChange} />
                
                <button className="btn btn-success me-2" onClick={() => handleUpdate(appointment.id)}>Save Changes</button>
                <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <p className="mb-1"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="mb-1"><strong>Time:</strong> {appointment.time}</p>
                <p className="mb-2"><strong>Reason:</strong> {appointment.reason}</p>
                
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-warning text-dark" onClick={() => handleEditClick(appointment)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(appointment.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Appointments;