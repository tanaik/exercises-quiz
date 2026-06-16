// ============================================================
// TOPIC: BrowserRouter, Routes, Route — Core Router Setup
// ============================================================
// These three are the foundation of React Router.
//
//  BrowserRouter  → wraps the ENTIRE app. Enables routing.
//                   Put it once in main.jsx (or App.jsx).
//
//  Routes         → a container that looks at the current URL
//                   and renders the FIRST matching Route.
//
//  Route          → maps a URL path to a component.
//                   path="/quiz"  →  element={<QuizListPage />}
//
// Think of Routes as a switch statement for URLs:
//   if (url === "/")       render <HomePage />
//   if (url === "/quiz")   render <QuizListPage />
//   ...
// ============================================================
//
// FILE STRUCTURE for our Quiz App:
//
//   src/
//   ├── main.jsx              ← wrap app with BrowserRouter here
//   ├── App.jsx               ← define all Routes here
//   └── pages/
//       ├── HomePage.jsx
//       ├── QuizListPage.jsx
//       ├── QuizPage.jsx
//       ├── ResultsPage.jsx
//       ├── LeaderboardPage.jsx
//       └── NotFoundPage.jsx
//
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";


// ── STEP 1: Stub page components (each will be its own file) ─
// These are placeholder components — we'll build each fully later.

function HomePage() {
  return (
    <div style={pageStyle}>
      <h1>🧠 QuizMaster</h1>
      <p>Welcome! Test your knowledge with our quizzes.</p>
    </div>
  );
}

function QuizListPage() {
  return (
    <div style={pageStyle}>
      <h2>All Quizzes</h2>
      <p>Browse and pick a quiz to start.</p>
    </div>
  );
}

function QuizPage() {
  return (
    <div style={pageStyle}>
      <h2>Quiz Questions</h2>
      <p>This page will show quiz questions for a specific quiz ID.</p>
    </div>
  );
}

function ResultsPage() {
  return (
    <div style={pageStyle}>
      <h2>Your Results</h2>
      <p>Score and review will appear here after finishing.</p>
    </div>
  );
}

function LeaderboardPage() {
  return (
    <div style={pageStyle}>
      <h2>🏆 Leaderboard</h2>
      <p>Top scorers will be listed here.</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div style={pageStyle}>
      <h2>404 — Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}


// ── STEP 2: App.jsx — define all routes ─────────────────────
function App() {
  return (
    // Routes container — renders the FIRST path that matches the URL
    <Routes>

      {/* exact path "/" → HomePage */}
      <Route path="/"             element={<HomePage />} />

      {/* "/quiz" → QuizListPage */}
      <Route path="/quiz"         element={<QuizListPage />} />

      {/* "/quiz/1" or "/quiz/42" → QuizPage (:id is a URL param) */}
      <Route path="/quiz/:id"     element={<QuizPage />} />

      {/* "/results/1" → ResultsPage */}
      <Route path="/results/:id"  element={<ResultsPage />} />

      {/* "/leaderboard" → LeaderboardPage */}
      <Route path="/leaderboard"  element={<LeaderboardPage />} />

      {/* "*" catches ALL unmatched URLs → 404 page */}
      <Route path="*"             element={<NotFoundPage />} />

    </Routes>
  );
}


// ── STEP 3: main.jsx — wrap App with BrowserRouter ──────────
// BrowserRouter must be the OUTERMOST wrapper.
// This is what your actual main.jsx should look like:

/*
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ← import
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>    ← wraps everything
      <App />          ← App contains all <Routes>
    </BrowserRouter>
  </React.StrictMode>
);
*/

// For this demo file, we wrap App directly here:
function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;


// ============================================================
// KEY CONCEPT SUMMARY
// ============================================================
//
//  BrowserRouter   → Enable routing (wrap once in main.jsx)
//  Routes          → Container — renders first matching Route
//  Route           → Maps path to a component
//
//  <Route path="/quiz/:id" element={<QuizPage />} />
//                    ↑ :id is a dynamic segment (URL param)
//                    → /quiz/1, /quiz/2, /quiz/99 all match
//
//  Order matters in Routes:
//    Put specific paths BEFORE wildcard paths
//    Put path="*" LAST (it matches everything)
//
//  In v6 Routes is smarter than v5 Switch:
//    → No need for "exact" prop (v6 is exact by default)
//    → Picks the BEST match, not just the first match
//
// ============================================================

const pageStyle = {
  maxWidth: "600px", margin: "40px auto", padding: "20px",
  fontFamily: "sans-serif", textAlign: "center",
};
