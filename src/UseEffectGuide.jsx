// ============================================================
//  UseEffectGuide.jsx
//  A complete reference on the React useEffect Hook
// ============================================================

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
//  DEFINITION
//  useEffect is a React Hook that lets you perform SIDE EFFECTS
//  inside functional components.
//
//  A "side effect" is anything that reaches outside the component:
//    • Fetching data from an API
//    • Setting up event listeners / timers
//    • Manually updating the DOM
//    • Subscribing to external stores
//
//  It replaces the class lifecycle methods:
//    componentDidMount + componentDidUpdate + componentWillUnmount
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
//  SYNTAX
//
//  useEffect(setupFn, dependencyArray?)
//
//  setupFn        → function that contains your side-effect logic.
//                   It may OPTIONALLY return a "cleanup" function.
//
//  dependencyArray (optional):
//    []            → run ONCE after the first render (mount only)
//    [a, b]        → run whenever 'a' or 'b' change
//    omitted       → run after EVERY render (use with care)
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
//  BEHAVIOUR  (execution order)
//
//  1. React renders the component (paints the UI).
//  2. After the browser finishes painting, React runs useEffect.
//  3. On the NEXT render, React first runs the CLEANUP function
//     returned from the previous effect, then runs the new effect.
//  4. On UNMOUNT, React runs the cleanup function one last time.
//
//  Key point: effects run ASYNCHRONOUSLY after paint, so they
//  never block the browser from displaying the UI.
// ─────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════
//  EXAMPLE 1 — No dependency array (runs after every render)
// ══════════════════════════════════════════════════════════════
function Example1_EveryRender() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This runs after the initial render AND after every update.
    // Useful for syncing with something that must always be current.
    document.title = `Count is ${count}`;

    // No cleanup needed here; we are simply updating the title.
  }); // ← no dependency array

  return (
    <div className="card">
      <h2>Example 1 — Runs after every render</h2>
      <p>Count: <strong>{count}</strong></p>
      <p style={{ fontSize: 13, color: "#888" }}>
        (Check the browser tab title — it syncs with count)
      </p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
//  EXAMPLE 2 — Empty array [] (runs once on mount)
// ══════════════════════════════════════════════════════════════
function Example2_OnMount() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Equivalent to componentDidMount.
    // Ideal for one-time setup: API calls, subscriptions, etc.

    async function fetchData() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // No cleanup needed — fetch resolves once and we're done.
  }, []); // ← empty array = run only once after first render

  return (
    <div className="card">
      <h2>Example 2 — Runs once on mount (data fetch)</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <p><strong>Title:</strong> {data?.title}</p>
          <p><strong>Body:</strong> {data?.body}</p>
        </>
      )}
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
//  EXAMPLE 3 — Specific dependency [value] (runs on change)
// ══════════════════════════════════════════════════════════════
function Example3_OnDependencyChange() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This effect re-runs ONLY when 'userId' changes.
    // Equivalent to componentDidUpdate with a specific prop check.

    setUser(null); // clear old user while new one loads

    async function fetchUser() {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const json = await res.json();
      setUser(json);
    }

    fetchUser();
  }, [userId]); // ← re-run whenever userId changes

  return (
    <div className="card">
      <h2>Example 3 — Runs when dependency changes</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[1, 2, 3, 4, 5].map(id => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{ fontWeight: userId === id ? "bold" : "normal" }}
          >
            User {id}
          </button>
        ))}
      </div>
      {user ? (
        <p style={{ marginTop: 12 }}>
          <strong>{user.name}</strong> — {user.email}
        </p>
      ) : (
        <p>Loading user…</p>
      )}
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
//  EXAMPLE 4 — Cleanup function (timer / interval)
// ══════════════════════════════════════════════════════════════
function Example4_CleanupTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return; // do nothing if timer is paused

    // Start an interval when 'running' becomes true.
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // CLEANUP — React calls this:
    //   a) Before running this effect again (on next render)
    //   b) When the component unmounts
    // Without cleanup, each render would add a NEW interval → memory leak!
    return () => {
      clearInterval(intervalId);
    };
  }, [running]); // ← re-run when running changes

  return (
    <div className="card">
      <h2>Example 4 — Cleanup: timer with interval</h2>
      <p style={{ fontSize: 32, fontWeight: "bold" }}>{seconds}s</p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setRunning(r => !r)}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setRunning(false); setSeconds(0); }}>
          Reset
        </button>
      </div>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
//  EXAMPLE 5 — Cleanup function (event listener)
// ══════════════════════════════════════════════════════════════
function Example5_CleanupEventListener() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Attach a global mousemove listener once on mount.
    function handleMouseMove(e) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup: remove the listener when the component unmounts.
    // Without this, the handler keeps firing even after the
    // component is gone — a classic memory leak.
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // ← mount only

  return (
    <div className="card">
      <h2>Example 5 — Cleanup: event listener</h2>
      <p>Move your mouse anywhere on the page.</p>
      <p>
        X: <strong>{mousePos.x}</strong> &nbsp;|&nbsp; Y:{" "}
        <strong>{mousePos.y}</strong>
      </p>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
//  EXAMPLE 6 — Using useRef to avoid stale closure
// ══════════════════════════════════════════════════════════════
function Example6_StaleClosureFix() {
  const [count, setCount] = useState(0);

  // useRef stores a mutable value that doesn't trigger re-renders.
  // We use it here so the setTimeout callback always sees the
  // latest count, avoiding the "stale closure" problem.
  const countRef = useRef(count);
  countRef.current = count; // keep ref in sync on every render

  useEffect(() => {
    const timeout = setTimeout(() => {
      // countRef.current is always up-to-date.
      alert(`Delayed alert — count was: ${countRef.current}`);
    }, 3000);

    return () => clearTimeout(timeout); // cleanup on unmount / re-run
  }, []); // ← only set the timeout once

  return (
    <div className="card">
      <h2>Example 6 — Avoiding stale closure with useRef</h2>
      <p>
        A 3-second alert will show the <em>current</em> count even though the
        effect only ran once.
      </p>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(c => c + 1)}>Increment fast!</button>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
//  ADVANTAGES
//
//  ✅  Combines three lifecycle methods into one mental model.
//  ✅  Co-locates effect + its cleanup — easier to reason about.
//  ✅  Dependency array gives fine-grained control over when
//      the effect runs, preventing unnecessary re-execution.
//  ✅  Works with async patterns (fetchData pattern shown above).
//  ✅  Encourages extracting reusable logic into custom hooks.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
//  USE CASES
//
//  1. Data fetching          — call an API on mount or when params change
//  2. DOM manipulation       — update document.title, focus elements
//  3. Subscriptions          — WebSocket, Redux store, Firebase listener
//  4. Timers & Intervals     — setInterval / setTimeout with cleanup
//  5. Event listeners        — window resize, scroll, keydown etc.
//  6. Animations             — trigger CSS transitions after render
//  7. Logging / Analytics    — fire tracking event on page view
//  8. Local storage sync     — persist state to localStorage on change
// ─────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════
//  ROOT COMPONENT — renders all examples together
// ══════════════════════════════════════════════════════════════
export default function UseEffectGuide() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          <span style={styles.hook}>useEffect</span> — Complete Guide
        </h1>
        <p style={styles.subtitle}>
          Definition · Syntax · Behaviour · Examples · Advantages · Use Cases
        </p>
      </header>

      {/* ── Quick-reference summary ── */}
      <section style={styles.summary}>
        <h2 style={styles.sectionTitle}>Quick Reference</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Dependency Array</th>
              <th style={styles.th}>When Effect Runs</th>
              <th style={styles.th}>Equivalent Class Method</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["omitted", "After every render", "componentDidUpdate (always)"],
              ["[ ]", "Once after first render", "componentDidMount"],
              ["[a, b]", "When a or b change", "componentDidUpdate (conditional)"],
            ].map(([dep, when, eq]) => (
              <tr key={dep}>
                <td style={styles.tdCode}>{dep}</td>
                <td style={styles.td}>{when}</td>
                <td style={styles.td}>{eq}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── Live examples ── */}
      <section style={styles.examples}>
        <h2 style={styles.sectionTitle}>Live Examples</h2>
        <div style={styles.grid}>
          <Example1_EveryRender />
          <Example2_OnMount />
          <Example3_OnDependencyChange />
          <Example4_CleanupTimer />
          <Example5_CleanupEventListener />
          <Example6_StaleClosureFix />
        </div>
      </section>

      {/* ── Advantages ── */}
      <section style={styles.summary}>
        <h2 style={styles.sectionTitle}>Advantages</h2>
        <ul style={styles.list}>
          {[
            "Unifies componentDidMount, componentDidUpdate & componentWillUnmount into one API.",
            "Co-locates setup and cleanup logic — far easier to maintain.",
            "Dependency array provides precise, declarative control over re-execution.",
            "Composes naturally into custom hooks for reusable side-effect logic.",
            "Works seamlessly with async/await via the inner-function pattern.",
          ].map(adv => (
            <li key={adv} style={styles.listItem}>✅ {adv}</li>
          ))}
        </ul>
      </section>

      {/* ── Use cases ── */}
      <section style={styles.summary}>
        <h2 style={styles.sectionTitle}>Common Use Cases</h2>
        <ul style={styles.list}>
          {[
            "Data fetching — call an API on mount or when a parameter changes.",
            "DOM updates — sync document.title, focus elements, measure layout.",
            "Subscriptions — WebSocket, Firebase real-time listener, Redux store.",
            "Timers & intervals — setInterval / setTimeout with proper cleanup.",
            "Global event listeners — resize, scroll, keydown, mousemove.",
            "Animation triggers — kick off CSS transitions after render.",
            "Analytics / Logging — fire a page-view event after mount.",
            "LocalStorage sync — persist state across browser sessions.",
          ].map(uc => (
            <li key={uc} style={styles.listItem}>→ {uc}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════════════════════════
const styles = {
  page: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    maxWidth: 900,
    margin: "0 auto",
    padding: "24px 16px 64px",
    color: "#1a1a2e",
    background: "#f0f4ff",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    padding: "40px 0 32px",
  },
  title: {
    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
    fontWeight: 800,
    margin: 0,
  },
  hook: {
    background: "linear-gradient(135deg, #6c63ff, #3ecfcf)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#555",
    marginTop: 8,
    fontSize: 15,
    letterSpacing: "0.04em",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    marginBottom: 16,
    color: "#2d2d6e",
    borderLeft: "4px solid #6c63ff",
    paddingLeft: 10,
  },
  summary: {
    background: "#fff",
    borderRadius: 12,
    padding: "24px 28px",
    marginBottom: 24,
    boxShadow: "0 2px 12px rgba(108,99,255,0.08)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  th: {
    background: "#6c63ff",
    color: "#fff",
    padding: "10px 14px",
    textAlign: "left",
    fontWeight: 600,
  },
  td: {
    padding: "10px 14px",
    borderBottom: "1px solid #eef",
    color: "#333",
  },
  tdCode: {
    padding: "10px 14px",
    borderBottom: "1px solid #eef",
    fontFamily: "monospace",
    fontWeight: 700,
    color: "#6c63ff",
  },
  examples: {
    marginBottom: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
    gap: 20,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "8px 0",
    borderBottom: "1px solid #f0f0fa",
    fontSize: 14,
    lineHeight: 1.6,
  },
};

// ─── Card styles injected globally for the example components ───
const cardStyle = document.createElement("style");
cardStyle.textContent = `
  .card {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px 22px;
    box-shadow: 0 2px 14px rgba(108,99,255,0.10);
    border-top: 3px solid #6c63ff;
  }
  .card h2 {
    margin: 0 0 12px;
    font-size: 0.95rem;
    color: #2d2d6e;
  }
  .card button {
    background: #6c63ff;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 7px 16px;
    cursor: pointer;
    font-size: 13px;
    margin-top: 8px;
    transition: background 0.2s;
  }
  .card button:hover { background: #5548e0; }
`;
document.head.appendChild(cardStyle);
