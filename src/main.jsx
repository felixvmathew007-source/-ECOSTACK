
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const initialChallenges = [
  { id: 1, title: "Plastic-Free Day", category: "Waste", icon: "♻️", xp: 50, description: "Avoid single-use plastic for one day.", difficulty: "Easy" },
  { id: 2, title: "Walk or Cycle", category: "Transport", icon: "🚲", xp: 75, description: "Choose a greener way to travel.", difficulty: "Medium" },
  { id: 3, title: "Save Every Drop", category: "Water", icon: "💧", xp: 40, description: "Reduce unnecessary water usage.", difficulty: "Easy" },
  { id: 4, title: "Switch It Off", category: "Energy", icon: "⚡", xp: 60, description: "Turn off unused lights and devices.", difficulty: "Easy" },
  { id: 5, title: "Bring a Reusable Bottle", category: "Waste", icon: "🫙", xp: 35, description: "Skip disposable bottles today.", difficulty: "Easy" },
  { id: 6, title: "Plant for Tomorrow", category: "Nature", icon: "🌱", xp: 100, description: "Plant or care for a green space.", difficulty: "Hard" },
];

const initialTips = [
  "Carry a reusable water bottle.",
  "Switch off lights when leaving a room.",
  "Use reusable bags while shopping.",
  "Walk, cycle or share rides when possible.",
];

function App() {
  const [page, setPage] = useState("Home");
  const [completed, setCompleted] = useState([]);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllTips, setShowAllTips] = useState(false);

  const xp = completed.reduce((total, id) => {
    const challenge = initialChallenges.find((item) => item.id === id);
    return total + (challenge ? challenge.xp : 0);
  }, 0);

  const level = Math.floor(xp / 200) + 1;
  const levelProgress = (xp % 200) / 2;
  const completedCount = completed.length;
  const remaining = initialChallenges.length - completedCount;

  function toggleChallenge(id) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function navigate(nextPage) {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const navItems = ["Home", "Dashboard", "Challenges", "About"];

  function Header() {
    return (
      <header className="topbar">
        <button className="brand" onClick={() => navigate("Home")} aria-label="EcoStack home">
          <span className="brand-icon">🌿</span>
          <span>eco<span className="brand-light">stack</span><small>YOUR GREENER CAMPUS</small></span>
        </button>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"}>
          {navItems.map((item) => (
            <button key={item} onClick={() => navigate(item)} className={page === item ? "nav-link active" : "nav-link"}>
              {item}
            </button>
          ))}
        </nav>

        <button className="profile-chip" onClick={() => navigate("Dashboard")}>
          <span className="avatar">🌱</span>
          <span className="profile-name">Eco Explorer</span>
          <span className="level-tag">LVL {level}</span>
        </button>
      </header>
    );
  }

  function StatCard({ icon, label, value, sub, tone }) {
    return (
      <article className={`stat-card ${tone || ""}`}>
        <div className="stat-top">
          <span className="stat-icon">{icon}</span>
          <span className="stat-arrow">↗</span>
        </div>
        <p className="stat-label">{label}</p>
        <h3>{value}</h3>
        <p className="stat-sub">{sub}</p>
      </article>
    );
  }

  function ChallengeCard({ challenge }) {
    const isDone = completed.includes(challenge.id);
    return (
      <article className={`challenge-card ${isDone ? "challenge-done" : ""}`}>
        <div className="challenge-card-top">
          <span className="challenge-icon">{challenge.icon}</span>
          <span className="xp-pill">✦ {challenge.xp} XP</span>
        </div>
        <div className="challenge-meta">
          <span className="category-label">{challenge.category}</span>
          <span className="difficulty">{challenge.difficulty}</span>
        </div>
        <h3>{challenge.title}</h3>
        <p>{challenge.description}</p>
        <button className={isDone ? "complete-button completed-button" : "complete-button"} onClick={() => toggleChallenge(challenge.id)}>
          {isDone ? "✓ Completed · Undo" : "Complete challenge →"}
        </button>
      </article>
    );
  }

  function ChallengeSection({ preview = false }) {
    const filtered = initialChallenges.filter((item) => {
      const matchesFilter = filter === "All" || item.category === filter;
      const matchesPreview = !preview || !completed.includes(item.id);
      return matchesFilter && matchesPreview;
    });
    const shown = preview ? filtered.slice(0, 3) : filtered;

    return (
      <section className="section-block">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TAKE ACTION, EARN REWARDS</span>
            <h2>{preview ? "Your next green mission" : "Choose your mission."}</h2>
            <p>Small actions. Real habits. A greener tomorrow.</p>
          </div>
          {preview && <button className="text-button" onClick={() => navigate("Challenges")}>View all challenges ↗</button>}
        </div>

        {!preview && (
          <div className="filter-row">
            {["All", "Waste", "Transport", "Water", "Energy", "Nature"].map((item) => (
              <button key={item} onClick={() => setFilter(item)} className={filter === item ? "filter-chip selected" : "filter-chip"}>{item}</button>
            ))}
          </div>
        )}

        <div className="challenge-grid">
          {shown.map((challenge) => <ChallengeCard key={challenge.id} challenge={challenge} />)}
        </div>
        {shown.length === 0 && <div className="empty-state">No missions in this category yet. Try another filter! 🌱</div>}
      </section>
    );
  }

  function Home() {
    return (
      <>
        <section className="hero">
          <div className="hero-copy">
            <div className="hero-badge"><span className="live-dot"></span> YOUR CAMPUS. YOUR PLANET.</div>
            <h1>Make your<br />impact <span>count.</span></h1>
            <p className="hero-description">Turn everyday eco-friendly choices into a game worth playing. Take on challenges, earn XP and inspire a greener campus.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigate("Challenges")}>Explore challenges <span>↗</span></button>
              <button className="secondary-button" onClick={() => navigate("Dashboard")}>View my progress</button>
            </div>
            <div className="hero-proof">
              <span className="proof-avatars">🌎 🌱 ♻️</span>
              <span><strong>Every action matters.</strong><br />Start with one small change today.</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one"></div>
            <div className="art-orbit orbit-two"></div>
            <div className="planet">🌍</div>
            <div className="float-card float-top"><span>🌱</span><div><strong>Keep growing!</strong><small>Your actions matter</small></div></div>
            <div className="float-card float-bottom"><span>⚡</span><div><strong>{xp} XP earned</strong><small>Level {level} Eco Explorer</small></div></div>
            <span className="sparkle sparkle-one">✦</span><span className="sparkle sparkle-two">✧</span>
            <div className="art-caption">BUILD A GREENER TOMORROW</div>
          </div>
        </section>

        <section className="home-stats">
          <StatCard icon="⚡" label="TOTAL XP" value={xp} sub="Earned in this session" tone="stat-green" />
          <StatCard icon="🎯" label="MISSIONS DONE" value={`${completedCount}/${initialChallenges.length}`} sub="Every action counts" />
          <StatCard icon="🌿" label="YOUR LEVEL" value={`Level ${level}`} sub={`${200 - (xp % 200)} XP to next level`} />
          <StatCard icon="🏆" label="ACHIEVEMENTS" value={completedCount >= 3 ? "1 unlocked" : "Keep going!"} sub="Your journey is just starting" />
        </section>

        <ChallengeSection preview />

        <section className="tip-banner">
          <div className="tip-icon">💡</div>
          <div><span className="eyebrow">YOUR DAILY ECO TIP</span><h3>{initialTips[completedCount % initialTips.length]}</h3><p>One small habit can inspire a bigger change.</p></div>
          <button className="secondary-button" onClick={() => setShowAllTips(!showAllTips)}>{showAllTips ? "Hide tips" : "More eco tips"} ↗</button>
        </section>
        {showAllTips && <div className="tips-list">{initialTips.map((tip, i) => <div key={tip} className="tip-item"><span>0{i + 1}</span>{tip}</div>)}</div>}
      </>
    );
  }

  function Dashboard() {
    return (
      <>
        <section className="page-intro">
          <span className="eyebrow">YOUR PERSONAL ECO HUB</span>
          <h1>Your impact, <span>in progress.</span></h1>
          <p>Every little choice moves you closer to a greener lifestyle.</p>
        </section>

        <section className="dashboard-level">
          <div className="level-emblem">🌿</div>
          <div className="level-info">
            <span className="eyebrow">CURRENT RANK</span>
            <h2>Level {level} Eco Explorer</h2>
            <p>Keep completing missions to level up.</p>
            <div className="level-track"><span style={{ width: `${levelProgress}%` }}></span></div>
            <small>{xp % 200} / 200 XP to your next level</small>
          </div>
          <div className="big-xp"><strong>{xp}</strong><span>TOTAL XP</span></div>
        </section>

        <section className="home-stats">
          <StatCard icon="🎯" label="COMPLETED" value={completedCount} sub="Missions completed" />
          <StatCard icon="🗺️" label="AVAILABLE" value={remaining} sub="Missions left to explore" />
          <StatCard icon="🏅" label="LEVEL" value={level} sub="Your eco rank" />
          <StatCard icon="🔥" label="STREAK" value={completedCount > 0 ? "Active" : "Start today"} sub="Daily streak tracking coming soon" />
        </section>

        <section className="section-block">
          <div className="section-heading"><div><span className="eyebrow">YOUR ACHIEVEMENTS</span><h2>Every win deserves a badge.</h2><p>Unlock milestones as you make progress.</p></div></div>
          <div className="badge-grid">
            <div className={completedCount >= 1 ? "achievement unlocked" : "achievement"}><span>🌱</span><strong>First Step</strong><small>Complete your first mission</small><em>{completedCount >= 1 ? "UNLOCKED" : "LOCKED"}</em></div>
            <div className={completedCount >= 3 ? "achievement unlocked" : "achievement"}><span>♻️</span><strong>Green Starter</strong><small>Complete 3 missions</small><em>{completedCount >= 3 ? "UNLOCKED" : "LOCKED"}</em></div>
            <div className={completedCount >= 5 ? "achievement unlocked" : "achievement"}><span>🌍</span><strong>Planet Pal</strong><small>Complete 5 missions</small><em>{completedCount >= 5 ? "UNLOCKED" : "LOCKED"}</em></div>
            <div className={level >= 2 ? "achievement unlocked" : "achievement"}><span>⚡</span><strong>Level Up</strong><small>Reach level 2</small><em>{level >= 2 ? "UNLOCKED" : "LOCKED"}</em></div>
          </div>
        </section>

        <ChallengeSection preview />
        <p className="demo-note">ℹ️ Dashboard scores are calculated from challenges completed in this browser session. They are demonstration data, not verified environmental measurements.</p>
      </>
    );
  }

  function Challenges() {
    return (
      <>
        <section className="page-intro">
          <span className="eyebrow">THE GREEN GAME STARTS HERE</span>
          <h1>Pick a challenge.<br /><span>Change a habit.</span></h1>
          <p>Choose a mission, complete it and collect experience points.</p>
          <div className="challenge-summary"><span>⚡ {xp} XP earned</span><span>✓ {completedCount} completed</span><span>🎯 {remaining} remaining</span></div>
        </section>
        <ChallengeSection />
        <section className="tip-banner">
          <div className="tip-icon">🌎</div>
          <div><span className="eyebrow">REMEMBER</span><h3>Progress over perfection.</h3><p>Choose realistic actions and build habits that last.</p></div>
          <button className="secondary-button" onClick={() => navigate("Dashboard")}>My progress ↗</button>
        </section>
      </>
    );
  }

  function About() {
    return (
      <>
        <section className="about-hero">
          <div className="about-symbol">🌍</div>
          <span className="eyebrow">OUR MISSION</span>
          <h1>Small steps.<br /><span>Big impact.</span></h1>
          <p>EcoStack is a campus sustainability website designed to make greener choices easier to explore, practise and share.</p>
        </section>
        <section className="section-block">
          <div className="section-heading"><div><span className="eyebrow">WHY ECOSTACK?</span><h2>A greener campus begins with us.</h2><p>We believe environmental awareness should lead to practical everyday action.</p></div></div>
          <div className="values-grid">
            <article className="value-card"><span>🌱</span><h3>Learn</h3><p>Discover small, practical ways to make more sustainable choices.</p></article>
            <article className="value-card"><span>🎯</span><h3>Take action</h3><p>Explore missions that encourage eco-friendly everyday habits.</p></article>
            <article className="value-card"><span>🏆</span><h3>Stay motivated</h3><p>Use game-inspired progress and rewards to stay engaged.</p></article>
          </div>
        </section>
        <section className="about-callout"><span>🌿</span><div><h2>Ready to make a difference?</h2><p>Your next small action can start right now.</p></div><button className="primary-button" onClick={() => navigate("Challenges")}>Start a challenge ↗</button></section>
        <div className="tech-note"><span className="eyebrow">PROJECT TECHNOLOGY</span><p>React · JavaScript / JSX · CSS · Vite · GitHub · Vercel</p><small>EcoStack is an evolving student project. Current points and progress are session-based demonstration features.</small></div>
      </>
    );
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        {page === "Home" && <Home />}
        {page === "Dashboard" && <Dashboard />}
        {page === "Challenges" && <Challenges />}
        {page === "About" && <About />}
      </main>
      <footer className="footer">
        <button className="brand footer-brand" onClick={() => navigate("Home")}><span className="brand-icon">🌿</span><span>eco<span className="brand-light">stack</span><small>YOUR GREENER CAMPUS</small></span></button>
        <p>Build a Greener Tomorrow, One Choice at a Time.</p>
        <div className="footer-links">{navItems.map((item) => <button key={item} onClick={() => navigate(item)}>{item}</button>)}</div>
        <div className="footer-bottom"><span>© EcoStack · Student sustainability project</span><span>Made for a greener tomorrow 🌍</span></div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
