// ============================================================
// TOPIC: 404 Page / Catch-All Routes
// ============================================================
// A catch-all route uses path="*" to match ANY URL that
// didn't match any of your defined routes above it.
//
// React Router checks routes TOP TO BOTTOM.
// If nothing matches → path="*" catches it → show 404 page.
//
// ============================================================
//
// QUIZ APP CONTEXT:
//
//  Valid URLs:    /  /quiz  /quiz/1  /results/1  /leaderboard
//  Invalid URLs:  /quiz/abc  /random  /quiz/999  /admin
//
//  We handle TWO kinds of "not found":
//  1. Route not found    → path="*"    (URL doesn't exist)
//  2. Resource not found → quiz ID 999 doesn't exist in data
//     (URL is valid format but the data isn't there)
//
// ============================================================

import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, useParams, useNavigate } from "react-router-dom";


// ── TYPE 1: Route-level 404 — catch-all with path="*" ───────
// Shows when user visits any URL that has no matching Route

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ ...center, textAlign: "center", paddingTop: "40px" }}>

      {/* Big 404 visual */}
      <div style={{ fontSize: "80px", marginBottom: "8px" }}>🤔</div>
      <h1 style={{ fontSize: "48px", color: "#534AB7", margin: "0" }}>404</h1>
      <h2 style={{ color: "#333" }}>Page Not Found</h2>
      <p style={{ color: "#888", marginBottom: "24px" }}>
        Looks like this quiz page doesn't exist — or the URL might have a typo.
      </p>

      {/* Helpful actions */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => navigate(-1)} style={{ ...btn, background: "#fff", color: "#534AB7", border: "1px solid #534AB7" }}>
          ← Go Back
        </button>
        <button onClick={() => navigate("/")} style={btn}>
          Home
        </button>
        <button onClick={() => navigate("/quiz")} style={{ ...btn, background: "#28a745" }}>
          Browse Quizzes
        </button>
      </div>

      {/* Suggest valid links */}
      <div style={{ marginTop: "32px", background: "#f8f9fa", padding: "16px", borderRadius: "10px", textAlign: "left", display: "inline-block" }}>
        <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "8px" }}>Try these instead:</p>
        {[
          { to: "/",            label: "🏠 Home" },
          { to: "/quiz",        label: "📋 All Quizzes" },
          { to: "/quiz/1",      label: "📝 JavaScript Quiz" },
          { to: "/quiz/2",      label: "📝 React Quiz" },
          { to: "/leaderboard", label: "🏆 Leaderboard" },
        ].map(({ to, label }) => (
          <div key={to}>
            <Link to={to} style={{ color: "#534AB7", textDecoration: "none", fontSize: "14px", lineHeight: "2" }}>
              {label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}


// ── TYPE 2: Resource-level "Not Found" inside a valid route ──
// URL format is valid (/quiz/:id) but the quiz ID doesn't exist.
// This is NOT a 404 route — the Route matched — but data is missing.

function QuizPage() {
  const { id }   = useParams();
  const navigate = useNavigate();

  // Our quiz database (in a real app, this comes from an API)
  const quizzes = {
    1: { title: "JavaScript Basics",  questions: [{ q: "What is JSX?", options: ["JS XML", "Java", "Script", "None"], answer: 0 }] },
    2: { title: "React Fundamentals", questions: [{ q: "useState returns?", options: ["Object", "Array", "String", "Number"], answer: 1 }] },
  };

  const quiz = quizzes[id]; // try to find the quiz

  // ── If quiz ID doesn't exist → inline "not found" state ──
  if (!quiz) {
    return (
      <div style={{ ...center, textAlign: "center", paddingTop: "40px" }}>
        <div style={{ fontSize: "60px" }}>😕</div>
        <h2>Quiz #{id} Not Found</h2>
        <p style={{ color: "#888" }}>
          This quiz ID doesn't exist. It may have been removed or never created.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button onClick={() => navigate("/quiz")} style={btn}>
            Browse Available Quizzes
          </button>
          <button onClick={() => navigate(-1)} style={{ ...btn, background: "#fff", color: "#534AB7", border: "1px solid #534AB7" }}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Normal quiz rendering when it exists
  const q = quiz.questions[0];
  return (
    <div style={center}>
      <p style={{ color: "#888", fontSize: "13px" }}>Quiz #{id} · {quiz.title}</p>
      <h3>{q.q}</h3>
      {q.options.map((opt, i) => (
        <button key={i} style={{
          display: "block", width: "100%", textAlign: "left",
          padding: "12px 16px", margin: "8px 0",
          borderRadius: "8px", border: "1px solid #ddd",
          background: "#fff", cursor: "pointer", fontSize: "14px",
        }}>
          {opt}
        </button>
      ))}
    </div>
  );
}


// ── LAYOUT + PAGES ────────────────────────────────────────────
function Layout() {
  const navStyle = ({ isActive }) => ({
    textDecoration: "none", padding: "8px 14px", borderRadius: "6px",
    background: isActive ? "#534AB7" : "transparent",
    color:      isActive ? "white"   : "#333",
  });
  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh" }}>
      <nav style={{ display: "flex", gap: "8px", padding: "14px 28px", background: "#fff", borderBottom: "1px solid #e0e0e0", alignItems: "center" }}>
        <Link to="/" style={{ fontWeight: "bold", fontSize: "18px", textDecoration: "none", color: "#534AB7", marginRight: "auto" }}>🧠 QuizMaster</Link>
        <NavLink to="/"   style={navStyle} end>Home</NavLink>
        <NavLink to="/quiz" style={navStyle}>Quizzes</NavLink>
        <NavLink to="/leaderboard" style={navStyle}>Leaderboard</NavLink>
      </nav>
      <div style={{ padding: "24px" }}>
        <Outlet />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div style={{ ...center, textAlign: "center" }}>
      <h1>🧠 QuizMaster</h1>
      <p>Try visiting <code>/quiz/999</code> or <code>/random</code> to see the 404 pages!</p>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/quiz" style={{ ...btn, textDecoration: "none" }}>Valid: /quiz</Link>
        <Link to="/quiz/1" style={{ ...btn, textDecoration: "none", background: "#28a745" }}>Valid: /quiz/1</Link>
        <Link to="/quiz/999" style={{ ...btn, textDecoration: "none", background: "#e65100" }}>Bad ID: /quiz/999</Link>
        <Link to="/random-page" style={{ ...btn, textDecoration: "none", background: "#c62828" }}>Bad route: /random</Link>
      </div>
    </div>
  );
}

function QuizListPage() {
  return (
    <div style={center}>
      <h2>All Quizzes</h2>
      {[1, 2].map(id => (
        <div key={id} style={{ border: "1px solid #e0e0e0", borderRadius: "8px", padding: "12px 16px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Quiz #{id}</span>
          <Link to={`/quiz/${id}`} style={{ ...btn, textDecoration: "none", padding: "6px 14px", fontSize: "13px" }}>Start</Link>
        </div>
      ))}
    </div>
  );
}

function LeaderboardPage() {
  return <div style={center}><h2>🏆 Leaderboard</h2><p>Coming soon...</p></div>;
}


// ── ROUTE SETUP — catch-all must be LAST ────────────────────
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index              element={<HomePage />} />
          <Route path="quiz"        element={<QuizListPage />} />
          <Route path="quiz/:id"    element={<QuizPage />} />        {/* handles /quiz/999 internally */}
          <Route path="leaderboard" element={<LeaderboardPage />} />

          {/* path="*" MUST be last — catches everything else */}
          <Route path="*"           element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// ============================================================
// KEY CONCEPT SUMMARY
// ============================================================
//
//  Two types of "not found" in a React app:
//
//  TYPE 1 — Route not found (URL doesn't match any Route):
//    <Route path="*" element={<NotFoundPage />} />
//    → Always put path="*" LAST in your Routes
//    → React Router checks all routes top-to-bottom
//    → If nothing matches, path="*" catches it
//
//  TYPE 2 — Resource not found (URL is valid, data isn't):
//    /quiz/:id  matches for ANY id, even /quiz/999
//    The Route renders QuizPage, but QuizPage checks if
//    the quiz actually exists and shows its own "not found" UI
//
//  path="*" placement rule:
//  <Routes>
//    <Route path="/"     element={...} />   ← specific first
//    <Route path="/quiz" element={...} />   ← specific first
//    <Route path="*"     element={<NotFoundPage />} />  ← LAST
//  </Routes>
//
// ============================================================

const center = { maxWidth: "560px", margin: "0 auto" };
const btn    = { padding: "10px 20px", background: "#534AB7", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" };
