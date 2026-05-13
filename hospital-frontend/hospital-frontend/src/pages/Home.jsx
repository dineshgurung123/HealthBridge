import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const features = [
    { icon: "🏥", title: "Easy Appointments", desc: "Book and manage appointments with top doctors in just a few clicks." },
    { icon: "👨‍⚕️", title: "Expert Doctors", desc: "Access a wide network of verified specialists across all medical fields." },
    { icon: "📋", title: "Health Records", desc: "Keep track of your medical history and appointment status anytime." },
    { icon: "⚡", title: "Fast & Reliable", desc: "Get instant confirmations and real-time updates on your appointments." },
  ];

  const stats = [
    { value: "500+", label: "Doctors" },
    { value: "10k+", label: "Patients" },
    { value: "98%",  label: "Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <div style={{
        background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        padding: "80px 40px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>
        {/* decorative rings */}
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 250 + i * 180, height: 250 + i * 180,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }} />
        ))}

        {/* badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.4)",
          padding: "6px 16px", borderRadius: 20, marginBottom: 24,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#818cf8", display: "inline-block" }} />
          <span style={{ color: "#a5b4fc", fontSize: 13, fontWeight: 600 }}>Nepal's #1 Hospital Management System</span>
        </div>

        <h1 style={{
          margin: "0 0 20px", fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 900, color: "#f8fafc", lineHeight: 1.15,
          letterSpacing: "-1px", position: "relative", zIndex: 1,
        }}>
          Your Health,{" "}
          <span style={{
            background: "linear-gradient(135deg, #818cf8, #c084fc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Our Priority</span>
        </h1>

        <p style={{
          margin: "0 auto 36px", maxWidth: 520, color: "#94a3b8",
          fontSize: 17, lineHeight: 1.7, position: "relative", zIndex: 1,
        }}>
          Connect with top doctors, book appointments instantly, and manage your health records — all in one place.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
          {!token ? (
            <>
              <button
                onClick={() => navigate("/register")}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff", border: "none",
                  padding: "14px 32px", borderRadius: 12,
                  fontWeight: 700, fontSize: 16, cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 8px 24px rgba(99,102,241,0.45)",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => e.target.style.opacity = "0.88"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate("/login")}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.15)",
                  padding: "14px 32px", borderRadius: 12,
                  fontWeight: 600, fontSize: 16, cursor: "pointer",
                  fontFamily: "inherit", transition: "background 0.15s",
                }}
                onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.14)"}
                onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
              >
                Sign In
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate(role === "admin" ? "/admin" : role === "doctor" ? "/doctor-dashboard" : "/doctors")}
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", border: "none",
                padding: "14px 32px", borderRadius: 12,
                fontWeight: 700, fontSize: 16, cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 8px 24px rgba(99,102,241,0.45)",
              }}
            >
              Go to Dashboard →
            </button>
          )}
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 40,
          marginTop: 56, flexWrap: "wrap", position: "relative", zIndex: 1,
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#f8fafc" }}>{s.value}</p>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "#64748b", fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ padding: "72px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 800, color: "#0f172a" }}>
            Everything you need
          </h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: 16 }}>
            Designed to make healthcare simple and accessible for everyone.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 24,
        }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: "#fff", borderRadius: 16,
              border: "1px solid #e2e8f0", padding: "28px 24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(99,102,241,0.12)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12, fontSize: 24,
                background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>{f.icon}</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: "#0f172a" }}>
                {f.title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      {!token && (
        <div style={{
          margin: "0 40px 72px",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          borderRadius: 20, padding: "48px 40px",
          textAlign: "center",
          boxShadow: "0 16px 48px rgba(99,102,241,0.3)",
        }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 28, fontWeight: 800, color: "#fff" }}>
            Ready to get started?
          </h2>
          <p style={{ margin: "0 0 28px", color: "#c7d2fe", fontSize: 16 }}>
            Create your free account and book your first appointment today.
          </p>
          <button
            onClick={() => navigate("/register")}
            style={{
              background: "#fff", color: "#6366f1", border: "none",
              padding: "13px 32px", borderRadius: 12,
              fontWeight: 700, fontSize: 16, cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={e => e.target.style.opacity = "0.9"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            Create Free Account →
          </button>
        </div>
      )}

      {/* ── FOOTER ── */}
     {/* ── FOOTER ── */}
<div style={{
  background: "#0f172a",
  color: "#e2e8f0",
  padding: "60px 40px 30px",
  marginTop: 40,
  position: "relative",
  overflow: "hidden",
}}>

  {/* top glow line */}
  <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "3px",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6, #22c55e)",
  }} />

  <div style={{
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 40,
  }}>

    {/* Brand */}
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          color: "#fff"
        }}>
          H
        </div>
        <h3 style={{ margin: 0, fontSize: 18 }}>
          Hospital<span style={{ color: "#818cf8" }}>MS</span>
        </h3>
      </div>

      <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>
        Modern hospital management system to simplify appointments, doctors,
        and patient care in one powerful platform.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 style={{ marginBottom: 12 }}>Quick Links</h4>

      {["Home", "Doctors", "Appointments", "About"].map((item) => (
        <p
          key={item}
          style={{
            margin: "6px 0",
            fontSize: 14,
            color: "#94a3b8",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseEnter={e => e.target.style.color = "#fff"}
          onMouseLeave={e => e.target.style.color = "#94a3b8"}
        >
          {item}
        </p>
      ))}
    </div>

    {/* Support */}
    <div>
      <h4 style={{ marginBottom: 12 }}>Support</h4>

      {["Help Center", "Contact Us", "Privacy Policy", "Terms"].map((item) => (
        <p
          key={item}
          style={{
            margin: "6px 0",
            fontSize: 14,
            color: "#94a3b8",
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseEnter={e => e.target.style.color = "#fff"}
          onMouseLeave={e => e.target.style.color = "#94a3b8"}
        >
          {item}
        </p>
      ))}
    </div>

    {/* Social */}
    <div>
      <h4 style={{ marginBottom: 12 }}>Follow Us</h4>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {["📘", "🐦", "📸", "💼"].map((icon, i) => (
          <div
            key={i}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "#1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#334155"}
            onMouseLeave={e => e.currentTarget.style.background = "#1e293b"}
          >
            {icon}
          </div>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "#94a3b8" }}>
        contact@hospitalms.com
      </p>
    </div>
  </div>

  {/* bottom bar */}
  <div style={{
    borderTop: "1px solid rgba(255,255,255,0.08)",
    marginTop: 40,
    paddingTop: 20,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 13,
    color: "#64748b",
    maxWidth: 1100,
    marginInline: "auto",
  }}>
    <p style={{ margin: 0 }}>
      © 2026 HospitalMS. All rights reserved.
    </p>

    <p style={{ margin: 0 }}>
      Built with ❤️ for better healthcare in Nepal
    </p>
  </div>
</div>

    </div>
  );
};

export default Home;