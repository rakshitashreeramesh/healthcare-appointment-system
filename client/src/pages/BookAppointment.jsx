import { useState } from "react";
import axios from "axios";

function BookAppointment() {
  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
    reason: "",
  });

  // Get today's date in YYYY-MM-DD format to block past dates
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        formData
      );

      alert(response.data.message);

      setFormData({
        patientName: "",
        email: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Error booking appointment"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        📅 Book an Appointment
      </h1>

      <div className="card p-4 shadow" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="fw-bold">Patient Name</label>
            <input type="text" name="patientName" className="form-control" value={formData.patientName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="fw-bold">Email</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="fw-bold">Select Doctor</label>
            <select name="doctor" className="form-select" value={formData.doctor} onChange={handleChange} required >
              <option value="">Choose Doctor</option>
              <option>Dr. Indumathy</option>
              <option>Dr. Ramesh</option>
              <option>Dr. Ambika</option>
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="fw-bold">Date</label>
              <input 
                type="date" 
                name="date" 
                className="form-control" 
                value={formData.date} 
                onChange={handleChange} 
                min={today} /* This single line disables past dates! */
                required 
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="fw-bold">Time</label>
              <input type="time" name="time" className="form-control" value={formData.time} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="fw-bold">Reason</label>
            <textarea name="reason" className="form-control" rows="3" value={formData.reason} onChange={handleChange} required ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Book Appointment
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookAppointment;