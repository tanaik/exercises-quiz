import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
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
    <>
    <nav style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "12px 24px", background: "#f8f9fa",
      borderBottom: "1px solid #e0e0e0",
    }}>
      

      {/* NavLink — gets active style when URL matches `to` */}
      <NavLink to="/"            style={navLinkStyle} end>
        {/* "end" prop: only active on EXACT "/" — not on "/quiz" */}
        Home
      </NavLink>

      <NavLink to="/quiz"        style={navLinkStyle}>Quizzes</NavLink>

      <NavLink to="/admin" style={navLinkStyle}>Admin</NavLink>
      <NavLink to="/results" style={navLinkStyle}> Results </NavLink>
    </nav>
    </>
  )
}

export default Navbar