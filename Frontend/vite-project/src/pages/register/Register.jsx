import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Registration successful:", response.data);

      register(response.data.user);

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <div className="register-logo">
            <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
              <defs>
                <linearGradient
                  id="registerFlowGrad"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                >
                  <stop offset="0%" stopColor="#8B7FF7" />
                  <stop offset="100%" stopColor="#6D5EF5" />
                </linearGradient>
              </defs>

              <circle cx="7" cy="24" r="3.5" fill="url(#registerFlowGrad)" />

              <circle cx="16" cy="8" r="3.5" fill="url(#registerFlowGrad)" />

              <circle cx="25" cy="24" r="3.5" fill="url(#registerFlowGrad)" />

              <path
                d="M9.8 22 15 10.5M18 10.5l4.6 11.5"
                stroke="url(#registerFlowGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1>Create account</h1>

          <p>Start building powerful workflows with FlowEngine</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path
                      d="M3 3l18 18M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5M6.6 6.7C4.5 8.1 3 10 2 12c1.7 3.6 5.4 7 10 7 1.7 0 3.2-.4 4.6-1.1M9.9 4.2A10.4 10.4 0 0 1 12 4c4.6 0 8.3 3.4 10 7-.5 1.1-1.2 2.2-2.1 3.2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path
                      d="M2 12c1.7-3.6 5.4-7 10-7s8.3 3.4 10 7c-1.7 3.6-5.4 7-10 7s-8.3-3.4-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>

            <div className="password-field">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((s) => !s)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path
                      d="M3 3l18 18M10.6 10.6a2.5 2.5 0 0 0 3.5 3.5M6.6 6.7C4.5 8.1 3 10 2 12c1.7 3.6 5.4 7 10 7 1.7 0 3.2-.4 4.6-1.1M9.9 4.2A10.4 10.4 0 0 1 12 4c4.6 0 8.3 3.4 10 7-.5 1.1-1.2 2.2-2.1 3.2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path
                      d="M2 12c1.7-3.6 5.4-7 10-7s8.3 3.4 10 7c-1.7 3.6-5.4 7-10 7s-8.3-3.4-10-7Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <p className="register-error">{error}</p>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
