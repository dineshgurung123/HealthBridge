import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../services/doctorService";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        console.log(data.doctors || []);
        setDoctors(data.doctors);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div style={{
      padding: "36px 40px",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#f1f5f9",
      minHeight: "100vh",
    }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0f172a" }}>
          Our Doctors
        </h1>
        <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 15 }}>
          Book an appointment with our specialists
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontSize: 15 }}>
          Loading doctors…
        </div>
      )}

      {/* Empty */}
      {!loading && doctors.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontSize: 15 }}>
          No doctors available at the moment.
        </div>
      )}

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 24,
      }}>
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              padding: 24,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              transition: "box-shadow 0.2s, transform 0.2s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Avatar + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 800, fontSize: 20, flexShrink: 0,
              }}>
                {doctor.userId?.name?.[0]?.toUpperCase() || "D"}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#0f172a" }}>
                  Dr. {doctor.userId?.name || "Unknown"}
                </h2>
                <span style={{
                  display: "inline-block", marginTop: 4,
                  background: "#ede9fe", color: "#6d28d9",
                  padding: "2px 10px", borderRadius: 20,
                  fontSize: 12, fontWeight: 600,
                }}>
                  {doctor.specialization || "General"}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "#f1f5f9" }} />

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#475569" }}>
                <span>🏥</span>
                <span><b>{doctor.experience}</b> years of experience</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#475569" }}>
                <span>✉️</span>
                <span>{doctor.userId?.email || "—"}</span>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/book-appointment/${doctor._id}`)}
              style={{
                marginTop: 4,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", border: "none",
                padding: "10px 0", borderRadius: 10,
                fontWeight: 700, fontSize: 14,
                cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => e.target.style.opacity = "0.85"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;