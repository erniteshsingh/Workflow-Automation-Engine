import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true"></div>
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            <span className="hero-badge-dot"></span>
            Powerful Workflow Automation
          </span>
          <h1>
            Automate Your Work.
            <br />
            <span>Build Smarter Workflows.</span>
          </h1>
          <p>
            Connect your apps, automate repetitive tasks, and build powerful
            workflows that run automatically.
          </p>
          <div className="hero-actions">
            <button className="hero-primary-btn">Get Started Free</button>
            <button className="hero-secondary-btn">View Demo</button>
          </div>
        </div>

        <div className="hero-preview">
          <div className="workflow-card">
            <div className="workflow-node trigger-node">
              <span className="node-icon trigger-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Trigger</strong>
                <small>Workflow started</small>
              </div>
              <span className="node-status"></span>
            </div>

            <div className="workflow-line">
              <span className="workflow-pulse"></span>
            </div>

            <div className="workflow-node">
              <span className="node-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M9.5 14.5 14.5 9.5M11 6.5l1.4-1.4a3.5 3.5 0 0 1 5 5L16 11.5M13 17.5l-1.4 1.4a3.5 3.5 0 0 1-5-5L8 12.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <strong>HTTP Request</strong>
                <small>Send API request</small>
              </div>
              <span className="node-status"></span>
            </div>

            <div className="workflow-line">
              <span className="workflow-pulse workflow-pulse-delay"></span>
            </div>

            <div className="workflow-node">
              <span className="node-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                  <path
                    d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div>
                <strong>Email</strong>
                <small>Send notification</small>
              </div>
              <span className="node-status"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
