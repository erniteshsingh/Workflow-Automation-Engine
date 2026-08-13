import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AppLayout.css";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      </svg>
    ),
  },

  {
    to: "/workflows",
    label: "Workflows",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <circle
          cx="18"
          cy="6"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="18"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M8.5 6h7M7.5 8l3 7.5M16.5 8l-3 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    to: "/executions",
    label: "Executions",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path
          d="M4 19V5M4 19h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M7 15l3-4 3 2 5-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: "/profile",
    label: "Profile",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M5 20c.8-3.5 3.2-5.5 7-5.5s6.2 2 7 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="app-layout">
      <button
        className="sidebar-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <aside className={`app-sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="24" height="24" fill="none">
              <defs>
                <linearGradient
                  id="sidebarFlowGrad2"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                >
                  <stop offset="0%" stopColor="#8B7FF7" />
                  <stop offset="100%" stopColor="#6D5EF5" />
                </linearGradient>
              </defs>

              <circle cx="7" cy="24" r="3.5" fill="url(#sidebarFlowGrad2)" />

              <circle cx="16" cy="8" r="3.5" fill="url(#sidebarFlowGrad2)" />

              <circle cx="25" cy="24" r="3.5" fill="url(#sidebarFlowGrad2)" />

              <path
                d="M9.8 22 15 10.5M18 10.5l4.6 11.5"
                stroke="url(#sidebarFlowGrad2)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          FlowEngine
        </div>

        <span className="sidebar-eyebrow">Menu</span>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "is-active" : ""}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}

              <span className="sidebar-user-status" aria-hidden="true"></span>
            </div>

            <div className="sidebar-user-info">
              <strong>{user?.name || "User"}</strong>
              <small>{user?.email || ""}</small>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <span className="sidebar-link-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path
                  d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />

                <path
                  d="M14 8l4 4-4 4M18 12H9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Logout
          </button>
        </div>
      </aside>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
