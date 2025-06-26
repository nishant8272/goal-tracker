import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Success - store token and redirect
        localStorage.setItem("token", data.token);
        alert("Sign in successful!");
        navigator("/goals");
      } else {
        // Handle error response
        alert(data.message || "Sign in failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-form animate-fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to your goals</p>
        </div>

        <form className="auth-form-body" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="field-label">👤 Name</label>
            <input
              type="text"
              name="name"
              className={`field-input ${errors.name ? "field-error" : ""}`}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-field">
            <label className="field-label">✉️ Email</label>
            <input
              type="email"
              name="email"
              className={`field-input ${errors.email ? "field-error" : ""}`}
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="form-field">
            <label className="field-label">🔒 Password</label>
            <input
              type="password"
              name="password"
              className={`field-input ${errors.password ? "field-error" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <button
            type="button"
            className="auth-footer-link"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              marginLeft: "4px",
            }}
            onClick={() => navigator("/signup")}
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
