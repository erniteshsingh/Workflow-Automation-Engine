import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
                <defs>
                  <linearGradient
                    id="footerFlowGrad"
                    x1="0"
                    y1="0"
                    x2="32"
                    y2="32"
                  >
                    <stop offset="0%" stopColor="#8B7FF7" />
                    <stop offset="100%" stopColor="#6D5EF5" />
                  </linearGradient>
                </defs>
                <circle cx="7" cy="24" r="3.5" fill="url(#footerFlowGrad)" />
                <circle cx="16" cy="8" r="3.5" fill="url(#footerFlowGrad)" />
                <circle cx="25" cy="24" r="3.5" fill="url(#footerFlowGrad)" />
                <path
                  d="M9.8 22 15 10.5M18 10.5l4.6 11.5"
                  stroke="url(#footerFlowGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span>FlowForge</span>
          </div>
          <p>Automate smarter. Build faster.</p>
        </div>

        <div className="footer-column">
          <h3>Product</h3>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#integrations">Integrations</a>
        </div>

        <div className="footer-column">
          <h3>Resources</h3>
          <a href="#documentation">Documentation</a>
          <a href="#api">API Docs</a>
          <a href="#guides">Guides</a>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <a href="#about">About</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 FlowForge. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#github" className="footer-icon-link" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
            </svg>
          </a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
