import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      position: "sticky",
      top: 0,
      zIndex: 99,
      boxShadow: "0 2px 20px rgba(0,0,0,0.25)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, color: "#fff", fontSize: 16, flexShrink: 0,
          boxShadow: "0 4px 12px rgba(99,102,241,0.4)"
        }}>H</div>
        <span style={{ fontWeight: 800, fontSize: 18, color: "#f8fafc", letterSpacing: "-0.3px" }}>
          Health<span style={{ color: "#818cf8" }}>Bridge</span>
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>

        <NavLink to="/">Home</NavLink>

        {/* PATIENT LINKS */}
        {role === "patient" && (
          <>
            <NavLink to="/doctors">Doctors</NavLink>
            <NavLink to="/my-appointments">My Appointments</NavLink>
          </>
        )}

        {/* ADMIN LINK */}
        {role === "admin" && (
          <NavLink to="/admin">Admin Dashboard</NavLink>
        )}

        {/* DOCTOR LINK */}
        {role === "doctor" && (
          <NavLink to="/doctor-dashboard">Doctor Dashboard</NavLink>
        )}

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "#334155", margin: "0 8px" }} />

        {/* AUTH BUTTONS */}
        {!token ? (
          <>
            <Link to="/login" style={{
              color: "#94a3b8", textDecoration: "none",
              padding: "6px 14px", borderRadius: 8, fontSize: 14,
              fontWeight: 500, border: "1px solid #334155",
            }}>Login</Link>
            <Link to="/register" style={{
              color: "#fff", textDecoration: "none",
              padding: "6px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 4px 12px rgba(99,102,241,0.35)", marginLeft: 4,
            }}>Register</Link>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 13, textTransform: "uppercase",
            }}>
              {role?.[0] || "U"}
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: "rgba(239,68,68,0.12)", color: "#f87171",
                border: "1px solid rgba(239,68,68,0.25)",
                padding: "6px 14px", borderRadius: 8,
                fontWeight: 600, fontSize: 13,
                cursor: "pointer", fontFamily: "inherit",
              }}
              onMouseEnter={e => e.target.style.background = "rgba(239,68,68,0.22)"}
              onMouseLeave={e => e.target.style.background = "rgba(239,68,68,0.12)"}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link to={to} style={{
    color: "#94a3b8", textDecoration: "none",
    padding: "6px 12px", borderRadius: 8,
    fontSize: 14, fontWeight: 500,
  }}
    onMouseEnter={e => { e.target.style.color = "#f8fafc"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
    onMouseLeave={e => { e.target.style.color = "#94a3b8"; e.target.style.background = "transparent"; }}
  >
    {children}
  </Link>
);

export default Navbar;