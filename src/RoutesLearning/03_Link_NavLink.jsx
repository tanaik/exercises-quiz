// ============================================================
// TOPIC: Link and NavLink — Navigation Without Page Reload
// ============================================================
// In plain HTML you navigate with <a href="/about">
// Problem: <a href> causes a FULL browser page reload.
//          React state is lost. The whole app re-mounts.
//
// React Router gives you two components instead:
//
//  <Link>    → like <a>, but no page reload. Just swaps
//               the component rendered by <Routes>.
//
//  <NavLink> → same as Link BUT automatically adds an
//               "active" class/style when its path matches
//               the current URL. Perfect for nav menus.
//
// ============================================================
//
// QUIZ APP CONTEXT:
//   Navbar needs links to: Home | Quizzes | Leaderboard
//   The active link should be visually highlighted.
//   Quiz cards need a link to each quiz's detail page.
//
// ============================================================

import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";


// ── NAVBAR using NavLink ─────────────────────────────────────
// NavLink adds an "active" style when URL matches its `to` prop

function Navbar() {
  // NavLink's `style` prop can be a FUNCTION that receives { isActive }
  // React Router calls it automatically based on current URL
  const navLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: isActive ? "600" : "400",
    // Active link gets a filled background; inactive is transparent
    background:  isActive ? "#534AB7" : "transparent",
    color:       isActive ? "white"   : "#333",
    transition: "all 0.2s",
  });

  return (
    <nav style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "12px 24px", background: "#f8f9fa",
      borderBottom: "1px solid #e0e0e0",
    }}>
      {/* Brand / logo — link to home */}
      <Link
        to="/"
        style={{ fontWeight: "bold", fontSize: "18px", textDecoration: "none", color: "#534AB7", marginRight: "auto" }}
      >
        🧠 QuizMaster
      </Link>

      {/* NavLink — gets active style when URL matches `to` */}
      <NavLink to="/"            style={navLinkStyle} end>
        {/* "end" prop: only active on EXACT "/" — not on "/quiz" */}
        Home
      </NavLink>

      <NavLink to="/quiz"        style={navLinkStyle}>Quizzes</NavLink>
      <NavLink to="/leaderboard" style={navLinkStyle}>Leaderboard</NavLink>
    </nav>
  );
}


// ── QUIZ CARD using Link ──────────────────────────────────────
// Link navigates to the quiz detail page when the card is clicked

function QuizCard({ quiz }) {
  return (
    <div style={{
      border: "1px solid #e0e0e0", borderRadius: "10px",
      padding: "16px", marginBottom: "12px", background: "#fff",
    }}>
      <h3 style={{ margin: "0 0 6px" }}>{quiz.title}</h3>
      <p style={{ fontSize: "13px", color: "#666", margin: "0 0 12px" }}>
        {quiz.questions} questions · {quiz.category}
      </p>

      {/* Link navigates to /quiz/1, /quiz/2, etc. — NO page reload */}
      {/* `to` uses a template literal to include the quiz id */}
      <Link
        to={`/quiz/${quiz.id}`}
        style={{
          display: "inline-block",
          padding: "8px 18px",
          background: "#534AB7", color: "white",
          borderRadius: "6px", textDecoration: "none",
          fontSize: "14px",
        }}
      >
        Start Quiz →
      </Link>
    </div>
  );
}


// ── PAGE COMPONENTS ──────────────────────────────────────────

function HomePage() {
  return (
    <div style={pageStyle}>
      <h1>Welcome to QuizMaster 🧠</h1>
      <p>Challenge yourself with topic-wise quizzes!</p>

      {/* Link used inside page content — goes to /quiz */}
      <Link to="/quiz" style={btnStyle}>Browse All Quizzes</Link>
    </div>
  );
}

function QuizListPage() {
  const quizzes = [
    { id: 1, title: "JavaScript Basics",  questions: 10, category: "Programming" },
    { id: 2, title: "React Fundamentals", questions: 8,  category: "Programming" },
    { id: 3, title: "World Geography",    questions: 12, category: "General Knowledge" },
  ];

  return (
    <div style={{ ...pageStyle, textAlign: "left" }}>
      <h2>All Quizzes</h2>
      {quizzes.map((q) => (
        <QuizCard key={q.id} quiz={q} />
      ))}
    </div>
  );
}

function QuizPage() {
  return <div style={pageStyle}><h2>Quiz Questions Here</h2></div>;
}

function LeaderboardPage() {
  return (
    <div style={pageStyle}>
      <h2>🏆 Leaderboard</h2>
      <p>Top scorers will appear here.</p>

      {/* Link back to quiz list */}
      <Link to="/quiz" style={btnStyle}>Take a Quiz</Link>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div style={pageStyle}>
      <h2>404 — Not Found</h2>
      {/* Link back to safety */}
      <Link to="/" style={btnStyle}>Go Home</Link>
    </div>
  );
}


// ── ROOT APP ─────────────────────────────────────────────────
function App() {
  return (
    <BrowserRouter>
      {/* Navbar renders on EVERY page because it's outside <Routes> */}
      <Navbar />

      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/quiz"        element={<QuizListPage />} />
        <Route path="/quiz/:id"    element={<QuizPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="*"            element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// ============================================================
// KEY CONCEPT SUMMARY
// ============================================================
//
//  <a href="/quiz">        ← ✗ causes full page reload
//  <Link to="/quiz">       ← ✓ no reload, just swaps component
//  <NavLink to="/quiz">    ← ✓ same + auto active class/style
//
//  NavLink style as a function:
//    style={({ isActive }) => ({ color: isActive ? "blue" : "black" })}
//
//  NavLink className as a function:
//    className={({ isActive }) => isActive ? "active" : ""}
//
//  "end" prop on NavLink:
//    <NavLink to="/" end>   → only active on EXACT "/" URL
//    Without "end", "/" would be active on "/quiz" too
//    (because "/quiz" starts with "/")
//
// ============================================================

const pageStyle = { maxWidth: "600px", margin: "30px auto", padding: "20px", fontFamily: "sans-serif" };
const btnStyle  = { display: "inline-block", padding: "10px 20px", background: "#534AB7", color: "white", borderRadius: "8px", textDecoration: "none", marginTop: "12px" };
