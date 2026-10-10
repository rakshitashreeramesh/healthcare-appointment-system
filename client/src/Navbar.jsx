import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🏥 HealthCare App
        </Link>
        
        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/doctors">Doctors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/book-appointment">Book Appointment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/appointments">History</Link>
            </li>
            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link className="btn btn-light text-primary fw-bold px-4" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;