import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user } = useAuth();
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <span className="profile-eyebrow">Account</span>
          <h1>Profile</h1>
          <p>Manage your account information.</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-card-glow" aria-hidden="true"></div>
        <div className="profile-avatar">
          {firstLetter}
          <span className="profile-avatar-status"></span>
        </div>
        <div className="profile-info">
          <h2>{user?.name || "User"}</h2>
          <p>{user?.email || "No email available"}</p>
        </div>
      </div>

      <div className="profile-details-card">
        <div className="profile-section-header">
          <div>
            <h2>Account information</h2>
            <p>Your account details</p>
          </div>
        </div>

        <div className="profile-fields">
          <div className="profile-field">
            <label>Full name</label>
            <div className="profile-value">
              <span className="profile-value-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
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
                </svg>
              </span>
              {user?.name || "Not available"}
            </div>
          </div>

          <div className="profile-field">
            <label>Email address</label>
            <div className="profile-value">
              <span className="profile-value-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
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
                </svg>
              </span>
              {user?.email || "Not available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
