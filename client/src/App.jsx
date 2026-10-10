import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login"; 
import Register from "./pages/Register";

function App() {
  // State to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check local storage when the app loads
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user from storage
    setIsLoggedIn(false); // Update Navbar
    alert("Logged out successfully!");
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
              🏥 Healthcare System
            </Link>

            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center gap-2">
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
                
                {/* Dynamic Login / Logout Button */}
                {isLoggedIn ? (
                  <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                    <button className="btn btn-danger fw-bold px-4" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                    <Link className="btn btn-light text-primary fw-bold px-4" to="/login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <main className="flex-grow-1 pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/register" element={<Register />} />
            {/* Pass setIsLoggedIn to Login page so it can update the Navbar */}
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-light text-center py-4 mt-auto">
          <div className="container">
            <p className="mb-0">© 2026 Healthcare Appointment System. All Rights Reserved.</p>
            <small className="text-muted">Built for Internship Project Portfolio</small>
          </div>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;