import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stats")
      .then((response) => {
        setStats(response.data.totalAppointments);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h1>🏥 Welcome to Healthcare Appointment Booking System</h1>
      <p className="lead mt-3">
        Book appointments with experienced doctors quickly and easily.
      </p>

      <button
        className="btn btn-primary btn-lg mt-3"
        onClick={() => navigate("/book-appointment")}
      >
        Book Appointment
      </button>

      {/* Stats Dashboard */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-4">
          <div className="card p-4 shadow bg-light border-primary">
            <h3 className="text-primary">{stats}</h3>
            <h5>Total Appointments Booked</h5>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <h2>Our Services</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>Pediatrics</h4>
            <p className="text-muted">Specialized care for infants, children, and adolescents.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>Orthopedics</h4>
            <p className="text-muted">Expert surgical and medical treatment for bones and joints.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>General Medicine</h4>
            <p className="text-muted">Comprehensive care and routine health consultations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;