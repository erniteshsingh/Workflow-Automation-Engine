import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Createworkflows.css";

const Createworkflows = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const name = formData.name.trim();
    const description = formData.description.trim();

    if (!name) {
      setError("Workflow name is required.");
      return;
    }

    if (name.length < 3) {
      setError("Workflow name must be at least 3 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/v1/workflows/",
        { name, description },
        { withCredentials: true },
      );

      const workflow = response.data?.data;

      if (!workflow?._id) {
        throw new Error("Workflow ID was not returned by the server.");
      }

      navigate(`/workflows/${workflow._id}`);
    } catch (err) {
      console.error("Failed to create workflow:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create workflow. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const nameNearLimit = formData.name.length >= 90;
  const descNearLimit = formData.description.length >= 450;

  return (
    <div className="create-workflow-page">
      <div className="create-workflow-container">
        <div className="create-workflow-header">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/workflows")}
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to workflows
          </button>

          <span className="page-eyebrow">Automation</span>
          <h1>Create workflow</h1>
          <p>Create a workflow and start building your automation.</p>
        </div>

        <div className="create-workflow-card">
          <div className="form-icon-wrapper">
            <div className="form-icon">
              <svg viewBox="0 0 24 24" width="25" height="25" fill="none">
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
          </div>

          <div className="form-heading">
            <h2>Workflow details</h2>
            <p>Give your workflow a name and description to get started.</p>
          </div>

          {error && (
            <div className="create-workflow-error">
              <span className="error-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8v5M12 16h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Workflow name
                <span>*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Send welcome email"
                maxLength={100}
                disabled={loading}
                autoFocus
              />

              <div className="input-footer">
                <small>
                  Choose a clear name that describes what the workflow does.
                </small>
                <span className={nameNearLimit ? "char-count-warning" : ""}>
                  {formData.name.length}/100
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what this workflow will automate..."
                rows={5}
                maxLength={500}
                disabled={loading}
              />

              <div className="input-footer">
                <small>
                  A short description helps you identify the workflow later.
                </small>
                <span className={descNearLimit ? "char-count-warning" : ""}>
                  {formData.description.length}/500
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/workflows")}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-workflow-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Create workflow
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="create-workflow-tip">
          <span className="tip-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path
                d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <div>
            <strong>What&apos;s next?</strong>
            <p>
              After creating your workflow, you&apos;ll be taken to the workflow
              builder where you can add triggers, actions, and connect them
              together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createworkflows;
