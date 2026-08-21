import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Workflow.css";

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

const Workflow = () => {
  const [workflows, setWorkflows] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

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

      const data = response.data?.data;

      setWorkflows(Array.isArray(data?.workflows) ? data.workflows : []);

      setTotal(data?.total || 0);
      setPage(data?.page || 1);
      setTotalPages(data?.totalPages || 0);
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

  const handleDeleteWorkflow = async (workflowId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workflow?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(workflowId);
      setError("");

      await axios.delete(
        `http://localhost:5000/api/v1/workflows/${workflowId}`,
        {
          withCredentials: true,
        },
      );

      const remainingWorkflows = workflows.filter(
        (workflow) => workflow._id !== workflowId,
      );

      setWorkflows(remainingWorkflows);
      setTotal((currentTotal) => Math.max(currentTotal - 1, 0));

      if (remainingWorkflows.length === 0 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      } else {
        fetchWorkflows();
      }
    } catch (err) {
      console.error("Failed to delete workflow:", err);

      setError(err.response?.data?.message || "Failed to delete workflow.");
    } finally {
      setDeletingId(null);
    }
  };

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

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="workflow-page">
        <div className="workflow-header">
          <div>
            <span className="page-eyebrow">Automation</span>
            <h1>Workflows</h1>
            <p>Loading your workflows...</p>
          </div>
        </div>

        <div className="workflow-list">
          {[1, 2, 3, 4].map((i) => (
            <div className="workflow-card skeleton-card" key={i}>
              <div className="skeleton skeleton-icon"></div>

              <div className="skeleton-body">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-description"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error && workflows.length === 0) {
    return (
      <div className="workflow-page">
        <div className="workflow-error">
          <span className="error-icon">!</span>

          <h2>Couldn't load workflows</h2>

          <p>{error}</p>

          <button
            type="button"
            className="create-workflow-btn"
            onClick={fetchWorkflows}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="workflow-page">
      <div className="workflow-header">
        <div>
          <span className="page-eyebrow">Automation</span>

          <h1>Workflows</h1>

          <p>Create and manage your automation workflows.</p>
        </div>

        <Link to="/workflows/create" className="create-workflow-btn">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Create workflow
        </Link>
      </div>

      {error && <div className="workflow-inline-error">{error}</div>}

      <div className="workflow-summary">
        <span>
          {total} workflow{total === 1 ? "" : "s"}
        </span>
      </div>

      {workflows.length === 0 ? (
        <div className="workflow-empty">
          <span className="empty-icon">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
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

          <h2>No workflows yet</h2>

          <p>Create your first workflow to start automating your tasks.</p>

          <Link to="/workflows/create" className="create-workflow-btn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Create workflow
          </Link>
        </div>
      ) : (
        <>
          <div className="workflow-list">
            {workflows.map((workflow) => {
              const status = statusStyles[workflow.status] || null;

              const isDeleting = deletingId === workflow._id;

              return (
                <div className="workflow-card" key={workflow._id}>
                  <span className="workflow-card-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
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

                  <div className="workflow-card-body">
                    <h3>{workflow.name}</h3>

                    <p>{workflow.description || "No description"}</p>

                    <div className="workflow-meta">
                      <span>Created {formatDate(workflow.createdAt)}</span>

                      {workflow.createdAt && (
                        <span>{formatTime(workflow.createdAt)}</span>
                      )}
                    </div>
                  </div>

                  {status && (
                    <span className={`workflow-status ${status.className}`}>
                      {status.label}
                    </span>
                  )}

                  <div className="workflow-actions">
                    <Link
                      to={`/workflows/${workflow._id}`}
                      className="workflow-open-btn"
                    >
                      Open
                    </Link>

                    <button
                      type="button"
                      className="workflow-delete-btn"
                      onClick={() => handleDeleteWorkflow(workflow._id)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="workflow-pagination">
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
  );
};

export default Workflow;
