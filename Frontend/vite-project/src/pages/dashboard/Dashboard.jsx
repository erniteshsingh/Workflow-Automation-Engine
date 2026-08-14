import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const statusStyles = {
  active: {
    label: "Active",
    className: "status-active",
  },
  paused: {
    label: "Paused",
    className: "status-paused",
  },
  draft: {
    label: "Draft",
    className: "status-draft",
  },
  failed: {
    label: "Failed",
    className: "status-failed",
  },
};

const formatDate = (value) => {
  if (!value) return null;

  try {
    return new Date(value).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
};

const Dashboard = () => {
  const [workflows, setWorkflows] = useState([]);

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:5000/api/v1/workflows",
        {
          params: {
            page,
            limit,
          },
          withCredentials: true,
        },
      );

      console.log("Workflows response:", response.data);

      const data = response.data?.data;

      setWorkflows(data?.workflows || []);
      setTotal(data?.total || 0);
      setPage(data?.page || 1);
      setTotalPages(data?.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch workflows:", err);

      setError(err.response?.data?.message || "Failed to load workflows.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, [page]);

  const activeCount = workflows.filter(
    (workflow) => workflow.status === "active",
  ).length;

  const inactiveCount = total - activeCount;

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header">
          <span className="dashboard-eyebrow">Overview</span>

          <h1>Dashboard</h1>

          <p>Loading your workflow data&hellip;</p>
        </div>

        <div className="stats-grid">
          {[1, 2, 3].map((i) => (
            <div className="stat-card skeleton" key={i}>
              <div className="skeleton-line skeleton-icon"></div>
              <div className="skeleton-line skeleton-number"></div>
              <div className="skeleton-line skeleton-label"></div>
            </div>
          ))}
        </div>

        <div className="workflows-card skeleton">
          {[1, 2, 3].map((i) => (
            <div className="skeleton-row" key={i}></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-error">
          <span className="error-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M12 8v5M12 16h.01"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <h2>Couldn&apos;t load your dashboard</h2>

          <p>{error}</p>

          <button className="retry-btn" onClick={fetchWorkflows}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <span className="dashboard-eyebrow">Overview</span>

        <h1>Dashboard</h1>

        <p>A quick look at your automation activity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <circle
                cx="6"
                cy="6"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <circle
                cx="18"
                cy="12"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <circle
                cx="6"
                cy="18"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M8.5 7.2 15.5 11M8.5 16.8 15.5 13"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span className="stat-value">{total}</span>

          <span className="stat-label">Total workflows</span>
        </div>

        <div className="stat-card">
          <span className="stat-icon accent">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="M7 5v14l12-7L7 5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="stat-value">{activeCount}</span>

          <span className="stat-label">Active</span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <circle
                cx="12"
                cy="12"
                r="8.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />

              <path
                d="M12 7.5V12l3 2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="stat-value">
            {inactiveCount < 0 ? 0 : inactiveCount}
          </span>

          <span className="stat-label">Inactive / other</span>
        </div>
      </div>

      <div className="workflows-section">
        <div className="workflows-section-header">
          <h2>Recent workflows</h2>
        </div>

        {workflows.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
                <circle
                  cx="6"
                  cy="6"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <circle
                  cx="18"
                  cy="12"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <circle
                  cx="6"
                  cy="18"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M8.5 7.2 15.5 11M8.5 16.8 15.5 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <h3>No workflows yet</h3>

            <p>Create your first workflow to start automating your tasks.</p>

            <Link to="/workflows" className="empty-cta">
              Go to Workflows
            </Link>
          </div>
        ) : (
          <>
            <div className="workflows-card">
              {workflows.map((workflow) => {
                const status = statusStyles[workflow.status] || null;

                const updated = formatDate(workflow.updatedAt);

                return (
                  <Link
                    to={`/workflows/${workflow._id}`}
                    className="workflow-row"
                    key={workflow._id}
                  >
                    <span className="workflow-row-icon">
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                      >
                        <circle
                          cx="6"
                          cy="6"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />

                        <circle
                          cx="18"
                          cy="12"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />

                        <circle
                          cx="6"
                          cy="18"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />

                        <path
                          d="M8.5 7.2 15.5 11M8.5 16.8 15.5 13"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    <span className="workflow-row-name">{workflow.name}</span>

                    <span className="workflow-row-meta">
                      {updated && (
                        <span className="workflow-row-date">
                          Updated {updated}
                        </span>
                      )}

                      {status && (
                        <span className={`status-badge ${status.className}`}>
                          {status.label}
                        </span>
                      )}
                    </span>

                    <span className="workflow-row-arrow" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  Previous
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
