import "./HowItworks.css";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create Workflow",
      description:
        "Start by creating a workflow and define what you want to automate.",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Configure Nodes",
      description:
        "Connect triggers, APIs, notifications, and other actions together.",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <circle
            cx="6"
            cy="7"
            r="2.2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
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
      number: "03",
      title: "Run Workflow",
      description:
        "Execute your workflow and let the automation engine handle the tasks.",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M7 5v14l12-7L7 5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      number: "04",
      title: "Monitor",
      description:
        "Track executions, logs, failures, and workflow status in real time.",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
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

  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-container">
        <div className="how-header">
          <span className="section-badge">How It Works</span>
          <h2>
            Automate in just
            <span> four steps.</span>
          </h2>
          <p>
            Build your workflow, connect your actions, execute it, and monitor
            everything from one place.
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div className="step-wrapper" key={step.number}>
              <div className="step-card">
                <div className="step-top">
                  <span className="step-number">{step.number}</span>
                  <div className="step-icon">{step.icon}</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="step-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                    <path
                      d="M4 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
