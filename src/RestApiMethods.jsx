// ============================================================
//  RestApiMethods.jsx
//  A complete guide to calling REST APIs in React
//  Covers: fetch, axios, GET, POST, PUT, PATCH, DELETE
//  All explanations are written as comments inside the code
// ============================================================

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
//  WHAT IS A REST API CALL?
//
//  REST (Representational State Transfer) APIs communicate over
//  HTTP using standard methods (verbs):
//
//   GET    → Read / fetch data
//   POST   → Create a new resource
//   PUT    → Replace an existing resource completely
//   PATCH  → Update part of an existing resource
//   DELETE → Remove a resource
//
//  In React, you call REST APIs using one of these tools:
//   1. fetch()   — built into the browser, no install needed
//   2. axios     — popular third-party library with extras
//
//  BASE URL used in every example below:
const BASE_URL = "https://jsonplaceholder.typicode.com";
// ─────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════
//  METHOD 1 — fetch() API  (built-in browser Web API)
//
//  Syntax:
//    fetch(url, options?)
//
//  fetch() returns a Promise that resolves to a Response object.
//  You must call .json() on the response to parse the body.
//  fetch() does NOT throw on HTTP errors (4xx/5xx) — you must
//  manually check response.ok or response.status yourself.
// ══════════════════════════════════════════════════════════════

// ── GET with fetch ──────────────────────────────────────────
// GET: retrieve a list of posts from the server.
// No body is sent; data comes back in the response.
async function fetchGET() {
  const response = await fetch(`${BASE_URL}/posts?_limit=3`);

  // fetch only rejects on network failure, NOT on 4xx/5xx.
  // Always check response.ok (true when status is 200–299).
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // .json() is async — it reads and parses the response body.
  const data = await response.json();
  return data;
}

// ── POST with fetch ─────────────────────────────────────────
// POST: send a new resource to the server to be created.
// The body must be JSON-stringified and Content-Type must be set.
async function fetchPOST(payload) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",                           // HTTP verb
    headers: {
      "Content-Type": "application/json",     // tell server we're sending JSON
    },
    body: JSON.stringify(payload),            // convert JS object → JSON string
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();              // server returns the created object
}

// ── PUT with fetch ──────────────────────────────────────────
// PUT: replace an ENTIRE resource.
// All fields must be included — omitted fields get wiped.
async function fetchPUT(id, payload) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),           // send complete updated object
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

// ── PATCH with fetch ────────────────────────────────────────
// PATCH: update PART of a resource.
// Only send the fields you want to change.
async function fetchPATCH(id, partialPayload) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partialPayload),    // only the changed fields
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

// ── DELETE with fetch ───────────────────────────────────────
// DELETE: remove a resource by its ID.
// Usually no body is sent. Server returns 200 or 204 on success.
async function fetchDELETE(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  // Some servers return empty body on DELETE — handle both cases
  const text = await response.text();
  return text ? JSON.parse(text) : { deleted: true, id };
}


// ══════════════════════════════════════════════════════════════
//  METHOD 2 — axios  (third-party library)
//
//  Install: npm install axios
//  Import:  import axios from 'axios'
//
//  Differences from fetch():
//   ✅ Automatically parses JSON — no .json() call needed
//   ✅ Throws on HTTP 4xx/5xx errors — simpler error handling
//   ✅ Cleaner syntax for sending headers and bodies
//   ✅ Built-in request/response interceptors
//   ✅ Supports request cancellation with AbortController
//   ✅ Works in both browser AND Node.js
//
//  NOTE: In this demo we SIMULATE axios with fetch so no install
//  is needed. In a real project, replace with real axios calls.
// ══════════════════════════════════════════════════════════════

// ── How you'd write these with REAL axios ──────────────────
/*
import axios from 'axios';

// GET
const { data } = await axios.get(`${BASE_URL}/posts?_limit=3`);

// POST
const { data } = await axios.post(`${BASE_URL}/posts`, {
  title: 'Hello',
  body: 'World',
  userId: 1,
});

// PUT
const { data } = await axios.put(`${BASE_URL}/posts/1`, {
  id: 1,
  title: 'Updated Title',
  body: 'Updated body',
  userId: 1,
});

// PATCH
const { data } = await axios.patch(`${BASE_URL}/posts/1`, {
  title: 'Only title changed',
});

// DELETE
await axios.delete(`${BASE_URL}/posts/1`);
*/
// ─────────────────────────────────────────────────────────────


// ══════════════════════════════════════════════════════════════
//  COMMON PATTERNS
// ══════════════════════════════════════════════════════════════

// ── Pattern 1: async/await (recommended — clean and readable)
async function patternAsyncAwait() {
  try {
    const response = await fetch(`${BASE_URL}/posts/1`);
    if (!response.ok) throw new Error("Request failed");
    const data = await response.json();
    return data;
  } catch (error) {
    // Catches both network errors AND our manual throws
    console.error("Error:", error.message);
    throw error;
  }
}

// ── Pattern 2: Promise chaining (older style)
function patternPromiseChain() {
  return fetch(`${BASE_URL}/posts/1`)
    .then(res => {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    })
    .then(data => data)
    .catch(err => console.error("Error:", err));
}

// ── Pattern 3: AbortController (cancel in-flight requests)
// Critical when the user navigates away before a fetch finishes.
// Without aborting, the callback runs on an unmounted component
// → "Can't perform a React state update on an unmounted component"
function useAbortableData(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // create controller

    fetch(url, { signal: controller.signal }) // attach signal
      .then(r => r.json())
      .then(setData)
      .catch(err => {
        // AbortError is expected — not a real error
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort(); // cleanup: cancel on unmount
  }, [url]);

  return data;
}

// ── Pattern 4: Custom hook (reusable fetch logic)
// Encapsulates loading, error, and data states in one place.
function useFetch(url) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false; // prevent state update after unmount

    setState({ data: null, loading: true, error: null });

    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(error => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => { cancelled = true; };
  }, [url]);

  return state;
}


// ══════════════════════════════════════════════════════════════
//  UI DEMO COMPONENTS
// ══════════════════════════════════════════════════════════════

// Shared sub-components
function StatusBadge({ status }) {
  const colors = {
    idle:    { bg: "#e8eaf6", color: "#3949ab" },
    loading: { bg: "#fff3e0", color: "#e65100" },
    success: { bg: "#e8f5e9", color: "#2e7d32" },
    error:   { bg: "#ffebee", color: "#c62828" },
  };
  const s = colors[status] || colors.idle;
  return (
    <span style={{
      ...s, borderRadius: 20, padding: "2px 10px",
      fontSize: 12, fontWeight: 700, letterSpacing: "0.05em",
    }}>
      {status.toUpperCase()}
    </span>
  );
}

function ResponseBox({ data }) {
  if (!data) return null;
  return (
    <pre style={{
      background: "#0d1117", color: "#58d68d", borderRadius: 8,
      padding: "12px 14px", fontSize: 12, overflowX: "auto",
      marginTop: 12, maxHeight: 180, overflowY: "auto",
      lineHeight: 1.6,
    }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

function MethodTag({ method }) {
  const colors = {
    GET:    "#2196f3", POST:   "#4caf50",
    PUT:    "#ff9800", PATCH:  "#9c27b0", DELETE: "#f44336",
  };
  return (
    <span style={{
      background: colors[method] || "#888",
      color: "#fff", borderRadius: 4,
      padding: "2px 8px", fontSize: 12,
      fontWeight: 800, letterSpacing: "0.06em",
      marginRight: 8,
    }}>
      {method}
    </span>
  );
}

// ── Demo: GET ────────────────────────────────────────────────
function DemoGET() {
  const [status, setStatus]   = useState("idle");
  const [result, setResult]   = useState(null);

  async function handleGet() {
    setStatus("loading"); setResult(null);
    try {
      const data = await fetchGET();
      setResult(data); setStatus("success");
    } catch (e) {
      setResult({ error: e.message }); setStatus("error");
    }
  }

  return (
    <div className="api-card">
      <div className="card-header">
        <MethodTag method="GET" />
        <span className="endpoint">/posts?_limit=3</span>
        <StatusBadge status={status} />
      </div>
      <p className="card-desc">
        {/* GET fetches data. No body sent. Safe & idempotent — calling
            it multiple times always returns the same result. */}
        Retrieves a list of posts. Read-only — never modifies server data.
      </p>
      <div className="code-hint">
        <code>{`fetch('/posts?_limit=3')`}</code>
      </div>
      <button className="api-btn get" onClick={handleGet} disabled={status === "loading"}>
        {status === "loading" ? "Fetching…" : "Run GET"}
      </button>
      <ResponseBox data={result} />
    </div>
  );
}

// ── Demo: POST ───────────────────────────────────────────────
function DemoPOST() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [title, setTitle]   = useState("My New Post");

  async function handlePost() {
    setStatus("loading"); setResult(null);
    try {
      // We send a NEW object — no ID; server assigns one
      const data = await fetchPOST({ title, body: "Hello from React!", userId: 1 });
      setResult(data); setStatus("success");
    } catch (e) {
      setResult({ error: e.message }); setStatus("error");
    }
  }

  return (
    <div className="api-card">
      <div className="card-header">
        <MethodTag method="POST" />
        <span className="endpoint">/posts</span>
        <StatusBadge status={status} />
      </div>
      <p className="card-desc">
        {/* POST creates a new resource. Not idempotent — calling it
            twice creates two separate resources. */}
        Creates a new post. Server returns the created object with an assigned ID.
      </p>
      <div className="code-hint">
        <code>{`fetch('/posts', { method:'POST', body: JSON.stringify({...}) })`}</code>
      </div>
      <input
        className="api-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <button className="api-btn post" onClick={handlePost} disabled={status === "loading"}>
        {status === "loading" ? "Posting…" : "Run POST"}
      </button>
      <ResponseBox data={result} />
    </div>
  );
}

// ── Demo: PUT ────────────────────────────────────────────────
function DemoPUT() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  async function handlePut() {
    setStatus("loading"); setResult(null);
    try {
      // PUT: replace the ENTIRE post with id=1
      // All fields must be included; omitted ones get wiped
      const data = await fetchPUT(1, {
        id: 1,
        title: "Fully Replaced Title",
        body: "Completely new body content",
        userId: 1,
      });
      setResult(data); setStatus("success");
    } catch (e) {
      setResult({ error: e.message }); setStatus("error");
    }
  }

  return (
    <div className="api-card">
      <div className="card-header">
        <MethodTag method="PUT" />
        <span className="endpoint">/posts/1</span>
        <StatusBadge status={status} />
      </div>
      <p className="card-desc">
        {/* PUT replaces the full resource. Idempotent — calling it
            multiple times with the same body gives the same result.
            Use when you want to overwrite everything. */}
        Replaces post #1 entirely. Every field must be sent — missing fields are wiped.
      </p>
      <div className="code-hint">
        <code>{`fetch('/posts/1', { method:'PUT', body: JSON.stringify({id,title,body,userId}) })`}</code>
      </div>
      <button className="api-btn put" onClick={handlePut} disabled={status === "loading"}>
        {status === "loading" ? "Replacing…" : "Run PUT"}
      </button>
      <ResponseBox data={result} />
    </div>
  );
}

// ── Demo: PATCH ──────────────────────────────────────────────
function DemoPATCH() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [newTitle, setNewTitle] = useState("Only the title changed");

  async function handlePatch() {
    setStatus("loading"); setResult(null);
    try {
      // PATCH: only send what changed — rest stays as-is on server
      const data = await fetchPATCH(1, { title: newTitle });
      setResult(data); setStatus("success");
    } catch (e) {
      setResult({ error: e.message }); setStatus("error");
    }
  }

  return (
    <div className="api-card">
      <div className="card-header">
        <MethodTag method="PATCH" />
        <span className="endpoint">/posts/1</span>
        <StatusBadge status={status} />
      </div>
      <p className="card-desc">
        {/* PATCH partially updates a resource. Only the specified
            fields are changed; other fields remain untouched.
            More efficient than PUT for small updates. */}
        Updates only the title of post #1. Other fields (body, userId) stay intact.
      </p>
      <div className="code-hint">
        <code>{`fetch('/posts/1', { method:'PATCH', body: JSON.stringify({ title }) })`}</code>
      </div>
      <input
        className="api-input"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        placeholder="New title only"
      />
      <button className="api-btn patch" onClick={handlePatch} disabled={status === "loading"}>
        {status === "loading" ? "Patching…" : "Run PATCH"}
      </button>
      <ResponseBox data={result} />
    </div>
  );
}

// ── Demo: DELETE ─────────────────────────────────────────────
function DemoDELETE() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);

  async function handleDelete() {
    setStatus("loading"); setResult(null);
    try {
      // DELETE: removes the resource at the given URL.
      // Idempotent — deleting an already-deleted resource
      // should return 404 but does not change server state further.
      const data = await fetchDELETE(1);
      setResult(data); setStatus("success");
    } catch (e) {
      setResult({ error: e.message }); setStatus("error");
    }
  }

  return (
    <div className="api-card">
      <div className="card-header">
        <MethodTag method="DELETE" />
        <span className="endpoint">/posts/1</span>
        <StatusBadge status={status} />
      </div>
      <p className="card-desc">
        {/* DELETE removes a resource. No body needed — the target is
            identified by the URL. Server returns 200 (with body)
            or 204 (No Content) on success. */}
        Deletes post #1. No request body required — the URL identifies the target.
      </p>
      <div className="code-hint">
        <code>{`fetch('/posts/1', { method:'DELETE' })`}</code>
      </div>
      <button className="api-btn delete" onClick={handleDelete} disabled={status === "loading"}>
        {status === "loading" ? "Deleting…" : "Run DELETE"}
      </button>
      <ResponseBox data={result} />
    </div>
  );
}

// ── Demo: Custom useFetch hook ───────────────────────────────
function DemoCustomHook() {
  // useFetch wraps all loading/error/data logic into one clean hook.
  // You just pass a URL and destructure the state you need.
  const { data, loading, error } = useFetch(`${BASE_URL}/users/1`);

  return (
    <div className="api-card" style={{ borderTop: "3px solid #607d8b" }}>
      <div className="card-header">
        <MethodTag method="GET" />
        <span className="endpoint">/users/1</span>
        <StatusBadge status={loading ? "loading" : error ? "error" : data ? "success" : "idle"} />
      </div>
      <p className="card-desc">
        {/* The custom useFetch hook runs automatically on mount.
            It abstracts away AbortController, error handling,
            and loading state — all in a single reusable hook. */}
        Demonstrates the custom <code>useFetch</code> hook — auto-fires on mount.
      </p>
      <div className="code-hint">
        <code>{`const { data, loading, error } = useFetch(url)`}</code>
      </div>
      {loading && <p style={{ color: "#e65100", marginTop: 8 }}>Loading user…</p>}
      {error   && <p style={{ color: "#c62828", marginTop: 8 }}>Error: {error.message}</p>}
      <ResponseBox data={data} />
    </div>
  );
}


// ══════════════════════════════════════════════════════════════
//  COMPARISON TABLE DATA
// ══════════════════════════════════════════════════════════════
const COMPARISON = [
  // [Method, Purpose, Body?, Idempotent?, Response]
  ["GET",    "Read data",            "No",  "Yes", "200 OK + data"],
  ["POST",   "Create new resource",  "Yes", "No",  "201 Created"],
  ["PUT",    "Replace full resource","Yes", "Yes", "200 OK"],
  ["PATCH",  "Update partial fields","Yes", "No*", "200 OK"],
  ["DELETE", "Remove resource",      "No",  "Yes", "200 / 204"],
];


// ══════════════════════════════════════════════════════════════
//  ROOT COMPONENT
// ══════════════════════════════════════════════════════════════
export default function RestApiMethods() {
  return (
    <div style={styles.page}>
      <style>{CSS}</style>

      <header style={styles.header}>
        <p style={styles.eyebrow}>React · HTTP · REST</p>
        <h1 style={styles.title}>REST API Methods</h1>
        <p style={styles.subtitle}>
          How to call GET · POST · PUT · PATCH · DELETE from React
        </p>
      </header>

      {/* ── Fetch vs Axios ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>fetch() vs axios — at a glance</h2>
        <div style={styles.compareGrid}>
          {[
            {
              name: "fetch()", color: "#2196f3",
              points: [
                "Built into the browser — zero install",
                "Must call .json() to parse body",
                "Does NOT throw on 4xx/5xx — check response.ok",
                "Available in Node 18+ natively",
              ],
            },
            {
              name: "axios", color: "#7c4dff",
              points: [
                "npm install axios required",
                "Auto-parses JSON — response.data is ready",
                "Throws on 4xx/5xx — simpler try/catch",
                "Request/response interceptors built in",
              ],
            },
          ].map(({ name, color, points }) => (
            <div key={name} style={{ ...styles.compareCard, borderTop: `3px solid ${color}` }}>
              <h3 style={{ color, margin: "0 0 12px", fontFamily: "monospace", fontSize: 18 }}>{name}</h3>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                {points.map(p => <li key={p} style={{ marginBottom: 6, fontSize: 13, lineHeight: 1.5 }}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── HTTP Method comparison table ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>HTTP Methods — quick reference</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["Method","Purpose","Send Body?","Idempotent?","Success Response"].map(h => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([method, ...rest]) => (
                <tr key={method}>
                  <td style={styles.td}><MethodTag method={method} /></td>
                  {rest.map((cell, i) => <td key={i} style={styles.td}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: 11, color: "#999", marginTop: 4 }}>
            * PATCH idempotency depends on the implementation.
          </p>
        </div>
      </section>

      {/* ── Live demos ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Live Demos — click to call the API</h2>
        <div style={styles.demoGrid}>
          <DemoGET />
          <DemoPOST />
          <DemoPUT />
          <DemoPATCH />
          <DemoDELETE />
          <DemoCustomHook />
        </div>
      </section>

      {/* ── Patterns summary ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Patterns recap</h2>
        <div style={styles.patternsGrid}>
          {[
            {
              title: "async / await",
              desc: "Cleanest syntax. Wrap in try/catch for error handling. Always check response.ok with fetch.",
              tag: "Recommended",
              tagColor: "#2e7d32",
            },
            {
              title: "Promise .then()",
              desc: "Older chaining style. Still valid but harder to read with multiple sequential calls.",
              tag: "Legacy",
              tagColor: "#e65100",
            },
            {
              title: "AbortController",
              desc: "Cancel in-flight requests when a component unmounts, preventing state-update warnings.",
              tag: "Important",
              tagColor: "#1565c0",
            },
            {
              title: "Custom Hook",
              desc: "Wrap fetch logic in a useFetch() hook to reuse loading/error/data state across components.",
              tag: "Best Practice",
              tagColor: "#6a1b9a",
            },
          ].map(({ title, desc, tag, tagColor }) => (
            <div key={title} style={styles.patternCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <strong style={{ fontSize: 14, fontFamily: "monospace" }}>{title}</strong>
                <span style={{ background: tagColor, color: "#fff", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{tag}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
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
    background: "#f5f6fa",
    minHeight: "100vh",
    color: "#1a1a2e",
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 16px 64px",
  },
  header: {
    textAlign: "center",
    padding: "48px 0 36px",
    borderBottom: "1px solid #e0e0ef",
    marginBottom: 32,
  },
  eyebrow: {
    fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
    color: "#7c4dff", textTransform: "uppercase", margin: "0 0 8px",
  },
  title: {
    fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900,
    margin: "0 0 10px", letterSpacing: "-0.02em",
  },
  subtitle: { color: "#555", fontSize: 15, margin: 0 },
  section: { marginBottom: 40 },
  sectionHeading: {
    fontSize: "1.15rem", fontWeight: 800, margin: "0 0 16px",
    paddingLeft: 12, borderLeft: "4px solid #7c4dff", color: "#1a1a2e",
  },
  compareGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  compareCard: {
    background: "#fff", borderRadius: 10, padding: "20px 22px",
    boxShadow: "0 1px 10px rgba(0,0,0,0.07)",
  },
  table: {
    width: "100%", borderCollapse: "collapse",
    background: "#fff", borderRadius: 10,
    overflow: "hidden", fontSize: 13,
    boxShadow: "0 1px 10px rgba(0,0,0,0.07)",
  },
  th: {
    background: "#1a1a2e", color: "#fff",
    padding: "11px 14px", textAlign: "left",
    fontSize: 12, letterSpacing: "0.05em",
  },
  td: {
    padding: "10px 14px",
    borderBottom: "1px solid #f0f0fa",
    verticalAlign: "middle",
  },
  demoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
    gap: 20,
  },
  patternsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  patternCard: {
    background: "#fff", borderRadius: 10,
    padding: "16px 18px",
    boxShadow: "0 1px 10px rgba(0,0,0,0.07)",
    borderTop: "3px solid #e0e0ef",
  },
};

const CSS = `
  .api-card {
    background: #fff;
    border-radius: 12px;
    padding: 18px 20px;
    box-shadow: 0 2px 14px rgba(0,0,0,0.08);
    border-top: 3px solid #7c4dff;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .card-header {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }
  .endpoint {
    font-family: monospace;
    font-size: 13px;
    color: #444;
    flex: 1;
  }
  .card-desc {
    font-size: 13px;
    color: #555;
    line-height: 1.6;
    margin: 0 0 10px;
  }
  .code-hint {
    background: #f0f4ff;
    border-radius: 6px;
    padding: 7px 12px;
    margin-bottom: 10px;
    font-size: 11.5px;
    color: #3949ab;
    overflow-x: auto;
  }
  .api-input {
    width: 100%;
    box-sizing: border-box;
    padding: 7px 10px;
    border: 1px solid #dde;
    border-radius: 6px;
    font-size: 13px;
    margin-bottom: 8px;
    font-family: inherit;
  }
  .api-btn {
    border: none;
    border-radius: 7px;
    padding: 9px 18px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    color: #fff;
    transition: opacity 0.15s;
    width: 100%;
    letter-spacing: 0.03em;
  }
  .api-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .api-btn.get    { background: #2196f3; }
  .api-btn.post   { background: #4caf50; }
  .api-btn.put    { background: #ff9800; }
  .api-btn.patch  { background: #9c27b0; }
  .api-btn.delete { background: #f44336; }
`;
