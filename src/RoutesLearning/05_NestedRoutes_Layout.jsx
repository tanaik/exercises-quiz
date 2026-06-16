// ============================================================
// TOPIC: Nested Routes and Layouts
// ============================================================
// Nested routes let you render a CHILD route's component
// INSIDE a PARENT route's component.
//
// This is how you build a shared Layout — a wrapper that
// stays constant (Navbar, Sidebar, Footer) while only the
// inner content changes based on the URL.
//
//   Layout (Navbar + Footer always visible)
//   └── <Outlet />   ← child route renders HERE
//       ├── /quiz         → QuizListPage
//       ├── /quiz/:id     → QuizPage
//       └── /leaderboard  → LeaderboardPage
//
// <Outlet /> is a placeholder — React Router replaces it
// with whichever child route matches the current URL.
//
// ============================================================
//
// QUIZ APP CONTEXT:
//
//  All quiz pages share: Navbar + Footer
//  But we don't want to copy <Navbar /> into every page.
//
//  Solution: A Layout component with <Outlet />.
//  The layout renders once. Child pages slot into <Outlet />.
//
// ============================================================

import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, useParams, useNavigate } from "react-router-dom";


// ── LAYOUT COMPONENT — shared wrapper for all pages ──────────
// This renders the Navbar and Footer ONCE.
// <Outlet /> is where the active child route appears.

function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>

      {/* NAVBAR — always visible on every page */}
      <Navbar />

      {/* MAIN CONTENT — <Outlet /> renders the matched child route */}
      <main style={{ flex: 1, padding: "24px 16px" }}>
        <Outlet />
        {/* When URL is /quiz      → <Outlet /> renders <QuizListPage /> */}
        {/* When URL is /quiz/2    → <Outlet /> renders <QuizPage />     */}
        {/* When URL is /results/2 → <Outlet /> renders <ResultsPage />  */}
      </main>

      {/* FOOTER — always visible on every page */}
      <Footer />
    </div>
  );
}


// ── NAVBAR ────────────────────────────────────────────────────
function Navbar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none", padding: "8px 14px", borderRadius: "6px",
    background: isActive ? "#534AB7" : "transparent",
    color:      isActive ? "white"   : "#333",
    fontWeight: isActive ? "600"     : "400",
    transition: "all 0.2s",
  });

  return (
    <nav style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "14px 28px", background: "#fff",
      borderBottom: "1px solid #e0e0e0",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "20px", textDecoration: "none", color: "#534AB7", marginRight: "auto" }}>
        🧠 QuizMaster
      </Link>
      <NavLink to="/"            style={linkStyle} end>Home</NavLink>
      <NavLink to="/quiz"        style={linkStyle}>Quizzes</NavLink>
      <NavLink to="/leaderboard" style={linkStyle}>Leaderboard</NavLink>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "16px 28px", textAlign: "center",
      background: "#f8f9fa", borderTop: "1px solid #e0e0e0",
      fontSize: "13px", color: "#888",
    }}>
      © 2025 QuizMaster — Built with React Router v6
    </footer>
  );
}


// ── PAGE COMPONENTS ───────────────────────────────────────────

function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ ...center, textAlign: "center" }}>
      <h1 style={{ fontSize: "36px" }}>🧠 QuizMaster</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Test your knowledge. Beat your score. Climb the leaderboard.
      </p>
      <button onClick={() => navigate("/quiz")} style={btn}>
        Browse Quizzes →
      </button>
    </div>
  );
}

function QuizListPage() {
  const navigate = useNavigate();
  const quizzes  = [
    { id: 1, title: "JavaScript Basics",   questions: 5, category: "Programming", color: "#fff3e0" },
    { id: 2, title: "React Fundamentals",  questions: 5, category: "Programming", color: "#e8f5e9" },
    { id: 3, title: "World Geography",     questions: 5, category: "General",     color: "#e3f2fd" },
  ];

  return (
    <div style={center}>
      <h2>All Quizzes</h2>
      <p style={{ color: "#888", marginBottom: "16px" }}>Pick a quiz to start</p>

      {quizzes.map((q) => (
        <div key={q.id} style={{
          background: q.color, borderRadius: "10px", padding: "16px",
          marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <strong>{q.title}</strong>
            <p style={{ fontSize: "13px", color: "#666", margin: "2px 0 0" }}>
              {q.questions} questions · {q.category}
            </p>
          </div>
          <button onClick={() => navigate(`/quiz/${q.id}`)} style={btn}>
            Start →
          </button>
        </div>
      ))}
    </div>
  );
}

function QuizPage() {
  const { id }   = useParams();
  const navigate = useNavigate();

  // Sample question for demo
  const question = { text: "What does JSX stand for?", options: ["Java Syntax X", "JavaScript XML", "JS Extension", "None"] };

  return (
    <div style={center}>
      <p style={{ color: "#888", fontSize: "13px" }}>Quiz #{id}</p>
      <div style={{ background: "#f8f9fa", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
        {/* Progress bar */}
        <div style={{ background: "#e0e0e0", borderRadius: "999px", height: "6px", marginBottom: "16px" }}>
          <div style={{ background: "#534AB7", width: "40%", height: "6px", borderRadius: "999px" }} />
        </div>
        <p style={{ fontSize: "13px", color: "#534AB7", fontWeight: "600" }}>Question 2 of 5</p>
        <h3>{question.text}</h3>
        {question.options.map((opt, i) => (
          <button key={i} style={{
            display: "block", width: "100%", textAlign: "left",
            padding: "12px 16px", margin: "8px 0", borderRadius: "8px",
            border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: "14px",
          }}>
            {opt}
          </button>
        ))}
      </div>
      <button onClick={() => navigate(`/results/${id}`)} style={{ ...btn, background: "#28a745" }}>
        Finish Quiz (Demo)
      </button>
    </div>
  );
}

function ResultsPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  return (
    <div style={{ ...center, textAlign: "center" }}>
      <h2>Results — Quiz #{id}</h2>
      <div style={{ fontSize: "60px", margin: "12px 0" }}>🎉</div>
      <p style={{ fontSize: "28px", fontWeight: "bold" }}>4 / 5</p>
      <p style={{ color: "green" }}>80% — Great job!</p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        <button onClick={() => navigate(`/quiz/${id}`)} style={btn}>Retry</button>
        <button onClick={() => navigate("/quiz")} style={{ ...btn, background: "#fff", color: "#534AB7", border: "1px solid #534AB7" }}>All Quizzes</button>
      </div>
    </div>
  );
}

function LeaderboardPage() {
  const leaders = [
    { rank: 1, name: "Ravi",  score: 98, quiz: "React Fundamentals" },
    { rank: 2, name: "Priya", score: 95, quiz: "JS Basics" },
    { rank: 3, name: "Arjun", score: 90, quiz: "World Geography" },
  ];
  return (
    <div style={center}>
      <h2>🏆 Leaderboard</h2>
      {leaders.map((l) => (
        <div key={l.rank} style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px", border: "1px solid #e0e0e0", borderRadius: "8px", marginBottom: "8px", background: "#fff" }}>
          <span style={{ fontSize: "24px" }}>{["🥇","🥈","🥉"][l.rank - 1]}</span>
          <div style={{ flex: 1 }}>
            <strong>{l.name}</strong>
            <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>{l.quiz}</p>
          </div>
          <strong style={{ color: "#534AB7" }}>{l.score}%</strong>
        </div>
      ))}
    </div>
  );
}


// ── ROUTE STRUCTURE: Nested under Layout ─────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout is the PARENT route — no path, always renders */}
        <Route path = 'employee' element={<Layout />}>

          {/* index = the default child when path is "/" */}
          <Route index            element={<HomePage />} />

          {/* These are CHILDREN of Layout — they render in <Outlet /> */}
          <Route path="quiz"      element={<QuizListPage />} />
          <Route path="quiz/:id"  element={<QuizPage />} />
          <Route path="results/:id" element={<ResultsPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />

          {/* 404 inside layout — still shows Navbar + Footer */}
          <Route path="*"         element={<NotFoundPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

function NotFoundPage() {
  return (
    <div style={{ ...center, textAlign: "center" }}>
      <h2>404 — Page Not Found</h2>
      <Link to="/" style={{ color: "#534AB7" }}>← Go Home</Link>
    </div>
  );
}

export default App;


// ============================================================
// KEY CONCEPT SUMMARY
// ============================================================
//
//  <Route element={<Layout />}>      ← parent route (wrapper)
//    <Route index element={<Home />} />   ← default child "/"
//    <Route path="quiz" element={<QuizListPage />} />
//    <Route path="quiz/:id" element={<QuizPage />} />
//  </Route>
//
//  Inside Layout, <Outlet /> is where child routes render.
//
//  Benefits:
//  ✓ Navbar and Footer defined ONCE in Layout
//  ✓ No copy-pasting <Navbar /> in every page component
//  ✓ Layout re-renders only its <Outlet />, not itself
//  ✓ Pages stay clean — just their own content, no wrappers
//
//  <Route index ...> = default child route (renders at "/")
//  (Instead of path="/" inside a nested route)
//
// ============================================================

const center  = { maxWidth: "560px", margin: "0 auto" };
const btn     = { padding: "10px 20px", background: "#534AB7", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" };
