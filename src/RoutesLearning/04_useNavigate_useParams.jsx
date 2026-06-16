// ============================================================
// TOPIC: useNavigate and useParams — Router Hooks
// ============================================================
//
//  useParams
//  → Reads dynamic segments from the URL.
//  → Route: path="/quiz/:id"
//  → URL:   /quiz/2
//  → Hook:  const { id } = useParams()  → id = "2"
//
//  useNavigate
//  → Navigates programmatically (in JS code, not JSX).
//  → Like Link but called from a function, not a click on a tag.
//  → Used after: form submit, quiz finish, login success, etc.
//
// ============================================================
//
// QUIZ APP CONTEXT:
//
//  useParams  → QuizPage reads :id to know WHICH quiz to show
//               ResultsPage reads :id to show correct results
//
//  useNavigate → After finishing all questions, automatically
//                navigate to /results/:id without user clicking
//
// ============================================================

import { BrowserRouter, Routes, Route, Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";


// ── useParams: QuizPage reads which quiz is active ───────────
function QuizPage() {
  // useParams reads the ":id" from the URL
  // If URL is /quiz/2 → params.id = "2" (always a string)
  const { id } = useParams();

  // Quiz data (in a real app this would come from an API)
  const quizzes = {
    1: {
      title: "JavaScript Basics",
      questions: [
        { q: "What does 'var' stand for?",               options: ["Variable", "Value", "Variant", "Vector"],       answer: 0 },
        { q: "Which method adds an item to an array?",   options: ["push()", "add()", "insert()", "append()"],      answer: 0 },
        { q: "What does '===' check?",                    options: ["Value only", "Type only", "Value and type", "None"], answer: 2 },
      ],
    },
    2: {
      title: "React Fundamentals",
      questions: [
        { q: "What hook manages state?",                  options: ["useEffect", "useState", "useRef", "useContext"], answer: 1 },
        { q: "What does JSX stand for?",                  options: ["JS XML", "JS Extra", "Java Syntax", "None"],    answer: 0 },
        { q: "Props are ___?",                            options: ["Mutable", "Read-only", "Optional", "Arrays"],   answer: 1 },
      ],
    },
  };

  const navigate = useNavigate(); // for navigation after quiz ends

  const quiz = quizzes[id]; // look up quiz using the URL id

  const [currentQ, setCurrentQ]   = useState(0);
  const [score, setScore]          = useState(0);
  const [selected, setSelected]    = useState(null); // which option user picked

  // If the quiz id doesn't exist, show an error
  if (!quiz) {
    return (
      <div style={pageStyle}>
        <h2>Quiz #{id} not found!</h2>
        <Link to="/quiz" style={linkStyle}>← Back to Quizzes</Link>
      </div>
    );
  }

  const question = quiz.questions[currentQ];

  function handleAnswer(optionIndex) {
    setSelected(optionIndex);

    // Check if answer is correct
    const isCorrect = optionIndex === question.answer;
    const newScore  = isCorrect ? score + 1 : score;

    setTimeout(() => {
      if (currentQ + 1 < quiz.questions.length) {
        // More questions remain — go to next
        setCurrentQ(currentQ + 1);
        setSelected(null);
        if (isCorrect) setScore(newScore);
      } else {
        // Quiz finished — useNavigate goes to results page
        // navigate() is called INSIDE a function (not in JSX)
        // This is why we need useNavigate — Link can't do this
        if (isCorrect) setScore(newScore); // ensure last answer counted
        navigate(`/results/${id}`, {
          // Pass score via "state" — available on the next page
          state: { score: newScore, total: quiz.questions.length, title: quiz.title },
        });
      }
    }, 700); // short delay so user sees the highlight before moving on
  }

  // Option button color: green if correct, red if wrong (after selecting)
  function optionColor(index) {
    if (selected === null) return "#fff";
    if (index === question.answer) return "#d4edda"; // correct → green
    if (index === selected)        return "#f8d7da"; // wrong pick → red
    return "#fff";
  }

  return (
    <div style={pageStyle}>
      {/* Quiz title + progress */}
      <p style={{ color: "#888", fontSize: "13px" }}>
        Quiz #{id} — {quiz.title}
      </p>
      <p style={{ fontSize: "13px", color: "#534AB7", fontWeight: "600" }}>
        Question {currentQ + 1} of {quiz.questions.length}
      </p>

      {/* Progress bar */}
      <div style={{ background: "#eee", borderRadius: "999px", height: "6px", marginBottom: "20px" }}>
        <div style={{
          background: "#534AB7", height: "6px", borderRadius: "999px",
          width: `${((currentQ) / quiz.questions.length) * 100}%`,
          transition: "width 0.3s",
        }} />
      </div>

      <h3>{question.q}</h3>

      {question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => selected === null && handleAnswer(i)} // prevent re-click
          style={{
            display: "block", width: "100%", textAlign: "left",
            padding: "12px 16px", margin: "8px 0",
            borderRadius: "8px", border: "1px solid #ddd",
            background: optionColor(i), cursor: selected ? "default" : "pointer",
            fontSize: "14px", transition: "background 0.3s",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}


// ── useParams + useNavigate: ResultsPage ─────────────────────
function ResultsPage() {
  const { id }     = useParams();       // quiz id from URL
  const navigate   = useNavigate();     // to navigate back

  // In a real app, score comes from location.state (passed by navigate())
  // For this demo we show a placeholder
  const score = 2;
  const total = 3;
  const percentage = Math.round((score / total) * 100);

  return (
    <div style={{ ...pageStyle, textAlign: "center" }}>
      <h2>Quiz #{id} — Results</h2>
      <div style={{ fontSize: "56px", margin: "16px 0" }}>
        {percentage >= 70 ? "🎉" : "📚"}
      </div>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {score} / {total}  ({percentage}%)
      </p>
      <p style={{ color: percentage >= 70 ? "green" : "#e65100" }}>
        {percentage >= 70 ? "Great job! You passed!" : "Keep practicing!"}
      </p>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        {/* useNavigate: go back to quiz programmatically */}
        <button
          onClick={() => navigate(`/quiz/${id}`)}  // retry same quiz
          style={btnStyle}
        >
          Retry Quiz
        </button>

        {/* navigate(-1) = go BACK in browser history (like back button) */}
        <button
          onClick={() => navigate(-1)}
          style={{ ...btnStyle, background: "#fff", color: "#534AB7", border: "1px solid #534AB7" }}
        >
          ← Back
        </button>

        <button
          onClick={() => navigate("/quiz")}        // go to quiz list
          style={{ ...btnStyle, background: "#28a745" }}
        >
          All Quizzes
        </button>
      </div>
    </div>
  );
}


// ── Supporting pages ─────────────────────────────────────────
function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ ...pageStyle, textAlign: "center" }}>
      <h1>🧠 QuizMaster</h1>
      <p>Test your knowledge. Beat your score. Climb the leaderboard.</p>
      {/* useNavigate in an onClick — same as <Link to="/quiz"> but programmatic */}
      <button onClick={() => navigate("/quiz")} style={btnStyle}>
        Start a Quiz
      </button>
    </div>
  );
}

function QuizListPage() {
  const navigate = useNavigate();
  const quizzes  = [
    { id: 1, title: "JavaScript Basics",   questions: 3 },
    { id: 2, title: "React Fundamentals",  questions: 3 },
  ];

  return (
    <div style={pageStyle}>
      <h2>All Quizzes</h2>
      {quizzes.map((q) => (
        <div key={q.id} style={cardStyle}>
          <div>
            <strong>{q.title}</strong>
            <p style={{ fontSize: "13px", color: "#888", margin: "2px 0 0" }}>{q.questions} questions</p>
          </div>
          {/* useNavigate on button click — navigates to /quiz/1 or /quiz/2 */}
          <button onClick={() => navigate(`/quiz/${q.id}`)} style={btnStyle}>
            Start →
          </button>
        </div>
      ))}
    </div>
  );
}

function Navbar() {
  const navStyle = ({ isActive }) => ({
    textDecoration: "none", padding: "8px 14px", borderRadius: "6px",
    background: isActive ? "#534AB7" : "transparent",
    color:      isActive ? "white"   : "#333",
  });
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "#f8f9fa", borderBottom: "1px solid #e0e0e0" }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "18px", textDecoration: "none", color: "#534AB7", marginRight: "auto" }}>🧠 QuizMaster</Link>
      <NavLink to="/" style={navStyle} end>Home</NavLink>
      <NavLink to="/quiz" style={navStyle}>Quizzes</NavLink>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/quiz"       element={<QuizListPage />} />
        <Route path="/quiz/:id"   element={<QuizPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
        <Route path="*"           element={<div style={pageStyle}><h2>404 — Not Found</h2><Link to="/">Go Home</Link></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// ============================================================
// KEY CONCEPT SUMMARY
// ============================================================
//
//  useParams:
//    Route:  path="/quiz/:id"
//    URL:    /quiz/2
//    Usage:  const { id } = useParams()  → id = "2" (string)
//
//  useNavigate:
//    const navigate = useNavigate()
//    navigate("/quiz")       → go to /quiz
//    navigate("/quiz/3")     → go to /quiz/3
//    navigate(-1)            → go BACK (browser history)
//    navigate("/results/2", { state: { score: 8 } }) → pass data
//
//  When to use Link vs useNavigate:
//    <Link>         → user clicks a visible link in JSX
//    useNavigate()  → navigate after an event (quiz done,
//                     form submit, login success, timer end)
//
// ============================================================

const pageStyle = { maxWidth: "560px", margin: "30px auto", padding: "20px", fontFamily: "sans-serif" };
const btnStyle  = { padding: "10px 20px", background: "#534AB7", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px" };
const linkStyle = { color: "#534AB7", textDecoration: "none" };
const cardStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "14px 16px", marginBottom: "10px", background: "#fff" };
