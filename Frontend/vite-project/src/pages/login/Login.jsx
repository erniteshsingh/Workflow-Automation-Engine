import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log("Login successful:", response.data);

      login(response.data.data);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
              <defs>
                <linearGradient
                  id="loginFlowGrad"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                >
                  <stop offset="0%" stopColor="#8B7FF7" />

                  <stop offset="100%" stopColor="#6D5EF5" />
                </linearGradient>
              </defs>

              <circle cx="7" cy="24" r="3.5" fill="url(#loginFlowGrad)" />

              <circle cx="16" cy="8" r="3.5" fill="url(#loginFlowGrad)" />

              <circle cx="25" cy="24" r="3.5" fill="url(#loginFlowGrad)" />

              <path
                d="M9.8 22 15 10.5M18 10.5l4.6 11.5"
                stroke="url(#loginFlowGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1>Welcome back</h1>

          <p>Login to your FlowEngine account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
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

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
