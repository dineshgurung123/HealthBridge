import { useState } from "react";
import { RegisterUSer } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roles: "patient",
    age: "",
    gender: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await RegisterUSer(formData);
      console.log("Register Success:", data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 14,
    color: "#0f172a",
    outline: "none",
    fontFamily: "inherit",
    background: "#f8fafc",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const fields = [
    { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "you@example.com",
    },
    { label: "Age", name: "age", type: "number", placeholder: "25" },
    { label: "Phone", name: "phone", type: "text", placeholder: "98XXXXXXXX" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#f1f5f9",
      }}
    >
      {/* Left decorative panel */}
      <div
        style={{
          flex: 1,
          display: "none",
          background:
            "linear-gradient(145deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 24,
          padding: 48,
          position: "relative",
          overflow: "hidden",
        }}
        className="register-left-panel"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 300 + i * 150,
              height: 300 + i * 150,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.05)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 900,
            color: "#fff",
            boxShadow: "0 8px 32px rgba(99,102,241,0.5)",
            zIndex: 1,
          }}
        >
          H
        </div>
        <div style={{ textAlign: "center", zIndex: 1 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800,
              color: "#f8fafc",
              letterSpacing: "-0.5px",
            }}
          >
            Hospital<span style={{ color: "#818cf8" }}>MS</span>
          </h1>
          <p
            style={{
              margin: "12px 0 0",
              color: "#94a3b8",
              fontSize: 15,
              lineHeight: 1.6,
              maxWidth: 280,
            }}
          >
            Join thousands of patients managing their health online.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            zIndex: 1,
            marginTop: 16,
          }}
        >
          {[
            "🏥  Manage appointments easily",
            "👨‍⚕️  Connect with top doctors",
            "📋  Track your health records",
          ].map((t) => (
            <div
              key={t}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "10px 18px",
                borderRadius: 10,
                color: "#cbd5e1",
                fontSize: 14,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          overflowY: "auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420, padding: "24px 0" }}>
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                color: "#fff",
                fontSize: 18,
                boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
              }}
            >
              H
            </div>
            <span style={{ fontWeight: 800, fontSize: 20, color: "#0f172a" }}>
              Hospital<span style={{ color: "#6366f1" }}>MS</span>
            </span>
          </div>

          <h2
            style={{
              margin: "0 0 6px",
              fontSize: 26,
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Create an account
          </h2>
          <p style={{ margin: "0 0 28px", color: "#64748b", fontSize: 15 }}>
            Fill in your details to get started
          </p>

          <form
            onSubmit={handleRegister}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Regular fields */}
            {fields.map((f) => (
              <div key={f.name}>
                <label
                  style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: 6,
                  }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  placeholder={f.placeholder}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            ))}

            {/* Password */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  onChange={handleChange}
                  required
                  style={{ ...inputStyle, padding: "11px 42px 11px 14px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    fontSize: 16,
                    padding: 0,
                    lineHeight: 1,
                  }}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Gender select */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                Gender
              </label>
              <select
                name="gender"
                onChange={handleChange}
                required
                style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Role — hidden, kept as patient exactly like your original */}
            <select
              name="roles"
              onChange={handleChange}
              style={{ display: "none" }}
            >
              <option value="patient">Patient</option>
            </select>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                background: loading
                  ? "#a5b4fc"
                  : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                border: "none",
                padding: "12px 0",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit",
                boxShadow: loading
                  ? "none"
                  : "0 4px 16px rgba(99,102,241,0.35)",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.opacity = "0.88";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p
            style={{
              marginTop: 24,
              textAlign: "center",
              fontSize: 14,
              color: "#64748b",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#6366f1",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .register-left-panel { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default Register;
