import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Workflowbuilder.css";

const statusStyles = {
  active: { label: "Active", className: "status-active" },
  inactive: { label: "Inactive", className: "status-inactive" },
  paused: { label: "Paused", className: "status-paused" },
  draft: { label: "Draft", className: "status-draft" },
  failed: { label: "Failed", className: "status-failed" },
};

const Icon = ({ name, size = 16 }) => {
  const icons = {
    user: (
      <>
        <circle
          cx="12"
          cy="8"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    ),
    clock: (
      <>
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
      </>
    ),
    link: (
      <path
        d="M9.5 14.5 14.5 9.5M11 6.5l1.4-1.4a3.5 3.5 0 0 1 5 5L16 11.5M13 17.5l-1.4 1.4a3.5 3.5 0 0 1-5-5L8 12.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
    mail: (
      <>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="m4 7 8 6 8-6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    bell: (
      <path
        d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9ZM9.5 17.5a2.5 2.5 0 0 0 5 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    save: (
      <>
        <path
          d="M5 4h11l3 3v13H5V4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 4v5h8V4M8 20v-6h8v6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </>
    ),
    bolt: (
      <path
        d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
    plus: (
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
    close: (
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
    arrowDown: (
      <path
        d="M12 5v13M6 13l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    trash: (
      <path
        d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-1 13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 7h12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      {icons[name] || icons.bolt}
    </svg>
  );
};

const triggerOptions = [
  {
    type: "user.created",
    label: "User Created",
    description: "Runs when a new user is created.",
    iconKey: "user",
  },
  {
    type: "schedule",
    label: "Schedule",
    description: "Runs automatically at a scheduled time.",
    iconKey: "clock",
  },
  {
    type: "webhook",
    label: "Webhook",
    description: "Runs when an external webhook is received.",
    iconKey: "link",
  },
];

const actionOptions = [
  {
    action: "send_email",
    label: "Send Email",
    description: "Send an email to a recipient.",
    iconKey: "mail",
  },
  {
    action: "send_notification",
    label: "Send Notification",
    description: "Send a notification to a user.",
    iconKey: "bell",
  },
  {
    action: "save_data",
    label: "Save Data",
    description: "Save information for later use.",
    iconKey: "save",
  },
];

const WorkflowBuilder = () => {
  const { workflowId } = useParams();

  const [workflow, setWorkflow] = useState(null);
  const [trigger, setTrigger] = useState(null);
  const [steps, setSteps] = useState([]);

  const [showTriggerPanel, setShowTriggerPanel] = useState(false);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [selectedTrigger, setSelectedTrigger] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const fetchWorkflow = async () => {
    try {
      setLoading(true);
      setError("");
      setSaveMessage("");

      const response = await axios.get(
        `http://localhost:5000/api/v1/workflows/${workflowId}`,
        { withCredentials: true },
      );

      const workflowData = response.data?.data || null;
      setWorkflow(workflowData);

      if (workflowData?.trigger?.type) {
        const savedTrigger = triggerOptions.find(
          (item) => item.type === workflowData.trigger.type,
        );
        setTrigger(
          savedTrigger || {
            type: workflowData.trigger.type,
            label: workflowData.trigger.type,
            description: "",
            iconKey: "bolt",
          },
        );
      } else {
        setTrigger(null);
      }

      setSteps(
        Array.isArray(workflowData?.steps)
          ? workflowData.steps.map((step, index) => ({
              ...step,
              order: index + 1,
            }))
          : [],
      );

      setHasChanges(false);
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

  const handleSelectTrigger = (triggerOption) =>
    setSelectedTrigger(triggerOption);

  const handleConfirmTrigger = () => {
    if (!selectedTrigger) return;
    setTrigger({ ...selectedTrigger, config: {} });
    setSelectedTrigger(null);
    setShowTriggerPanel(false);
    setHasChanges(true);
    setSaveMessage("");
  };

  const handleRemoveTrigger = () => {
    setTrigger(null);
    setHasChanges(true);
    setSaveMessage("");
  };

  const handleAddAction = (actionOption) => {
    const newStep = {
      type: "action",
      action: actionOption.action,
      config: {},
      order: steps.length + 1,
      label: actionOption.label,
      iconKey: actionOption.iconKey,
    };
    setSteps((previousSteps) => [...previousSteps, newStep]);
    setShowActionPanel(false);
    setHasChanges(true);
    setSaveMessage("");
  };

  const handleDeleteStep = (stepOrder) => {
    setSteps((previousSteps) =>
      previousSteps
        .filter((step) => step.order !== stepOrder)
        .map((step, index) => ({ ...step, order: index + 1 })),
    );
    setHasChanges(true);
    setSaveMessage("");
  };

  const handleConfigChange = (stepOrder, field, value) => {
    setSteps((previousSteps) =>
      previousSteps.map((step) =>
        step.order !== stepOrder
          ? step
          : { ...step, config: { ...step.config, [field]: value } },
      ),
    );
    setHasChanges(true);
    setSaveMessage("");
  };

  const handleSaveWorkflow = async () => {
    try {
      setSaving(true);
      setSaveMessage("");
      setError("");

      const payload = {
        trigger: trigger
          ? { type: trigger.type, config: trigger.config || {} }
          : null,
        steps: steps.map((step, index) => ({
          type: "action",
          action: step.action,
          config: step.config || {},
          order: index + 1,
        })),
      };

      const response = await axios.patch(
        `http://localhost:5000/api/v1/workflows/${workflowId}`,
        payload,
        { withCredentials: true },
      );

      const updatedWorkflow = response.data?.data;

      if (updatedWorkflow) {
        setWorkflow(updatedWorkflow);

        if (updatedWorkflow.trigger?.type) {
          const savedTrigger = triggerOptions.find(
            (item) => item.type === updatedWorkflow.trigger.type,
          );
          setTrigger(
            savedTrigger || {
              type: updatedWorkflow.trigger.type,
              label: updatedWorkflow.trigger.type,
              description: "",
              iconKey: "bolt",
              config: updatedWorkflow.trigger.config || {},
            },
          );
        }

        setSteps(
          Array.isArray(updatedWorkflow.steps)
            ? updatedWorkflow.steps.map((step, index) => ({
                ...step,
                order: index + 1,
              }))
            : [],
        );
      }

      setHasChanges(false);
      setSaveMessage("Workflow saved successfully.");
    } catch (err) {
      console.error("Failed to save workflow:", err);
      setSaveMessage(err.response?.data?.message || "Failed to save workflow.");
    } finally {
      setSaving(false);
    }
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
            <Icon name="bolt" size={24} />
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
            <Icon name="bolt" size={24} />
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
              <Icon name="bolt" size={20} />
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
          <button
            type="button"
            className="save-workflow-btn"
            onClick={handleSaveWorkflow}
            disabled={saving || !hasChanges}
          >
            {saving ? "Saving..." : "Save workflow"}
          </button>
        </div>
      </div>

      {saveMessage && (
        <div
          className={`workflow-save-message ${saveMessage.includes("successfully") ? "save-success" : "save-error"}`}
        >
          {saveMessage.includes("successfully") ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path
                d="m5 13 4 4L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
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
          )}
          {saveMessage}
        </div>
      )}

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

          <button
            type="button"
            className="add-step-btn"
            onClick={() =>
              !trigger ? setShowTriggerPanel(true) : setShowActionPanel(true)
            }
          >
            <Icon name="plus" size={15} />
            Add step
          </button>
        </div>

        <div className="detail-canvas">
          {!trigger && steps.length === 0 && (
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
              <p>
                Add your first step to begin creating an automated workflow.
              </p>
              <button
                type="button"
                className="add-first-step-btn"
                onClick={() => setShowTriggerPanel(true)}
              >
                <Icon name="plus" size={15} />
                Add your first step
              </button>
            </div>
          )}

          {trigger && (
            <div className="workflow-step-card trigger-card">
              <div className="step-number">1</div>
              <div className="step-card-content">
                <div className="step-card-top">
                  <div className="step-card-title">
                    <span className="step-icon trigger-step-icon">
                      <Icon name={trigger.iconKey} size={17} />
                    </span>
                    <div>
                      <span className="step-type">Trigger</span>
                      <h3>{trigger.label}</h3>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="delete-step-btn"
                    onClick={handleRemoveTrigger}
                  >
                    <Icon name="trash" size={14} />
                    Remove
                  </button>
                </div>
                <p>
                  {trigger.description || "This event starts the workflow."}
                </p>
                <div className="step-config">
                  <label>Trigger type</label>
                  <input type="text" value={trigger.type} readOnly />
                </div>
              </div>
            </div>
          )}

          {trigger && (
            <div className="workflow-connector">
              <span className="connector-line-vertical"></span>
              <span className="connector-arrow">
                <Icon name="arrowDown" size={16} />
              </span>
            </div>
          )}

          {steps.map((step, index) => {
            const actionInfo = actionOptions.find(
              (item) => item.action === step.action,
            );

            return (
              <div key={step.order}>
                <div className="workflow-step-card action-card">
                  <div className="step-number">{index + 2}</div>
                  <div className="step-card-content">
                    <div className="step-card-top">
                      <div className="step-card-title">
                        <span className="step-icon">
                          <Icon
                            name={actionInfo?.iconKey || step.iconKey || "bolt"}
                            size={17}
                          />
                        </span>
                        <div>
                          <span className="step-type">Action</span>
                          <h3>{actionInfo?.label || step.action}</h3>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="delete-step-btn"
                        onClick={() => handleDeleteStep(step.order)}
                      >
                        <Icon name="trash" size={14} />
                        Remove
                      </button>
                    </div>

                    <p>{actionInfo?.description || "Configure this action."}</p>

                    {step.action === "send_email" && (
                      <div className="step-config">
                        <label>Recipient</label>
                        <input
                          type="text"
                          placeholder="user@example.com"
                          value={step.config?.to || ""}
                          onChange={(event) =>
                            handleConfigChange(
                              step.order,
                              "to",
                              event.target.value,
                            )
                          }
                        />
                        <label>Subject</label>
                        <input
                          type="text"
                          placeholder="Welcome!"
                          value={step.config?.subject || ""}
                          onChange={(event) =>
                            handleConfigChange(
                              step.order,
                              "subject",
                              event.target.value,
                            )
                          }
                        />
                        <label>Message</label>
                        <textarea
                          placeholder="Enter email message..."
                          value={step.config?.body || ""}
                          onChange={(event) =>
                            handleConfigChange(
                              step.order,
                              "body",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    )}

                    {step.action === "send_notification" && (
                      <div className="step-config">
                        <label>User</label>
                        <input
                          type="text"
                          placeholder="User ID or email"
                          value={step.config?.user || ""}
                          onChange={(event) =>
                            handleConfigChange(
                              step.order,
                              "user",
                              event.target.value,
                            )
                          }
                        />
                        <label>Message</label>
                        <textarea
                          placeholder="Notification message..."
                          value={step.config?.message || ""}
                          onChange={(event) =>
                            handleConfigChange(
                              step.order,
                              "message",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    )}

                    {step.action === "save_data" && (
                      <div className="step-config">
                        <label>Key</label>
                        <input
                          type="text"
                          placeholder="activity"
                          value={step.config?.key || ""}
                          onChange={(event) =>
                            handleConfigChange(
                              step.order,
                              "key",
                              event.target.value,
                            )
                          }
                        />
                        <label>Value</label>
                        <textarea
                          placeholder="Data to save..."
                          value={step.config?.value || ""}
                          onChange={(event) =>
                            handleConfigChange(
                              step.order,
                              "value",
                              event.target.value,
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="workflow-connector">
                  <span className="connector-line-vertical"></span>
                  <span className="connector-arrow">
                    <Icon name="arrowDown" size={16} />
                  </span>
                </div>
              </div>
            );
          })}

          {trigger && (
            <button
              type="button"
              className="add-action-inline-btn"
              onClick={() => setShowActionPanel(true)}
            >
              <Icon name="plus" size={15} />
              Add action
            </button>
          )}

          {showTriggerPanel && (
            <div className="builder-panel">
              <div className="builder-panel-header">
                <div>
                  <span className="page-eyebrow">Step 1</span>
                  <h3>Select a trigger</h3>
                  <p>Choose what should start this workflow.</p>
                </div>
                <button
                  type="button"
                  className="panel-close-btn"
                  onClick={() => {
                    setShowTriggerPanel(false);
                    setSelectedTrigger(null);
                  }}
                  aria-label="Close panel"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>

              <div className="builder-options">
                {triggerOptions.map((option) => (
                  <button
                    type="button"
                    key={option.type}
                    className={`builder-option ${selectedTrigger?.type === option.type ? "builder-option-selected" : ""}`}
                    onClick={() => handleSelectTrigger(option)}
                  >
                    <span className="option-icon">
                      <Icon name={option.iconKey} size={18} />
                    </span>
                    <span className="option-content">
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                    </span>
                  </button>
                ))}
              </div>

              <div className="builder-panel-footer">
                <button
                  type="button"
                  className="cancel-builder-btn"
                  onClick={() => {
                    setShowTriggerPanel(false);
                    setSelectedTrigger(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="continue-builder-btn"
                  disabled={!selectedTrigger}
                  onClick={handleConfirmTrigger}
                >
                  Add trigger
                </button>
              </div>
            </div>
          )}

          {showActionPanel && (
            <div className="builder-panel">
              <div className="builder-panel-header">
                <div>
                  <span className="page-eyebrow">New step</span>
                  <h3>Select an action</h3>
                  <p>Choose what the workflow should do.</p>
                </div>
                <button
                  type="button"
                  className="panel-close-btn"
                  onClick={() => setShowActionPanel(false)}
                  aria-label="Close panel"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>

              <div className="builder-options">
                {actionOptions.map((option) => (
                  <button
                    type="button"
                    key={option.action}
                    className="builder-option"
                    onClick={() => handleAddAction(option)}
                  >
                    <span className="option-icon">
                      <Icon name={option.iconKey} size={18} />
                    </span>
                    <span className="option-content">
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
