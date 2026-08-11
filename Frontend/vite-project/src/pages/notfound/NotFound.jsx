import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-glow" aria-hidden="true"></div>

      <div className="broken-flow" aria-hidden="true">
        <div className="flow-node">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flow-line broken">
          <span></span>
          <span></span>
        </div>
        <div className="flow-node dim">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M9.5 14.5 14.5 9.5M11 6.5l1.4-1.4a3.5 3.5 0 0 1 5 5L16 11.5M13 17.5l-1.4 1.4a3.5 3.5 0 0 1-5-5L8 12.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <span className="not-found-code">404</span>
      <h1>This step doesn't exist.</h1>
      <p>
        The page you're looking for isn't connected to anything &mdash; it may
        have been moved or removed.
      </p>
      <Link to="/" className="not-found-link">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          <path
            d="M11 5 4 12l7 7M4 12h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
