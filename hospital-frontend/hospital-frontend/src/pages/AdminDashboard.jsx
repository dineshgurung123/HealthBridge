import { useEffect, useState } from "react";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "../services/appointmentService";
import { createDoctor, getDoctors } from "../services/doctorService";
import { getPatients } from "../services/patientServices";

const Icon = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  appointments: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  doctors: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  patients: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  plus: "M12 5v14M5 12h14",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6 6 18M6 6l12 12",
  check: "M20 6 9 17l-5-5",
};

const StatusBadge = ({ status }) => {
  const map = {
    approved:  { bg: "#d1fae5", color: "#065f46", label: "Approved" },
    completed: { bg: "#dbeafe", color: "#1e3a8a", label: "Completed" },
    cancelled: { bg: "#fee2e2", color: "#991b1b", label: "Cancelled" },
    pending:   { bg: "#fef9c3", color: "#854d0e", label: "Pending" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "2px 10px", borderRadius: 20,
      fontSize: 12, fontWeight: 600, letterSpacing: "0.03em"
    }}>
      {s.label}
    </span>
  );
};

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520,
        margin: 16, boxShadow: "0 24px 64px rgba(0,0,0,0.18)", overflow: "hidden",
        animation: "modalIn 0.22s cubic-bezier(.34,1.56,.64,1)"
      }}>
        <style>{`@keyframes modalIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}`}</style>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px", borderBottom: "1px solid #f1f5f9"
        }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a", fontFamily: "inherit" }}>
            {title}
          </h3>
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#94a3b8", padding: 4, borderRadius: 6, display: "flex"
          }}>
            <Icon d={ICONS.x} />
          </button>
        </div>
        <div style={{ padding: "24px" }}>{children}</div>
      </div>
    </div>
  );
};

const Table = ({ columns, data, renderRow, emptyMsg = "No data available." }) => (
  <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #e2e8f0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
      <thead>
        <tr style={{ background: "#f8fafc" }}>
          {columns.map((col) => (
            <th key={col} style={{
              textAlign: "left", padding: "12px 16px",
              fontWeight: 600, color: "#475569", fontSize: 12,
              textTransform: "uppercase", letterSpacing: "0.05em",
              borderBottom: "1px solid #e2e8f0", whiteSpace: "nowrap"
            }}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0
          ? <tr><td colSpan={columns.length} style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>{emptyMsg}</td></tr>
          : data.map(renderRow)
        }
      </tbody>
    </table>
  </div>
);

const StatCard = ({ label, value, iconD, accent }) => (
  <div style={{
    background: "#fff", borderRadius: 14, padding: "20px 24px",
    border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: 12, background: accent + "18",
      color: accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
    }}>
      <Icon d={iconD} size={22} />
    </div>
    <div>
      <p style={{ margin: 0, fontSize: 13, color: "#64748b", fontWeight: 500 }}>{label}</p>
      <p style={{ margin: "2px 0 0", fontSize: 26, fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [doctorForm, setDoctorForm] = useState({
    name: "", email: "", password: "", specialization: "", experience: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appData, docData, patientData] = await Promise.all([
          getAllAppointments(),
          getDoctors(),
          getPatients(),
        ]);
        setAppointments(appData.appointments || []);
        setDoctors(docData.doctors || []);
        setPatients(patientData.patients || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prev) => prev.map((a) => a._id === id ? { ...a, status } : a));
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) =>
    setDoctorForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await createDoctor(doctorForm);
      setDoctorForm({ name: "", email: "", password: "", specialization: "", experience: "" });
      setShowCreateModal(false);
      setSuccessMsg("Doctor created successfully!");
      setTimeout(() => setSuccessMsg(""), 3500);
      const docData = await getDoctors();
      setDoctors(docData.doctors || []);
    } catch (err) {
      console.error(err);
      alert("Failed to create doctor");
    } finally {
      setCreating(false);
    }
  };

  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const approvedCount = appointments.filter((a) => a.status === "approved").length;

  const navItems = [
    { id: "dashboard",    label: "Dashboard",    icon: ICONS.dashboard },
    { id: "appointments", label: "Appointments", icon: ICONS.appointments },
    { id: "doctors",      label: "Doctors",      icon: ICONS.doctors },
    { id: "patients",     label: "Patients",     icon: ICONS.patients },
  ];

  const ACCENT = "#6366f1";

  const inputStyle = {
    width: "100%", padding: "10px 12px", border: "1.5px solid #e2e8f0",
    borderRadius: 8, fontSize: 14, color: "#0f172a", outline: "none",
    fontFamily: "inherit", background: "#f8fafc", boxSizing: "border-box",
    transition: "border-color 0.15s"
  };

  const btnPrimary = {
    background: ACCENT, color: "#fff", border: "none",
    padding: "10px 20px", borderRadius: 8, fontWeight: 600,
    fontSize: 14, cursor: "pointer", display: "inline-flex",
    alignItems: "center", gap: 6, fontFamily: "inherit",
    transition: "opacity 0.15s"
  };

  const actionBtn = (color) => ({
    background: color + "14", color, border: `1px solid ${color}30`,
    padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f1f5f9" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarOpen ? 240 : 64, transition: "width 0.25s",
        background: "#0f172a", color: "#cbd5e1",
        display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50,
        overflow: "hidden"
      }}>
        <div style={{
          padding: "20px 16px", display: "flex", alignItems: "center",
          gap: 10, borderBottom: "1px solid #1e293b"
        }}>
          <div style={{
            width: 34, height: 34, background: ACCENT, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontWeight: 900, color: "#fff", fontSize: 16
          }}>A</div>
          {sidebarOpen && <span style={{ fontWeight: 700, color: "#f8fafc", fontSize: 16, whiteSpace: "nowrap" }}>AdminPanel</span>}
        </div>

        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, border: "none",
                background: active ? ACCENT : "transparent",
                color: active ? "#fff" : "#94a3b8",
                cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
                fontSize: 14, textAlign: "left", width: "100%", whiteSpace: "nowrap",
                transition: "all 0.15s"
              }}>
                <span style={{ flexShrink: 0 }}><Icon d={item.icon} /></span>
                {sidebarOpen && item.label}
              </button>
            );
          })}
        </nav>

        <button onClick={() => setSidebarOpen((v) => !v)} style={{
          margin: 8, padding: 10, borderRadius: 8, border: "none",
          background: "#1e293b", color: "#64748b", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Icon d={ICONS.menu} />
        </button>
      </aside>

      {/* ── Main ── */}
      <main style={{ marginLeft: sidebarOpen ? 240 : 64, flex: 1, transition: "margin-left 0.25s", padding: "28px 32px", minWidth: 0 }}>

        {successMsg && (
          <div style={{
            position: "fixed", top: 20, right: 24, background: "#10b981", color: "#fff",
            padding: "12px 20px", borderRadius: 10, fontWeight: 600, fontSize: 14,
            boxShadow: "0 4px 20px rgba(16,185,129,0.4)", zIndex: 200,
          }}>
            ✓ {successMsg}
          </div>
        )}

        {/* ══ DASHBOARD ══ */}
        {activeTab === "dashboard" && (
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: 26, fontWeight: 800, color: "#0f172a" }}>Dashboard</h1>
            <p style={{ margin: "0 0 28px", color: "#64748b", fontSize: 14 }}>Welcome back, Admin</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
              <StatCard label="Total Appointments" value={appointments.length} iconD={ICONS.appointments} accent="#6366f1" />
              <StatCard label="Pending"             value={pendingCount}         iconD={ICONS.appointments} accent="#f59e0b" />
              <StatCard label="Approved"            value={approvedCount}        iconD={ICONS.check}        accent="#10b981" />
              <StatCard label="Doctors"             value={doctors.length}       iconD={ICONS.doctors}      accent="#3b82f6" />
              <StatCard label="Patients"            value={patients.length}      iconD={ICONS.patients}     accent="#8b5cf6" />
            </div>
            <div style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Recent Appointments</h3>
              <Table
                columns={["Patient", "Doctor", "Date", "Time", "Status"]}
                data={appointments.slice(0, 5)}
                renderRow={(a) => (
                  <tr key={a._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px 16px", color: "#334155" }}>{a.patientId?.userId?.name || "—"}</td>
                    <td style={{ padding: "12px 16px", color: "#334155" }}>{a.doctorId?.userId?.name || "—"}</td>
                    <td style={{ padding: "12px 16px", color: "#334155" }}>{a.date}</td>
                    <td style={{ padding: "12px 16px", color: "#334155" }}>{a.time}</td>
                    <td style={{ padding: "12px 16px" }}><StatusBadge status={a.status} /></td>
                  </tr>
                )}
              />
            </div>
          </div>
        )}

        {/* ══ APPOINTMENTS ══ */}
        {activeTab === "appointments" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>Appointments</h1>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{appointments.length} total</p>
              </div>
            </div>
            {loading ? <p style={{ color: "#94a3b8" }}>Loading…</p> : (
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                <Table
                  columns={["#", "Patient", "Doctor", "Date", "Time", "Status", "Actions"]}
                  data={appointments}
                  renderRow={(a, i) => (
                    <tr key={a._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: 12 }}>{appointments.indexOf(a) + 1}</td>
                      <td style={{ padding: "12px 16px", color: "#334155", fontWeight: 500 }}>{a.patientId?.userId?.name || "—"}</td>
                      <td style={{ padding: "12px 16px", color: "#334155" }}>{a.doctorId?.userId?.name || "—"}</td>
                      <td style={{ padding: "12px 16px", color: "#334155" }}>{a.date}</td>
                      <td style={{ padding: "12px 16px", color: "#334155" }}>{a.time}</td>
                      <td style={{ padding: "12px 16px" }}><StatusBadge status={a.status} /></td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => handleStatusUpdate(a._id, "approved")}  style={actionBtn("#10b981")}>Approve</button>
                          <button onClick={() => handleStatusUpdate(a._id, "completed")} style={actionBtn("#3b82f6")}>Complete</button>
                          <button onClick={() => handleStatusUpdate(a._id, "cancelled")} style={actionBtn("#ef4444")}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                  )}
                  emptyMsg="No appointments found."
                />
              </div>
            )}
          </div>
        )}

        {/* ══ DOCTORS ══ */}
        {activeTab === "doctors" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>Doctors</h1>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{doctors.length} registered</p>
              </div>
              <button style={btnPrimary} onClick={() => setShowCreateModal(true)}>
                <Icon d={ICONS.plus} size={16} /> Add Doctor
              </button>
            </div>
            {loading ? <p style={{ color: "#94a3b8" }}>Loading…</p> : (
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                <Table
                  columns={["#", "Name", "Email", "Specialization", "Experience"]}
                  data={doctors}
                  renderRow={(d) => (
                    <tr key={d._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: 12 }}>{doctors.indexOf(d) + 1}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            background: ACCENT + "22", color: ACCENT,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: 13, flexShrink: 0
                          }}>
                            {d.userId?.name?.[0]?.toUpperCase() || "D"}
                          </div>
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>{d.userId?.name || "—"}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#475569" }}>{d.userId?.email || "—"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: "#ede9fe", color: "#6d28d9", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                          {d.specialization || "—"}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#475569" }}>{d.experience ? `${d.experience} yrs` : "—"}</td>
                    </tr>
                  )}
                  emptyMsg="No doctors found."
                />
              </div>
            )}
          </div>
        )}

        {/* ══ PATIENTS ══ */}
        {activeTab === "patients" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#0f172a" }}>Patients</h1>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>{patients.length} registered</p>
            </div>
            {loading ? <p style={{ color: "#94a3b8" }}>Loading…</p> : (
              <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                <Table
                  columns={["#", "Name", "Email"]}
                  data={patients}
                  renderRow={(p) => (
                    <tr key={p._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: 12 }}>{patients.indexOf(p) + 1}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            background: "#8b5cf622", color: "#8b5cf6",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: 13, flexShrink: 0
                          }}>
                            {p.userId?.name?.[0]?.toUpperCase() || "P"}
                          </div>
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>{p.userId?.name || "—"}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#475569" }}>{p.userId?.email || "—"}</td>
                    </tr>
                  )}
                  emptyMsg="No patients found."
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* ══ CREATE DOCTOR MODAL ══ */}
      <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)} title="Add New Doctor">
        <form onSubmit={handleCreateDoctor} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { name: "name",           placeholder: "Full Name",            type: "text" },
            { name: "email",          placeholder: "Email Address",        type: "email" },
            { name: "password",       placeholder: "Password",             type: "password" },
            { name: "specialization", placeholder: "Specialization",       type: "text" },
            { name: "experience",     placeholder: "Years of Experience",  type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#475569", marginBottom: 4 }}>
                {field.placeholder}
              </label>
              <input
                name={field.name}
                type={field.type}
                value={doctorForm[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = ACCENT)}
                onBlur={(e)  => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
            <button type="button" onClick={() => setShowCreateModal(false)} style={{
              flex: 1, padding: "10px 0", border: "1.5px solid #e2e8f0", borderRadius: 8,
              background: "#fff", color: "#475569", fontWeight: 600, fontSize: 14,
              cursor: "pointer", fontFamily: "inherit"
            }}>Cancel</button>
            <button type="submit" disabled={creating} style={{ ...btnPrimary, flex: 1, justifyContent: "center", opacity: creating ? 0.7 : 1 }}>
              {creating ? "Creating…" : "Create Doctor"}
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default AdminDashboard;