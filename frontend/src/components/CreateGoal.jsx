import React, { useState } from "react";

function CreateGoal({ data, setdata, onSuccess }) {
  const [goal, setGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function goalCreate(goalText) {
    if (!goalText.trim()) {
      setError("Please enter a goal");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const realtoken = `Bearer ${token}`;

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: realtoken,
        },
        body: JSON.stringify({ text: goalText }),
      });

      if (!response.ok) {
        throw new Error("Failed to create goal");
      }

      const newGoal = await response.json();
      setdata([...data, newGoal]);
      setGoal("");
      setError("");

      if (onSuccess) {
        onSuccess();
      }

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-toast";
      successMessage.textContent = "✅ Goal created successfully!";
      document.body.appendChild(successMessage);

      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
    } catch (err) {
      console.error("Error creating goal:", err);
      setError("Failed to create goal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="create-goal-form">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goalCreate(goal);
        }}
      >
        <div className="form-group">
          <label className="form-label">🎯 What's your goal?</label>
          <div className="goal-input-group">
            <input
              type="text"
              value={goal}
              placeholder="E.g., Learn React, Exercise daily, Read 12 books this year..."
              className={`form-input goal-input ${error ? "field-error" : ""}`}
              onChange={(e) => {
                setGoal(e.target.value);
                if (error) setError("");
              }}
              disabled={isLoading}
              maxLength={200}
            />
            <button
              type="submit"
              className={`btn btn-primary create-btn ${isLoading ? "loading" : ""}`}
              disabled={isLoading || !goal.trim()}
            >
              {isLoading ? (
                <>
                  <span className="btn-spinner"></span>
                  Creating...
                </>
              ) : (
                <>✨ Create Goal</>
              )}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-hint">
            <span className="character-count">
              {goal.length}/200 characters
            </span>
            <span className="form-tip">
              💡 Tip: Be specific and measurable with your goals
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateGoal;
