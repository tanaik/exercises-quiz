import { BASE_URL } from "./constants.js";
// ── GET with fetch ──────────────────────────────────────────

async function fetchGET(id = null) {
  const url = id ? `${BASE_URL}/questions/${id}` : `${BASE_URL}/questions`;
  const response = await fetch(url);
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
  const response = await fetch(`${BASE_URL}/questions`, {
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
  const response = await fetch(`${BASE_URL}/questions/${id}`, {
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
  const response = await fetch(`${BASE_URL}/questions/${id}`, {
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
  const response = await fetch(`${BASE_URL}/questions/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  // Some servers return empty body on DELETE — handle both cases
  const text = await response.text();
  return text ? JSON.parse(text) : { deleted: true, id };
}


export { fetchGET, fetchPOST, fetchPUT, fetchPATCH, fetchDELETE };