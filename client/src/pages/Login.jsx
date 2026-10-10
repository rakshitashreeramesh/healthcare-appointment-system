import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Notice we added { setIsLoggedIn } here as a prop
function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Save a mock user token in the browser's Local Storage
    localStorage.setItem("loggedInUser", JSON.stringify({ email: email }));
    
    // Update the Navbar to show "Logout"
    setIsLoggedIn(true);

    alert("Logged in successfully!");
    navigate("/");
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: "400px", borderRadius: "10px" }}>
        <h2 className="text-center text-primary mb-4">🔐 Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;