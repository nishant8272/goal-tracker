import React, { useEffect, useState } from "react";
import CreateGoal from "./CreateGoal";
import { useNavigate } from "react-router-dom";
import UpdateGoal from "./UpdateGoal";
import "./Goals.css";

function Goals() {
  const navigator = useNavigate();
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    handleGoals();
  }, []);

  const token = localStorage.getItem("token");
  const realtoken = `Bearer ${token}`;

  const handleGoals = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/goals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: realtoken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch goals");
      }

      const data = await response.json();
      setGoals(data.goals || []);
    } catch (err) {
      setError("Failed to load goals. Please try again.");
      console.error("Error fetching goals:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/goals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: realtoken,
        },
      });

      if (response.ok) {
        setGoals(goals.filter((goal) => goal._id !== id));
      } else {
        alert("Failed to delete goal");
      }
    } catch (err) {
      console.error("Error deleting goal:", err);
      alert("Failed to delete goal");
    }
  };

  const toggleGoalStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/goals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: realtoken,
        },
        body: JSON.stringify({ completed: !currentStatus }),
      });

      if (response.ok) {
        setGoals(
          goals.map((goal) =>
            goal._id === id ? { ...goal, completed: !currentStatus } : goal,
          ),
        );
      }
    } catch (err) {
      console.error("Error updating goal status:", err);
    }
  };

  // Filter goals based on search term and filter type
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch = (goal.text || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && goal.completed) ||
      (filter === "pending" && !goal.completed);
    return matchesSearch && matchesFilter;
  });

  const completedCount = goals.filter((goal) => goal.completed).length;
  const totalCount = goals.length;

  if (!token) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="error-page">
            <h1>🔒 Access Denied</h1>
            <p>Please sign in to view your goals.</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigator("/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="container">
        {/* Page Header */}
        <div className="goals-header">
          <div className="goals-title-section">
            <h1 className="page-title">🎯 My Goals</h1>
            <p className="page-subtitle">
              Track your progress and achieve your dreams
            </p>
          </div>

          <div className="goals-stats">
            <div className="stat-card">
              <div className="stat-number">{totalCount}</div>
              <div className="stat-label">Total Goals</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{completedCount}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{totalCount - completedCount}</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="goals-actions">
          <div className="search-filter-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Search goals..."
                className="form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button
                className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setFilter("all")}
              >
                All ({totalCount})
              </button>
              <button
                className={`btn btn-sm ${filter === "pending" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setFilter("pending")}
              >
                In Progress ({totalCount - completedCount})
              </button>
              <button
                className={`btn btn-sm ${filter === "completed" ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setFilter("completed")}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            ✨ {showCreateForm ? "Cancel" : "Add New Goal"}
          </button>
        </div>

        {/* Create Goal Form */}
        {showCreateForm && (
          <div className="create-goal-section">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Create New Goal</h3>
                <p className="card-description">
                  What would you like to achieve?
                </p>
              </div>
              <CreateGoal
                data={goals}
                setdata={setGoals}
                onSuccess={() => setShowCreateForm(false)}
              />
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your goals...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <div className="error-message">
              <span>⚠️</span>
              {error}
              <button className="btn btn-sm btn-primary" onClick={handleGoals}>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredGoals.length === 0 && (
          <div className="empty-state">
            {searchTerm ? (
              <div className="empty-search">
                <h3>🔍 No goals found</h3>
                <p>No goals match your search "{searchTerm}"</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </button>
              </div>
            ) : goals.length === 0 ? (
              <div className="empty-goals">
                <h3>🚀 Start Your Journey</h3>
                <p>
                  You haven't created any goals yet. Add your first goal to get
                  started!
                </p>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create Your First Goal
                </button>
              </div>
            ) : (
              <div className="empty-filter">
                <h3>📝 No {filter} goals</h3>
                <p>You don't have any {filter} goals at the moment.</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setFilter("all")}
                >
                  View All Goals
                </button>
              </div>
            )}
          </div>
        )}

        {/* Goals List */}
        {!isLoading && !error && filteredGoals.length > 0 && (
          <div className="goals-grid">
            {filteredGoals.map((goal) => (
              <div
                key={goal._id}
                className={`goal-card ${goal.completed ? "completed" : "pending"}`}
              >
                <div className="goal-header">
                  <div className="goal-status">
                    <button
                      className={`status-toggle ${goal.completed ? "completed" : "pending"}`}
                      onClick={() => toggleGoalStatus(goal._id, goal.completed)}
                      title={
                        goal.completed ? "Mark as pending" : "Mark as completed"
                      }
                    >
                      {goal.completed ? "✅" : "⏳"}
                    </button>
                  </div>

                  <div className="goal-actions">
                    <button
                      className="action-btn delete-btn"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this goal?",
                          )
                        ) {
                          deleteTodo(goal._id);
                        }
                      }}
                      title="Delete goal"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="goal-content">
                  <h3 className="goal-text">{goal.text}</h3>
                  <div className="goal-meta">
                    <span
                      className={`goal-badge ${goal.completed ? "completed" : "pending"}`}
                    >
                      {goal.completed ? "Completed" : "In Progress"}
                    </span>
                    {goal.createdAt && (
                      <span className="goal-date">
                        Created: {new Date(goal.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="goal-update">
                  <UpdateGoal
                    id={goal._id}
                    handleGoals={handleGoals}
                    currentText={goal.text}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="progress-section">
            <div className="progress-header">
              <h4>Overall Progress</h4>
              <span className="progress-percentage">
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {completedCount} of {totalCount} goals completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Goals;

// Example: GoalList.jsx
function GoalList({ goals }) {
  return (
    <ul>
      {goals.map(goal => (
        <li key={goal._id}>
          <span>{goal.text}</span>
          <span>{goal.completed ? "✅" : "❌"}</span>
        </li>
      ))}
    </ul>
  );
}
