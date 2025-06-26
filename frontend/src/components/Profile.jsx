import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ name: data.name, email: data.email });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="profile-card loading">Loading profile...</div>;
  }

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <span role="img" aria-label="User" className="avatar-icon">
          👤
        </span>
      </div>
      <div className="profile-info">
        <h2 className="profile-title">Profile</h2>
        <div className="profile-field">
          <span className="profile-label">Username:</span>
          <span className="profile-value">{user.name}</span>
        </div>
        <div className="profile-field">
          <span className="profile-label">Email:</span>
          <span className="profile-value">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;