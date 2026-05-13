import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.roles);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#f1f5f9",
    }}>

      {/* Left decorative panel — hidden on mobile */}
      <div style={{
        flex: 1, display: "none",
        background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 24, padding: 48,
        position: "relative", overflow: "hidden",
      }} className="login-left-panel">
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 300 + i * 150, height: 300 + i * 150,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.05)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }} />
        ))}
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 900, color: "#fff",
          boxShadow: "0 8px 32px rgba(99,102,241,0.5)", zIndex: 1,
        }}>H</div>
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.5px" }}>
            Health<span style={{ color: "#818cf8" }}>Bridge</span>
          </h1>
          <p style={{ margin: "12px 0 0", color: "#94a3b8", fontSize: 15, lineHeight: 1.6, maxWidth: 280 }}>
            Your health, our priority. Access your medical portal securely.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, zIndex: 1, marginTop: 16 }}>
          {["🏥  Manage appointments easily", "👨‍⚕️  Connect with top doctors", "📋  Track your health records"].map((t) => (
            <div key={t} style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "10px 18px", borderRadius: 10,
              color: "#cbd5e1", fontSize: 14,
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "32px 24px",
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: "#fff", fontSize: 18,
              boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
            }}>H</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: "#0f172a" }}>
              Health<span style={{ color: "#6366f1" }}>Bridge</span>
            </span>
          </div>

          <h2 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 800, color: "#0f172a" }}>
            Welcome back
          </h2>
          <p style={{ margin: "0 0 32px", color: "#64748b", fontSize: 15 }}>
            Sign in to your account to continue
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%", padding: "11px 14px",
                  border: "1.5px solid #e2e8f0", borderRadius: 10,
                  fontSize: 14, color: "#0f172a", outline: "none",
                  fontFamily: "inherit", background: "#f8fafc",
                  boxSizing: "border-box", transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = "#6366f1"}
                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%", padding: "11px 42px 11px 14px",
                    border: "1.5px solid #e2e8f0", borderRadius: 10,
                    fontSize: 14, color: "#0f172a", outline: "none",
                    fontFamily: "inherit", background: "#f8fafc",
                    boxSizing: "border-box", transition: "border-color 0.15s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#6366f1"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer", color: "#94a3b8",
                  fontSize: 16, padding: 0, lineHeight: 1,
                }}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                background: loading ? "#a5b4fc" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff", border: "none",
                padding: "12px 0", borderRadius: 10,
                fontWeight: 700, fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                boxShadow: loading ? "none" : "0 4px 16px rgba(99,102,241,0.35)",
              }}
              onMouseEnter={e => { if (!loading) e.target.style.opacity = "0.88"; }}
              onMouseLeave={e => { e.target.style.opacity = "1"; }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>

          </form>

          <p style={{ marginTop: 24, textAlign: "center", fontSize: 14, color: "#64748b" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#6366f1", fontWeight: 600, textDecoration: "none" }}>
              Create one
            </Link>
          </p>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .login-left-panel { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default Login;