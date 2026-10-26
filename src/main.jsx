
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const challenges = [
  { icon: "🚰", title: "Bring a reusable bottle", points: 10, category: "Daily life" },
  { icon: "🚲", title: "Walk or cycle today", points: 20, category: "Transport" },
  { icon: "💡", title: "Switch off unused lights", points: 10, category: "Energy" },
  { icon: "🌱", title: "Choose a plant-based meal", points: 15, category: "Food" },
  { icon: "♻️", title: "Sort your waste correctly", points: 15, category: "Waste" },
  { icon: "🛍️", title: "Avoid single-use plastic", points: 10, category: "Daily life" }
];

const features = [
  { icon: "🌍", title: "Know your impact", text: "Understand how everyday choices affect our planet." },
  { icon: "🎯", title: "Take eco challenges", text: "Build sustainable habits through achievable goals." },
  { icon: "📊", title: "Track your progress", text: "See your estimated footprint and points over time." }
];

function App() {
  const [page, setPage] = useState("Home");
  const [name, setName] = useState(() => localStorage.getItem("eco-name") || "");
  
const [distance, setDistance] = useState(() =>
  Number(localStorage.getItem("eco-distance") ?? 5)
);

const [electricity, setElectricity] = useState(() =>
  Number(localStorage.getItem("eco-electricity") ?? 3)
);

const [diet, setDiet] = useState(() =>
  localStorage.getItem("eco-diet") || "Mixed"
);

const [transport, setTransport] = useState(() =>
  localStorage.getItem("eco-transport") || "Bus"
);

const [results, setResults] = useState(() =>
  localStorage.getItem("eco-results")
);

  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eco-completed") || "[]");
    } catch {
      return [];
    }
  });
  const [showWelcome, setShowWelcome] = useState(false);
  const [notice, setNotice] = useState("");
const treeStage =

  points >= 70 ? 4 :

  points >= 40 ? 3 :

  points >= 20 ? 2 :

  points >= 10 ? 1 : 0;

const treeStages = [

  { emoji: "🌰", title: "Tiny Seed", message: "Complete a challenge to plant your future." },

  { emoji: "🌱", title: "New Sprout", message: "Your sustainability journey has begun!" },

  { emoji: "🌿", title: "Growing Sapling", message: "Keep making greener choices!" },

  { emoji: "🌳", title: "EcoTree", message: "Your eco-habits are taking root!" },

  { emoji: "🌳🌼", title: "Green Guardian", message: "Amazing! You're growing a greener future." }

];

const campusLevel =

  points >= 100 ? 4 :

  points >= 70 ? 3 :

  points >= 40 ? 2 :

  points >= 10 ? 1 : 0;

const campusStages = [

  "Campus waiting to bloom",

  "First green steps",

  "A greener campus",

  "Blooming campus",

  "Eco campus champion"
  ];
  useEffect(() => {
    localStorage.setItem("eco-completed", JSON.stringify(completed));
  }, [completed]);

  useEffect(() => {
    if (name) localStorage.setItem("eco-name", name);
  }, [name]);

useEffect(() => {
  localStorage.setItem("eco-distance", String(distance));
  localStorage.setItem("eco-electricity", String(electricity));
  localStorage.setItem("eco-diet", diet);
  localStorage.setItem("eco-transport", transport);

  if (results !== null) {
    localStorage.setItem("eco-results", results);
  } else {
    localStorage.removeItem("eco-results");
  }
}, [distance, electricity, diet, transport, results]);

  const points = completed.reduce((sum, i) => sum + challenges[i].points, 0);
  const progress = Math.round((completed.length / challenges.length) * 100);

  function calculateFootprint() {
    const transportFactor = {
      Bus: 0.08,
      Car: 0.21,
      Bike: 0.10,
      Walk: 0,
      "Public train": 0.04
    };
    const dietFactor = {
      Plant: 2.0,
      Vegetarian: 2.5,
      Mixed: 3.5
    };
    const total =
      distance * (transportFactor[transport] ?? 0.08) +
      electricity * 0.45 +
      (dietFactor[diet] ?? 3.5);

    setResults(total.toFixed(1));
  }

  function toggleChallenge(index) {
    setCompleted(old =>
      old.includes(index)
        ? old.filter(i => i !== index)
        : [...old, index]
    );
    setNotice(
      completed.includes(index)
        ? "Challenge unchecked."
        : `Nice work! You earned ${challenges[index].points} points.`
    );
    setTimeout(() => setNotice(""), 2500);
  }

  function resetProgress() {
    setCompleted([]);
    setResults(null);
    setNotice("Demo progress has been reset.");
    setTimeout(() => setNotice(""), 2500);
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <button className="brand" onClick={() => setPage("Home")}>
          <span className="brand-icon">♻</span>
          <span>Eco<span className="brand-accent">Stack</span></span>
        </button>

        <nav className="nav-links">
          {["Home", "Dashboard", "Challenges", "About"].map(item => (
            <button
              key={item}
              className={page === item ? "nav-link active" : "nav-link"}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <button className="nav-cta" onClick={() => setPage("Dashboard")}>
          Get started <span>↗</span>
        </button>
      </header>

      <main>
        {page === "Home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="live-dot"></span>
                  SMALL STEPS. BIG IMPACT.
                </div>
                <h1>
                  A greener campus
                  <br />
                  starts with <span>you.</span>
                </h1>
                <p className="hero-text">
                  Make sustainability part of your everyday life.
                  Track your footprint, take eco challenges and inspire
                  your campus to build a better tomorrow.
                </p>
                <div className="hero-actions">
                  <button className="button-primary" onClick={() => setPage("Dashboard")}>
                    Explore your impact <span>→</span>
                  </button>
                  <button className="button-secondary" onClick={() => setPage("Challenges")}>
                    Explore challenges
                  </button>
                </div>
                <div className="hero-proof">
                  <span className="proof-icon">🌿</span>
                  <span>One planet. One campus. One collective effort.</span>
                </div>
              </div>

              <div className="hero-art">
                <div className="art-orbit orbit-one"></div>
                <div className="art-orbit orbit-two"></div>
                <div className="planet">
                  <div className="planet-land land-one"></div>
                  <div className="planet-land land-two"></div>
                  <div className="planet-land land-three"></div>
                  <span className="planet-leaf">🌿</span>
                </div>
                <div className="floating-card card-top">
                  <span className="float-icon">🌎</span>
                  <div><strong>Think globally</strong><small>Act locally</small></div>
                </div>
                <div className="floating-card card-bottom">
                  <span className="float-icon">🌱</span>
                  <div><strong>Every action counts</strong><small>Start today</small></div>
                </div>
                <div className="art-caption">OUR PLANET, OUR RESPONSIBILITY</div>
              </div>
            </section>

            <section className="stats-strip">
              <div><strong>01</strong><span>Measure your impact</span></div>
              <div><strong>02</strong><span>Build greener habits</span></div>
              <div><strong>03</strong><span>Make change together</span></div>
            </section>

            <section className="section">
              <div className="section-heading">
                <div>
                  <span className="section-label">WHY ECOSTACK?</span>
                  <h2>Make every choice count.</h2>
                </div>
                <p>Simple actions today can shape a more sustainable tomorrow.</p>
              </div>
              <div className="feature-grid">
                {features.map((feature, i) => (
                  <article className="feature-card" key={feature.title}>
                    <div className="feature-icon">{feature.icon}</div>
                    <span className="feature-number">0{i + 1}</span>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                    <button className="text-link" onClick={() => setPage(i === 1 ? "Challenges" : "Dashboard")}>
                      Discover more <span>→</span>
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <section className="banner">
              <div>
                <span className="section-label light-label">YOUR JOURNEY STARTS HERE</span>
                <h2>Be the change your campus needs.</h2>
                <p>Choose one sustainable action. Then make it a habit.</p>
              </div>
              <button className="button-light" onClick={() => setPage("Challenges")}>
                Start a challenge <span>→</span>
              </button>
            </section>
          </>
        )}

        {page === "Dashboard" && (
          <section className="page-section">
            <div className="page-intro">
              <span className="section-label">YOUR ECO SPACE</span>
              <h1>Your impact, <span>your journey.</span></h1>
              <p>Track your estimated footprint and celebrate your sustainable actions.</p>
            </div>

            <div className="welcome-box">
              <div>
                <h2>Welcome{name ? `, ${name}` : " to EcoStack"}! 🌿</h2>
                <p>Your sustainability journey begins with a single step.</p>
              </div>
              <button className="button-secondary" onClick={() => setShowWelcome(v => !v)}>
                {name ? "Edit profile" : "Set your name"}
              </button>
            </div>

            {showWelcome && (
              <div className="name-form">
                <label htmlFor="eco-name">What should we call you?</label>
                <div className="form-row">
                  <input id="eco-name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
                  <button className="button-primary" onClick={() => setShowWelcome(false)}>Save</button>
                </div>
                <small>Your name is saved locally in this browser.</small>
              </div>
            )}

            <div className="metric-grid">
              <article className="metric-card">
                <span className="metric-icon">🌍</span>
                <span className="metric-label">Estimated daily footprint</span>
                <strong>{results ?? "—"} <small>kg CO₂e</small></strong>
                <p>{results ? "Based on your sample inputs" : "Calculate your estimate below"}</p>
              </article>
              <article className="metric-card">
                <span className="metric-icon">🏆</span>
                <span className="metric-label">Eco points earned</span>
                <strong>{points} <small>pts</small></strong>
                <p>Earn more by completing challenges</p>
              </article>
              <article className="metric-card">
                <span className="metric-icon">🌱</span>
                <span className="metric-label">Challenges completed</span>
                <strong>{completed.length}<small> / {challenges.length}</small></strong>
                <p>{progress}% of available demo challenges</p>
              </article>
            </div>

            <div className="dashboard-grid">
              <section className="panel">
                <div className="panel-heading">
                  <div><span className="section-label">FOOTPRINT ESTIMATOR</span><h2>Daily habits, real impact.</h2></div>
                  <span className="panel-emoji">📊</span>
                </div>
                <p className="muted">Enter approximate daily activity to generate an illustrative estimate.</p>

                <label className="field-label" htmlFor="distance">Travel distance: {distance} km/day</label>
                <input id="distance" className="range-input" type="range" min="0" max="50" value={distance} onChange={e => setDistance(Number(e.target.value))} />

                <label className="field-label" htmlFor="electricity">Electricity use: {electricity} kWh/day</label>
                <input id="electricity" className="range-input" type="range" min="0" max="15" value={electricity} onChange={e => setElectricity(Number(e.target.value))} />

                <label className="field-label" htmlFor="transport">Usual transport</label>
                <select id="transport" value={transport} onChange={e => setTransport(e.target.value)}>
                  <option>Bus</option><option>Car</option><option>Bike</option><option>Walk</option><option>Public train</option>
                </select>

                <label className="field-label" htmlFor="diet">Usual diet</label>
                <select id="diet" value={diet} onChange={e => setDiet(e.target.value)}>
                  <option value="Plant">Mostly plant-based</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Mixed">Mixed diet</option>
                </select>

                <button className="button-primary full-button" onClick={calculateFootprint}>Calculate my estimate →</button>
                <p className="disclaimer">Educational illustration only, not a validated carbon audit. Actual emissions vary by location, energy source and activity.</p>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <div><span className="section-label">YOUR PROGRESS</span><h2>Keep growing.</h2></div>
                  <span className="panel-emoji">🌿</span>
                </div>
                <div className="progress-circle" style={{ "--progress": `${progress}%` }}>
                  <div className="progress-inner">
                    <strong>{progress}%</strong>
                    <span>completed</span>
                  </div>
                </div>
                <p className="progress-message">
                  {completed.length === challenges.length
                    ? "Amazing! You've completed every demo challenge."
                    : completed.length
                      ? "Every small action moves you forward. Keep going!"
                      : "Complete your first eco challenge to begin."}
                </p>
                <div className="progress-bar"><span style={{ width: `${progress}%` }}></span></div>
                <div className="progress-meta"><span>Challenges</span><strong>{completed.length}/{challenges.length}</strong></div>
                <button className="button-primary full-button" onClick={() => setPage("Challenges")}>View challenges →</button>
                <button className="reset-button" onClick={resetProgress}>Reset demo progress</button>
              </section>
            </div>
          </section>
        )}

        {page === "Challenges" && (
          <section className="page-section">
            <div className="page-intro">
              <span className="section-label">SMALL ACTIONS. BIG CHANGE.</span>
              <h1>Take the <span>eco challenge.</span></h1>
              <p>Complete simple actions, earn points and build sustainable habits.</p>
            </div>
            <div className="challenge-summary">
              <div><strong>{completed.length}/{challenges.length}</strong><span>Completed</span></div>
              <div><strong>{points}</strong><span>Points earned</span></div>
              <div><strong>{challenges.length - completed.length}</strong><span>Still to explore</span></div>
            </div>
            {notice && <div className="notice" role="status">{notice}</div>}
            <div className="challenge-grid">
              {challenges.map((challenge, i) => {
                const done = completed.includes(i);
                return (
                  <article className={done ? "challenge-card completed" : "challenge-card"} key={challenge.title}>
                    <div className="challenge-top">
                      <span className="challenge-icon">{challenge.icon}</span>
                      <span className="points-pill">+{challenge.points} pts</span>
                    </div>
                    <span className="category-label">{challenge.category}</span>
                    <h3>{challenge.title}</h3>
                    <p>{done ? "You've checked off this sustainable action." : "Make this simple action part of your day."}</p>
                    <button className={done ? "challenge-button done" : "challenge-button"} onClick={() => toggleChallenge(i)}>
                      {done ? "✓ Completed" : "Mark as complete →"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {page === "About" && (
          <section className="page-section">
            <div className="page-intro">
              <span className="section-label">OUR PURPOSE</span>
              <h1>Understand. Act. <span>Sustain.</span></h1>
              <p>EcoStack is a student project exploring how digital tools can encourage environmentally responsible choices.</p>
            </div>
            <div className="about-layout">
              <div className="about-visual">🌏<span>ONE PLANET.<br />SHARED FUTURE.</span></div>
              <div className="about-copy">
                <h2>Why EcoStack?</h2>
                <p>Daily decisions around transport, electricity, food and waste contribute to our environmental footprint. EcoStack brings these topics together in one accessible educational website.</p>
                <h3>Our objectives</h3>
                <ul>
                  <li>Raise awareness of everyday environmental impact.</li>
                  <li>Encourage practical, sustainable habits.</li>
                  <li>Make environmental learning interactive.</li>
                  <li>Support a greener campus culture.</li>
                </ul>
                <p className="disclaimer">This is a student demonstration prototype. User progress is stored locally in the current browser; shared accounts and cloud database features are not yet connected.</p>
                <button className="button-primary" onClick={() => setPage("Challenges")}>Explore the challenges →</button>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <button className="brand footer-brand" onClick={() => setPage("Home")}>
          <span className="brand-icon">♻</span>
          <span>Eco<span className="brand-accent">Stack</span></span>
        </button>
        <p>Build a greener tomorrow, one choice at a time.</p>
        <span className="footer-tag">A STUDENT SUSTAINABILITY PROJECT</span>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} EcoStack</span>
          <span>Made for a more sustainable future 🌱</span>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

