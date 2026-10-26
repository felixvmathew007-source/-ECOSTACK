
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const challenges = [
  {
    title: "Bring a Reusable Water Bottle",
    category: "Plastic Reduction",
    description:
      "Avoid single-use plastic by carrying a reusable bottle to campus.",
    points: 20,
    icon: "💧",
  },
  {
    title: "Walk or Cycle to Campus",
    category: "Green Transport",
    description:
      "Choose a low-carbon way to travel whenever possible.",
    points: 30,
    icon: "🚲",
  },
  {
    title: "Switch Off Unused Lights",
    category: "Energy Saving",
    description:
      "Save electricity by switching off lights and fans when leaving a room.",
    points: 15,
    icon: "💡",
  },
  {
    title: "Avoid Single-Use Plastic",
    category: "Waste Reduction",
    description:
      "Use reusable bags and containers instead of disposable plastic.",
    points: 25,
    icon: "♻️",
  },
  {
    title: "Save Water",
    category: "Water Conservation",
    description:
      "Turn off taps properly and avoid wasting water.",
    points: 15,
    icon: "🚰",
  },
  {
    title: "Keep the Campus Clean",
    category: "Campus Care",
    description:
      "Dispose of waste correctly and help keep campus spaces clean.",
    points: 20,
    icon: "🌱",
  },
];

const features = [
  {
    icon: "🌍",
    title: "Track Your Footprint",
    description:
      "Estimate the environmental impact of everyday choices.",
  },
  {
    icon: "🎯",
    title: "Take Green Challenges",
    description:
      "Complete practical sustainability activities and earn points.",
  },
  {
    icon: "🌳",
    title: "Grow Together",
    description:
      "Watch your virtual EcoTree grow as you make greener choices.",
  },
];

const STORAGE_KEYS = {
  completed: "eco-completed",
  name: "eco-name",
  transport: "eco-transport",
  diet: "eco-diet",
  energy: "eco-energy",
  shopping: "eco-shopping",
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved);
  } catch {
    return fallback;
  }
}

function App() {
  const [page, setPage] = useState("home");

  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.name) || "";
    } catch {
      return "";
    }
  });

  const [completed, setCompleted] = useState(() => {
    const saved = readStorage(STORAGE_KEYS.completed, []);
    return Array.isArray(saved)
      ? saved.filter(
          (index) =>
            Number.isInteger(index) &&
            index >= 0 &&
            index < challenges.length
        )
      : [];
  });

  const [transport, setTransport] = useState(() =>
    readStorage(STORAGE_KEYS.transport, "public")
  );

  const [diet, setDiet] = useState(() =>
    readStorage(STORAGE_KEYS.diet, "mixed")
  );

  const [energy, setEnergy] = useState(() =>
    readStorage(STORAGE_KEYS.energy, "medium")
  );

  const [shopping, setShopping] = useState(() =>
    readStorage(STORAGE_KEYS.shopping, "sometimes")
  );

  const [showWelcome, setShowWelcome] = useState(false);
  const [notice, setNotice] = useState("");

  // Save user information and progress between visits.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.completed,
        JSON.stringify(completed)
      );
      localStorage.setItem(STORAGE_KEYS.name, name);
      localStorage.setItem(
        STORAGE_KEYS.transport,
        JSON.stringify(transport)
      );
      localStorage.setItem(STORAGE_KEYS.diet, JSON.stringify(diet));
      localStorage.setItem(STORAGE_KEYS.energy, JSON.stringify(energy));
      localStorage.setItem(
        STORAGE_KEYS.shopping,
        JSON.stringify(shopping)
      );
    } catch (error) {
      console.warn("EcoStack could not save data:", error);
    }
  }, [completed, name, transport, diet, energy, shopping]);

  // Calculate points before calculating the EcoTree stage.
  const points = completed.reduce(
    (total, index) => total + challenges[index].points,
    0
  );

  const progress = Math.round(
    (completed.length / challenges.length) * 100
  );

  const treeStages = [
    {
      min: 0,
      icon: "🌱",
      title: "A New Seed",
      description: "Every greener choice starts somewhere.",
    },
    {
      min: 30,
      icon: "🌿",
      title: "Growing Strong",
      description: "Your sustainable habits are taking root.",
    },
    {
      min: 70,
      icon: "🪴",
      title: "A Young Plant",
      description: "Keep going. Your positive impact is growing.",
    },
    {
      min: 120,
      icon: "🌳",
      title: "Eco Champion",
      description: "Your actions are helping create a greener campus.",
    },
  ];

  const treeStage =
    [...treeStages].reverse().find((stage) => points >= stage.min) ||
    treeStages[0];

  const campusStages = [
    { min: 0, title: "Seedling", icon: "🌱" },
    { min: 50, title: "Growing Campus", icon: "🌿" },
    { min: 100, title: "Green Campus", icon: "🌳" },
    { min: 180, title: "Eco Campus Champion", icon: "🌎" },
  ];

  const campusLevel =
    [...campusStages]
      .reverse()
      .find((stage) => points >= stage.min) || campusStages[0];

  const estimatedFootprint =
    (transport === "car" ? 3.5 : transport === "public" ? 1.8 : 0.5) +
    (diet === "meat" ? 3 : diet === "mixed" ? 2 : 1) +
    (energy === "high" ? 3 : energy === "medium" ? 2 : 1) +
    (shopping === "often" ? 2.5 : shopping === "sometimes" ? 1.5 : 0.5);

  function navigate(destination) {
    setPage(destination);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleChallenge(index) {
    const alreadyCompleted = completed.includes(index);

    setCompleted((previous) =>
      alreadyCompleted
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );

    setNotice(
      alreadyCompleted
        ? "Challenge marked as incomplete."
        : `Challenge completed! You earned ${challenges[index].points} points.`
    );

    window.setTimeout(() => setNotice(""), 3000);
  }

  function resetProgress() {
    const confirmed = window.confirm(
      "Reset all challenge progress and footprint answers?"
    );

    if (!confirmed) return;

    setCompleted([]);
    setTransport("public");
    setDiet("mixed");
    setEnergy("medium");
    setShopping("sometimes");
    setNotice("Your progress has been reset.");

    window.setTimeout(() => setNotice(""), 3000);
  }

  function getStarted() {
    setShowWelcome(true);
    navigate("dashboard");
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <button
          className="nav-logo"
          onClick={() => navigate("home")}
          aria-label="EcoStack home"
        >
          <span>🌱</span> EcoStack
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {[
            ["home", "Home"],
            ["dashboard", "Dashboard"],
            ["challenges", "Challenges"],
            ["about", "About"],
          ].map(([destination, label]) => (
            <button
              key={destination}
              className={`nav-link ${
                page === destination ? "active" : ""
              }`}
              onClick={() => navigate(destination)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button className="nav-cta" onClick={getStarted}>
          Get Started
        </button>
      </header>

      {notice && (
        <div className="notice" role="status">
          {notice}
        </div>
      )}

      <main>
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-content">
                <div className="hero-badge">
                  🌍 Campus Sustainability Initiative
                </div>

                <h1 className="hero-title">
                  SMALL STEPS.
                  <br />
                  BIG IMPACT.
                </h1>

                <p className="hero-subtitle">
                  A greener campus starts with you. Make sustainability
                  part of your everyday life.
                </p>

                <p>
                  Track your footprint, take eco challenges and inspire
                  your campus to build a greener tomorrow.
                </p>

                <div className="hero-actions">
                  <button
                    className="btn-primary"
                    onClick={getStarted}
                  >
                    Explore Dashboard →
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => navigate("challenges")}
                  >
                    View Challenges
                  </button>
                </div>

                <div className="hero-stats">
                  <div>
                    <strong>{challenges.length}</strong>
                    <span>Eco Challenges</span>
                  </div>
                  <div>
                    <strong>{points}</strong>
                    <span>Points Earned</span>
                  </div>
                  <div>
                    <strong>{completed.length}</strong>
                    <span>Challenges Done</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-eco-circle">
                  <span>🌎</span>
                  <span>🌿</span>
                  <span>♻️</span>
                </div>
                <p>Build a Greener Tomorrow</p>
              </div>
            </section>

            <section className="section">
              <div className="section-heading">
                <span className="eyebrow">WHY ECOSTACK?</span>
                <h2>Make sustainability a daily habit.</h2>
                <p>
                  Small actions can lead to meaningful environmental
                  change when we take them together.
                </p>
              </div>

              <div className="feature-grid">
                {features.map((feature) => (
                  <article className="feature-card" key={feature.title}>
                    <div className="feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="home-cta">
              <h2>Ready to make a difference?</h2>
              <p>
                Start with one challenge. Keep building better habits.
              </p>
              <button
                className="btn-primary"
                onClick={getStarted}
              >
                Start Your Journey →
              </button>
            </section>
          </>
        )}

        {page === "dashboard" && (
          <section className="page-container">
            <div className="page-heading">
              <span className="eyebrow">YOUR GREEN JOURNEY</span>
              <h1>
                Welcome{name.trim() ? `, ${name.trim()}` : " to EcoStack"}!
                🌱
              </h1>
              <p>
                See your progress, estimate your footprint and grow
                your EcoTree.
              </p>
            </div>

            {showWelcome && (
              <div className="panel welcome-panel">
                <div>
                  <h3>Make this dashboard yours</h3>
                  <p>
                    Add your name to personalise your EcoStack experience.
                  </p>
                </div>

                <div className="welcome-input">
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    aria-label="Your name"
                    maxLength={50}
                  />
                  <button
                    className="btn-primary"
                    onClick={() => setShowWelcome(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            <div className="metric-grid">
              <article className="metric-card">
                <span className="metric-icon">⭐</span>
                <p>Total Eco Points</p>
                <h2>{points}</h2>
              </article>

              <article className="metric-card">
                <span className="metric-icon">✅</span>
                <p>Completed Challenges</p>
                <h2>
                  {completed.length}/{challenges.length}
                </h2>
              </article>

              <article className="metric-card">
                <span className="metric-icon">📈</span>
                <p>Overall Progress</p>
                <h2>{progress}%</h2>
              </article>

              <article className="metric-card">
                <span className="metric-icon">{campusLevel.icon}</span>
                <p>Campus Level</p>
                <h2>{campusLevel.title}</h2>
              </article>
            </div>

       
<section className="panel ecotree-panel">
  <div className="panel-heading">
    <div>
      <span className="eyebrow">BUILD A GREENER CAMPUS</span>
      <h2>🌿 EcoStack Tower</h2>
      <p>
        Every sustainable action adds another block to our
        greener future.
      </p>
    </div>
  </div>

  <div
    style={{
      textAlign: "center",
      padding: "20px 8px",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        gap: "5px",
        minHeight: "170px",
        justifyContent: "flex-start",
      }}
    >
      {Array.from({
        length: Math.max(1, completed.length),
      }).map((_, index) => (
        <div
          key={index}
          style={{
            width: `${Math.min(100, 42 + (index % 3) * 7)}%`,
            maxWidth: "300px",
            minHeight: "28px",
            borderRadius: "6px",
            background: [
              "#2e7d32",
              "#388e3c",
              "#43a047",
              "#558b2f",
              "#689f38",
            ][index % 5],
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: "600",
            boxShadow: "0 3px 6px #00000018",
            padding: "4px 8px",
            boxSizing: "border-box",
          }}
        >
          <span>{["🌱", "♻️", "💧", "🌍", "🌿"][index % 5]}</span>
          <span>Eco Block {index + 1}</span>
        </div>
      ))}
    </div>

    <h3 style={{ marginTop: "18px" }}>
      {completed.length === challenges.length
        ? "🏆 EcoStack Champion!"
        : completed.length === 0
        ? "🌱 Start Your Tower!"
        : "🌳 Your Tower Is Growing!"}
    </h3>

    <p>
      {completed.length} of {challenges.length} eco blocks built
    </p>

    <div className="progress-track">
      <div
        className="progress-fill"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>

    <p style={{ fontSize: "13px", marginTop: "10px" }}>
      {points} points earned · {progress}% challenge progress
    </p>

    <button
      className="btn-primary"
      onClick={() => navigate("challenges")}
      style={{ marginTop: "10px" }}
    >
      {completed.length === challenges.length
        ? "Review Challenges"
        : "Build Your Next Block →"}
    </button>

    <p className="muted-text" style={{ marginTop: "14px" }}>
      Complete an eco challenge to add a block to your tower.
      Your progress is saved in this browser.
    </p>
  </div>
</section>


            <div className="dashboard-grid">
              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">YOUR ACTIVITY</span>
                    <h2>Challenge Progress</h2>
                  </div>
                  <span className="panel-icon">🎯</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p>
                  {completed.length} of {challenges.length} challenges
                  completed ({progress}%).
                </p>

                <button
                  className="btn-primary"
                  onClick={() => navigate("challenges")}
                >
                  {completed.length === challenges.length
                    ? "Review Challenges"
                    : "Continue Challenges"}
                </button>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">YOUR NEXT STEP</span>
                    <h2>Quick Actions</h2>
                  </div>
                  <span className="panel-icon">🌿</span>
                </div>

                <p>
                  Every small action contributes to a more sustainable
                  campus.
                </p>

                <div className="quick-actions">
                  <button
                    className="btn-secondary"
                    onClick={() => navigate("challenges")}
                  >
                    Explore Challenges
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setShowWelcome(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Edit Your Name
                  </button>
                </div>
              </section>
            </div>

            <section className="panel footprint-panel">
              <div className="panel-heading">
                <div>
                  <span className="eyebrow">PERSONAL SUSTAINABILITY</span>
                  <h2>Footprint Estimator</h2>
                  <p>
                    Answer these questions to receive a simple lifestyle
                    impact estimate.
                  </p>
                </div>
                <span className="panel-icon">🌍</span>
              </div>

              <div className="estimator-grid">
                <label>
                  How do you usually travel?
                  <select
                    value={transport}
                    onChange={(event) => setTransport(event.target.value)}
                  >
                    <option value="walk">Walk or cycle</option>
                    <option value="public">Bus or public transport</option>
                    <option value="car">Car or personal vehicle</option>
                  </select>
                </label>

                <label>
                  Which diet best describes you?
                  <select
                    value={diet}
                    onChange={(event) => setDiet(event.target.value)}
                  >
                    <option value="plant">Mostly plant-based</option>
                    <option value="mixed">Mixed diet</option>
                    <option value="meat">Meat-heavy diet</option>
                  </select>
                </label>

                <label>
                  How much energy do you use at home?
                  <select
                    value={energy}
                    onChange={(event) => setEnergy(event.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </label>

                <label>
                  How often do you buy new items?
                  <select
                    value={shopping}
                    onChange={(event) => setShopping(event.target.value)}
                  >
                    <option value="rarely">Rarely</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="often">Often</option>
                  </select>
                </label>
              </div>

              <div className="estimate-result">
                <span className="eyebrow">YOUR ESTIMATE</span>
                <h2>
                  {estimatedFootprint.toFixed(1)} / 12
                </h2>
                <p>
                  {estimatedFootprint <= 5
                    ? "Your selected habits suggest a relatively lower-impact lifestyle. Keep it up!"
                    : estimatedFootprint <= 8
                    ? "There are opportunities to reduce your impact through greener daily choices."
                    : "Consider greener transport, energy-saving habits and more mindful consumption."}
                </p>
              </div>

              <p className="muted-text">
                This is an illustrative score based on your selected
                answers, not a scientific carbon-footprint measurement.
              </p>
            </section>

            <div className="reset-row">
              <button className="btn-secondary" onClick={resetProgress}>
                Reset Progress
              </button>
            </div>
          </section>
        )}

        {page === "challenges" && (
          <section className="page-container">
            <div className="page-heading">
              <span className="eyebrow">TAKE ACTION</span>
              <h1>Eco Challenges 🌿</h1>
              <p>
                Turn sustainable intentions into everyday actions.
                Complete challenges to earn eco points.
              </p>
            </div>

            <div className="challenge-summary panel">
              <div>
                <p>Your points</p>
                <h2>{points}</h2>
              </div>
              <div>
                <p>Completed</p>
                <h2>
                  {completed.length}/{challenges.length}
                </h2>
              </div>
              <div>
                <p>Progress</p>
                <h2>{progress}%</h2>
              </div>
            </div>

            <div className="challenge-grid">
              {challenges.map((challenge, index) => {
                const isCompleted = completed.includes(index);

                return (
                  <article
                    className={`challenge-card ${
                      isCompleted ? "completed" : ""
                    }`}
                    key={challenge.title}
                  >
                    <div className="challenge-card-top">
                      <span className="challenge-icon">
                        {challenge.icon}
                      </span>
                      <span className="challenge-points">
                        +{challenge.points} pts
                      </span>
                    </div>

                    <span className="eyebrow">
                      {challenge.category}
                    </span>

                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>

                    <button
                      className={
                        isCompleted ? "btn-secondary" : "btn-primary"
                      }
                      onClick={() => toggleChallenge(index)}
                    >
                      {isCompleted
                        ? "✓ Completed — Undo"
                        : "Mark as Complete"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {page === "about" && (
          <section className="page-container">
            <div className="page-heading">
              <span className="eyebrow">ABOUT ECOSTACK</span>
              <h1>Building a Greener Tomorrow 🌎</h1>
              <p>
                Small steps. Big impact. A more sustainable campus
                begins with everyday choices.
              </p>
            </div>

            <section className="panel about-intro">
              <h2>What is EcoStack?</h2>
              <p>
                EcoStack is a campus sustainability website designed
                to encourage environmentally responsible habits among
                students. It combines a footprint estimator, interactive
                eco challenges and a points-based progress system to
                make sustainable choices easier to understand and practise.
              </p>
            </section>

            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Environmental Awareness</h3>
                <p>
                  Understand how transport, energy and consumption
                  choices can affect the environment.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Action-Based Learning</h3>
                <p>
                  Use practical challenges to turn environmental
                  awareness into everyday behaviour.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon">🌱</div>
                <h3>Positive Reinforcement</h3>
                <p>
                  Earn points and track progress as you complete
                  sustainability activities.
                </p>
              </article>
            </div>

            <section className="panel about-intro">
              <h2>Our Goal</h2>
              <p>
                Our goal is to make campus sustainability engaging,
                accessible and measurable at a basic level. By
                encouraging students to adopt greener habits, EcoStack
                aims to support a culture of environmental responsibility.
              </p>

              <button
                className="btn-primary"
                onClick={() => navigate("challenges")}
              >
                Start an Eco Challenge →
              </button>
            </section>
          </section>
        )}
      </main>

      <footer className="footer">
        <button
          className="footer-brand"
          onClick={() => navigate("home")}
        >
          🌱 EcoStack
        </button>

        <p>Build a Greener Tomorrow, One Choice at a Time.</p>

        <div className="footer-links">
          <button onClick={() => navigate("home")}>Home</button>
          <button onClick={() => navigate("dashboard")}>
            Dashboard
          </button>
          <button onClick={() => navigate("challenges")}>
            Challenges
          </button>
          <button onClick={() => navigate("about")}>About</button>
        </div>

        <p className="footer-note">
          An educational campus sustainability project.
        </p>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
