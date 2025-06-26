import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigator = useNavigate();

  return (
    <div className="animate-fade-in">
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Achieve Your Dreams with Goal Tracker</h1>
          <p className="hero-subtitle">
            Set meaningful goals, track your progress, and turn your aspirations
            into achievements. Start your journey towards success today.
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigator("/goals")}
            >
              View My Goals
            </button>
            <button
              className="btn btn-outline btn-lg"
              onClick={() => navigator("/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Why Choose Goal Tracker?</h2>
            <p className="text-muted text-lg">
              Everything you need to stay motivated and achieve your goals
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Set Clear Goals</h3>
              <p className="feature-description">
                Define specific, measurable objectives that align with your
                vision and values.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Track Progress</h3>
              <p className="feature-description">
                Monitor your advancement with intuitive progress tracking and
                visual insights.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Celebrate Success</h3>
              <p className="feature-description">
                Acknowledge milestones and achievements to maintain motivation
                and momentum.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              className="btn btn-secondary"
              onClick={() => navigator("/update")}
            >
              Update Existing Goals
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
