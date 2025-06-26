import React, { useState } from "react";

function UpdateGoal({ id, handleGoals, currentText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState(currentText || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const realtoken = `Bearer ${token}`;

  async function editGoal(goalId, data) {
    if (!data.trim()) {
      setError("Goal text cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api/goals/${goalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: realtoken,
          },
          body: JSON.stringify({ text: data }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update goal");
      }

      await response.json();
      handleGoals();
      setIsEditing(false);
      setError("");

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-toast";
      successMessage.textContent = "✅ Goal updated successfully!";
      document.body.appendChild(successMessage);

      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 3000);
    } catch (err) {
      console.error("Error updating goal:", err);
      setError("Failed to update goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    setNewData(currentText || "");
    setIsEditing(false);
    setError("");
  };

  const handleEdit = () => {
    setNewData(currentText || "");
    setIsEditing(true);
    setError("");
  };

  if (!isEditing) {
    return (
      <button
        className="btn btn-sm btn-outline edit-trigger"
        onClick={handleEdit}
        title="Edit this goal"
      >
        ✏️ Edit
      </button>
    );
  }

  return (
    <div className="update-goal-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editGoal(id, newData);
        }}
      >
        <div className="edit-input-group">
          <input
            type="text"
            value={newData}
            placeholder="Update your goal..."
            className={`form-input edit-input ${error ? "field-error" : ""}`}
            onChange={(e) => {
              setNewData(e.target.value);
              if (error) setError("");
            }}
            disabled={isLoading}
            maxLength={200}
            autoFocus
          />

          <div className="edit-actions">
            <button
              type="submit"
              className={`btn btn-sm btn-success ${isLoading ? "loading" : ""}`}
              disabled={isLoading || !newData.trim() || newData === currentText}
              title="Save changes"
            >
              {isLoading ? "⏳" : "✅"}
            </button>

            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={handleCancel}
              disabled={isLoading}
              title="Cancel editing"
            >
              ❌
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="edit-hint">
          <span className="character-count">
            {newData.length}/200 characters
          </span>
          <span className="edit-tip">
            Press Enter to save, Escape to cancel
          </span>
        </div>
      </form>
    </div>
  );
}

function GoalForm({ onSubmit, initialData = {} }) {
  const [text, setText] = useState(initialData.text || "");
  const [completed, setCompleted] = useState(initialData.completed || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text, completed });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Goal text"
        required
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </label>
      <button type="submit">Save Goal</button>
    </form>
  );
}

export default UpdateGoal;
