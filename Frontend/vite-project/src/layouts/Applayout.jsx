import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./AppLayout.css";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <rect
          x="3.5"
          y="3.5"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="13.5"
          y="3.5"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="3.5"
          y="13.5"
          width="7"
          height="7"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <rect
          x="13.5"
          y="13.5"
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
        <circle cx="6" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.8" />
        <circle
          cx="18"
          cy="7"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="17"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M7.8 8.4 10.5 15M16.2 8.4 13.5 15M8.2 7h7.6"
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
          d="M3 12h4l2-7 4 14 2-9 2 4h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <header className="app-topbar">
        <button
          className="sidebar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="topbar-logo">
          <span className="topbar-logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
              <defs>
                <linearGradient
                  id="sidebarFlowGrad"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                >
                  <stop offset="0%" stopColor="#8B7FF7" />
                  <stop offset="100%" stopColor="#6D5EF5" />
                </linearGradient>
              </defs>
              <circle cx="7" cy="24" r="3.5" fill="url(#sidebarFlowGrad)" />
              <circle cx="16" cy="8" r="3.5" fill="url(#sidebarFlowGrad)" />
              <circle cx="25" cy="24" r="3.5" fill="url(#sidebarFlowGrad)" />
              <path
                d="M9.8 22 15 10.5M18 10.5l4.6 11.5"
                stroke="url(#sidebarFlowGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          FlowEngine
        </div>
      </header>

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
      </aside>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
