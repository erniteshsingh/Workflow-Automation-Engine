import "./Features.css";

function Features() {
  const features = [
    {
      title: "Workflow Builder",
      description:
        "Create powerful workflows using a simple visual workflow builder.",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <rect
            x="3"
            y="4"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <rect
            x="15"
            y="14"
            width="6"
            height="6"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9 7h4a3 3 0 0 1 3 3v4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="6"
            cy="17"
            r="3"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9 17h3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Integrations",
      description:
        "Connect APIs, services, and applications to automate your tasks.",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M9.5 14.5 14.5 9.5M11 6.5l1.4-1.4a3.5 3.5 0 0 1 5 5L16 11.5M13 17.5l-1.4 1.4a3.5 3.5 0 0 1-5-5L8 12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Execution Monitoring",
      description:
        "Track workflow executions and understand what is happening in real time.",
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
    {
      title: "Automatic Retries",
      description:
        "Automatically retry failed jobs and handle temporary failures reliably.",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M4 12a8 8 0 0 1 13.66-5.66L20 8.5M20 4v4.5h-4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 12a8 8 0 0 1-13.66 5.66L4 15.5M4 20v-4.5h4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Scheduling",
      description:
        "Schedule workflows to execute automatically at the time you need.",
      icon: (
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
      ),
    },
    {
      title: "Reliable Execution",
      description:
        "Queue-based processing ensures workflows execute reliably in the background.",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <path
            d="M12 3 4.5 6.5v5c0 4.6 3.2 7.9 7.5 9.5 4.3-1.6 7.5-4.9 7.5-9.5v-5L12 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M9 12.2l2 2 4-4.2"
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
    <section className="features" id="features">
      <div className="features-container">
        <div className="features-header">
          <span className="section-badge">Powerful Features</span>
          <h2>
            Everything you need to
            <span> automate.</span>
          </h2>
          <p>
            Build, execute, and monitor powerful workflows without worrying
            about repetitive tasks.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={feature.title}>
              <span className="feature-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
