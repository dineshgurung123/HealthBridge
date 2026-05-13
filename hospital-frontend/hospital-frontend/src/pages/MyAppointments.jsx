import { useEffect, useState } from "react";
import { getMyAppointments } from "../services/appointmentService";

const statusMap = {
  approved:  { bg: "#d1fae5", color: "#065f46", label: "Approved" },
  completed: { bg: "#dbeafe", color: "#1e3a8a", label: "Completed" },
  cancelled: { bg: "#fee2e2", color: "#991b1b", label: "Cancelled" },
  pending:   { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
};

const StatusBadge = ({ status }) => {
  const s = statusMap[status] || statusMap.pending;
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 12px", borderRadius: 20,
      fontSize: 12, fontWeight: 600, letterSpacing: "0.03em",
    }}>{s.label}</span>
  );
};

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data.appointments);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
          My Appointments
        </h1>
        <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 15 }}>
          Track and manage your upcoming visits
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: 80, color: "#94a3b8", fontSize: 15 }}>
          Loading appointments…
        </div>
      )}

      {/* Empty state */}
      {!loading && appointments.length === 0 && (
        <div style={{
          textAlign: "center", padding: "80px 24px",
          background: "#fff", borderRadius: 16,
          border: "1px solid #e2e8f0",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗓️</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
            No appointments yet
          </h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>
            You haven't booked any appointments yet.
          </p>
        </div>
      )}

      {/* Appointments list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {appointments.map((app) => (
          <div
            key={app._id}
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              padding: "20px 24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              gap: 20,
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.1)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 20,
            }}>
              {app.doctorId?.userId?.name?.[0]?.toUpperCase() || "D"}
            </div>

            {/* Main info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>
                  Dr. {app.doctorId?.userId?.name || "Unknown"}
                </h2>
                <StatusBadge status={app.status} />
              </div>
              <span style={{
                display: "inline-block", marginTop: 4,
                background: "#ede9fe", color: "#6d28d9",
                padding: "2px 10px", borderRadius: 20,
                fontSize: 12, fontWeight: 600,
              }}>
                {app.doctorId?.specialization || "General"}
              </span>
            </div>

            {/* Date / Time */}
            <div style={{
              display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap",
              justifyContent: "flex-end",
            }}>
              <div style={{
                background: "#f8fafc", border: "1px solid #e2e8f0",
                borderRadius: 10, padding: "8px 16px", textAlign: "center",
              }}>
                <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</p>
                <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{app.date}</p>
              </div>
              <div style={{
                background: "#f8fafc", border: "1px solid #e2e8f0",
                borderRadius: 10, padding: "8px 16px", textAlign: "center",
              }}>
                <p style={{ margin: 0, fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Time</p>
                <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{app.time}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;