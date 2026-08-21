import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Workflowbuilder.css";

const statusStyles = {
  active: { label: "Active", className: "status-active" },
  paused: { label: "Paused", className: "status-paused" },
  draft: { label: "Draft", className: "status-draft" },
  failed: { label: "Failed", className: "status-failed" },
};

const WorkflowDetail = () => {
  const { workflowId } = useParams();

  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWorkflow = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:5000/api/v1/workflows/${workflowId}`,
        { withCredentials: true },
      );

      setWorkflow(response.data?.data || null);
    } catch (err) {
      console.error("Failed to fetch workflow:", err);
      setError(err.response?.data?.message || "Failed to load workflow.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (workflowId) {
      fetchWorkflow();
    } else {
      setLoading(false);
      setError("No workflow ID provided.");
    }
  }, [workflowId]);

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
      <div className="workflow-detail-page">
        <div className="detail-loading">
          <div className="loading-spinner"></div>
          <h2>Loading workflow&hellip;</h2>
          <p>Please wait while we fetch your workflow.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="workflow-detail-page">
        <div className="detail-error">
          <span className="error-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
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
          <h2>Couldn&apos;t load workflow</h2>
          <p>{error}</p>
          <div className="detail-error-actions">
            <button type="button" onClick={fetchWorkflow} className="retry-btn">
              Try again
            </button>
            <Link to="/workflows" className="back-btn">
              Back to workflows
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!workflow || !workflow._id) {
    return (
      <div className="workflow-detail-page">
        <div className="detail-error">
          <span className="error-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
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
          <h2>Workflow not found</h2>
          <p>The workflow you&apos;re looking for doesn&apos;t exist.</p>
          <div className="detail-error-actions">
            <Link to="/workflows" className="back-btn">
              Back to workflows
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const status = statusStyles[workflow.status] || {
    label: workflow.status || "Unknown",
    className: "status-default",
  };

  return (
    <div className="workflow-detail-page">
      <div className="detail-header">
        <div className="detail-header-left">
          <Link to="/workflows" className="back-to-workflows">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Workflows
          </Link>

          <div className="detail-title-row">
            <div className="detail-icon">
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
            </div>
            <div>
              <h1>{workflow.name}</h1>
              <p>{workflow.description || "No description"}</p>
            </div>
          </div>
        </div>

        <div className="detail-header-right">
          <span className={`workflow-status ${status.className}`}>
            {status.label}
          </span>
          <button className="save-workflow-btn">Save workflow</button>
        </div>
      </div>

      <div className="workflow-info-grid">
        <div className="workflow-info-card">
          <span className="info-label">Status</span>
          <strong>{status.label}</strong>
        </div>

        <div className="workflow-info-card">
          <span className="info-label">Created</span>
          <strong>{formatDate(workflow.createdAt)}</strong>
          <small>{formatTime(workflow.createdAt)}</small>
        </div>

        <div className="workflow-info-card">
          <span className="info-label">Updated</span>
          <strong>{formatDate(workflow.updatedAt)}</strong>
          <small>{formatTime(workflow.updatedAt)}</small>
        </div>

        <div className="workflow-info-card">
          <span className="info-label">Workflow ID</span>
          <strong className="workflow-id">{workflow._id}</strong>
        </div>
      </div>

      <div className="detail-section">
        <div className="detail-section-header">
          <div>
            <span className="page-eyebrow">Workflow</span>
            <h2>Workflow builder</h2>
            <p>Build and configure your automation flow.</p>
          </div>
          <button className="add-step-btn">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add step
          </button>
        </div>

        <div className="detail-canvas">
          <div className="canvas-empty">
            <div className="canvas-icon">
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
            </div>
            <h3>Start building your workflow</h3>
            <p>Add your first step to begin creating an automated workflow.</p>
            <button className="add-first-step-btn">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Add your first step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetail;
