import "./CTA.css";

function CTA() {
  return (
    <section className="cta">
      <div className="cta-container">
        <div className="cta-pattern" aria-hidden="true"></div>
        <div className="cta-glow" aria-hidden="true"></div>

        <div className="cta-content">
          <span className="cta-badge">Start Automating</span>
          <h2>
            Ready to automate
            <span> your work?</span>
          </h2>
          <p>
            Build powerful workflows and automate repetitive tasks so you can
            focus on what matters.
          </p>
          <button className="cta-button">
            Get Started Free
            <span className="cta-arrow">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
