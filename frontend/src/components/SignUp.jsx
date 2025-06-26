import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigator = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
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
      const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please sign in.");
        navigator("/signin");
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="auth-form animate-fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">
            Join us and start achieving your goals
          </p>
        </div>

        <form className="auth-form-body" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="field-label">👤 Full Name</label>
            <input
              type="text"
              name="name"
              className={`field-input ${errors.name ? "field-error" : ""}`}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-field">
            <label className="field-label">✉️ Email Address</label>
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
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && (
              <div className="password-strength">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`strength-bar ${
                      passwordStrength >= level
                        ? passwordStrength <= 2
                          ? "weak"
                          : passwordStrength === 3
                            ? "medium"
                            : "strong"
                        : ""
                    }`}
                  ></div>
                ))}
              </div>
            )}
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="form-field">
            <label className="field-label">🔒 Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`field-input ${errors.confirmPassword ? "field-error" : ""}`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <button
            type="button"
            className="auth-footer-link"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              marginLeft: "4px",
            }}
            onClick={() => navigator("/signin")}
          >
            Sign in here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
