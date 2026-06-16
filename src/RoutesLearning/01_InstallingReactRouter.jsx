// ============================================================
// TOPIC: Installing React Router v6
// ============================================================
// React Router is a library that lets you build multi-page
// experiences inside a single React app (SPA - Single Page App).
//
// Without React Router:
//   → You only have one "page" — App.jsx
//   → URL never changes, no back/forward button support
//
// With React Router:
//   → /          → Home page
//   → /quiz       → Quiz list page
//   → /quiz/1     → Quiz detail page
//   → /results    → Results page
//   → All still inside ONE React app — no full page reload!
//
// ============================================================
// STEP 1: Install the package
// Run this in your terminal inside your Vite project folder:
//
//   npm install react-router-dom
//
// That's it! One package: react-router-dom
// (react-router-dom is the web version of React Router)
// ============================================================
// STEP 2: Check your package.json — you should see:
//
//   "dependencies": {
//     "react": "^18.x.x",
//     "react-dom": "^18.x.x",
//     "react-router-dom": "^6.x.x"   ← this was added
//   }
//
// ============================================================
// STEP 3: Planned Quiz App Pages & their URLs
//
//   URL                  Page / Component
//   ----------------     -----------------------
//   /                    HomePage       (welcome screen)
//   /quiz                QuizListPage   (all quizzes)
//   /quiz/:id            QuizPage       (a single quiz by ID)
//   /results/:id         ResultsPage    (score after quiz)
//   /leaderboard         LeaderboardPage
//   *  (anything else)   NotFoundPage   (404)
//
// ============================================================

// This file is a reference / setup guide.
// The actual Router code starts in 02_BrowserRouter.jsx

function InstallGuide() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <h2>React Router v6 — Installation</h2>

      <div style={box("#e8f5e9")}>
        <h4>✅ Install Command</h4>
        <code style={code}>npm install react-router-dom</code>
      </div>

      <div style={box("#e3f2fd")}>
        <h4>📁 Quiz App Pages We Will Build</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={th}>URL</th>
              <th style={th}>Component</th>
              <th style={th}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["/",              "HomePage",        "Welcome / Start screen"],
              ["/quiz",          "QuizListPage",    "Browse all quizzes"],
              ["/quiz/:id",      "QuizPage",        "Play a specific quiz"],
              ["/results/:id",   "ResultsPage",     "See score after quiz"],
              ["/leaderboard",   "LeaderboardPage", "Top scores"],
              ["* (any other)",  "NotFoundPage",    "404 — page not found"],
            ].map(([url, comp, desc]) => (
              <tr key={url}>
                <td style={td}><code>{url}</code></td>
                <td style={td}>{comp}</td>
                <td style={td}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={box("#fff3e0")}>
        <h4>📦 What react-router-dom gives you</h4>
        <ul style={{ fontSize: "14px" }}>
          <li><code>BrowserRouter</code> — wraps your whole app, enables routing</li>
          <li><code>Routes + Route</code> — defines which component shows at which URL</li>
          <li><code>Link / NavLink</code> — navigation without page reload</li>
          <li><code>useNavigate</code> — navigate programmatically in JS code</li>
          <li><code>useParams</code> — read URL parameters like <code>:id</code></li>
        </ul>
      </div>
    </div>
  );
}

// Shared mini styles
const box = (bg) => ({ background: bg, padding: "14px 16px", borderRadius: "8px", marginBottom: "14px" });
const code = { display: "block", background: "#263238", color: "#80cbc4", padding: "10px 14px", borderRadius: "6px", fontSize: "15px", marginTop: "8px" };
const th = { textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #ddd" };
const td = { padding: "6px 10px", borderBottom: "1px solid #f0f0f0", fontSize: "13px" };

export default InstallGuide;
