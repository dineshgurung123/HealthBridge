import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* ─── tiny CSS-in-JS helper ─── */
const injectStyles = () => { 
  if (document.getElementById("hms-styles")) return;
  const s = document.createElement("style");
  s.id = "hms-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes float    { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-14px); } }
    @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:.4; } }
    @keyframes spin     { to { transform:rotate(360deg); } }
    @keyframes shimmer  { 0% { background-position:-400px 0; } 100% { background-position:400px 0; } }
    @keyframes orb      { 0%,100% { transform:translate(-50%,-50%) scale(1); } 50% { transform:translate(-50%,-50%) scale(1.15); } }
    @keyframes slideLeft  { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
    @keyframes slideRight { from { opacity:0; transform:translateX(40px);  } to { opacity:1; transform:translateX(0); } }
    @keyframes scaleIn  { from { opacity:0; transform:scale(.85); } to { opacity:1; transform:scale(1); } }
    @keyframes starPop  { 0% { transform:scale(0) rotate(-30deg); opacity:0; }
                          70% { transform:scale(1.3) rotate(5deg); opacity:1; }
                          100%{ transform:scale(1)   rotate(0deg); opacity:1; } }
    @keyframes countUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes borderGlow { 0%,100% { box-shadow:0 0 0 0 rgba(99,102,241,0); }
                            50%      { box-shadow:0 0 0 6px rgba(99,102,241,.22); } }

    .hms-hero-btn { transition: transform .18s, box-shadow .18s, opacity .18s !important; }
    .hms-hero-btn:hover { transform: translateY(-2px) scale(1.03) !important; }

    .hms-card {
      transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease !important;
      cursor: default;
    }
    .hms-card:hover { transform: translateY(-6px) scale(1.01) !important; }

    .hms-service-card {
      transition: transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, border-color .3s !important;
    }
    .hms-service-card:hover {
      transform: translateY(-8px) !important;
      border-color: #6366f1 !important;
      box-shadow: 0 20px 48px rgba(99,102,241,.18) !important;
    }

    .hms-star { display:inline-block; }

    .hms-feedback-card {
      transition: transform .25s ease, box-shadow .25s ease !important;
    }
    .hms-feedback-card:hover {
      transform: translateY(-5px) !important;
      box-shadow: 0 20px 48px rgba(99,102,241,.15) !important;
    }

    .hms-why-item {
      transition: transform .25s ease, background .25s !important;
    }
    .hms-why-item:hover {
      transform: translateX(6px) !important;
      background: rgba(99,102,241,.07) !important;
    }

    .hms-tab-btn {
      transition: background .2s, color .2s, box-shadow .2s !important;
    }
    .hms-tab-btn:hover { background: rgba(99,102,241,.12) !important; }

    .hms-reveal { opacity:0; transform:translateY(28px); transition: opacity .6s ease, transform .6s ease; }
    .hms-reveal.visible { opacity:1; transform:translateY(0); }

    .hms-reveal-left  { opacity:0; transform:translateX(-36px); transition: opacity .6s ease, transform .6s ease; }
    .hms-reveal-left.visible  { opacity:1; transform:translateX(0); }
    .hms-reveal-right { opacity:0; transform:translateX(36px);  transition: opacity .6s ease, transform .6s ease; }
    .hms-reveal-right.visible { opacity:1; transform:translateX(0); }

    .hms-counter { font-variant-numeric: tabular-nums; }

    .hms-gradient-text {
      background: linear-gradient(135deg, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hms-input {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.18);
      border-radius: 10px;
      color: #e2e8f0;
      padding: 12px 16px;
      font-size: 14px;
      font-family: 'DM Sans', sans-serif;
      outline: none;
      transition: border-color .2s, box-shadow .2s;
      resize: vertical;
    }
    .hms-input:focus {
      border-color: #818cf8;
      box-shadow: 0 0 0 3px rgba(129,140,248,.2);
    }
    .hms-input::placeholder { color: #64748b; }

    .hms-rating-star { cursor:pointer; transition:transform .15s; font-size:26px; }
    .hms-rating-star:hover { transform: scale(1.25) rotate(-8deg); }

    .hms-submit-btn {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color:#fff; border:none; border-radius:12px;
      padding:13px 32px; font-weight:700; font-size:15px;
      font-family:'DM Sans',sans-serif; cursor:pointer;
      box-shadow: 0 8px 24px rgba(99,102,241,.4);
      transition: transform .18s, box-shadow .18s;
    }
    .hms-submit-btn:hover { transform:translateY(-2px); box-shadow: 0 12px 32px rgba(99,102,241,.55); }
    .hms-submit-btn:active { transform:scale(.97); }

    .hms-orb {
      position:absolute; border-radius:50%;
      filter:blur(80px); pointer-events:none;
      animation: orb 6s ease-in-out infinite;
    }
  `;
  document.head.appendChild(s);
};

/* ─── Intersection observer hook ─── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/\D/g, "")) || 0;
        const dur = 1600, steps = 50;
        let i = 0;
        const t = setInterval(() => {
          i++;
          setCount(Math.round((num * i) / steps));
          if (i >= steps) clearInterval(t);
        }, dur / steps);
        io.unobserve(el);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref} className="hms-counter">{count}{suffix}</span>;
}

/* ─── Star rating display ─── */
function Stars({ rating }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} className="hms-star"
          style={{ fontSize:15, color: i <= rating ? "#fbbf24" : "#334155",
                   animation: i <= rating ? `starPop .4s ${i*0.08}s both` : "none" }}>
          ★
        </span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const role  = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => { injectStyles(); }, []);

  /* ── feedback form state ── */
  const [fbRating, setFbRating]   = useState(0);
  const [fbHover,  setFbHover]    = useState(0);
  const [fbName,   setFbName]     = useState("");
  const [fbText,   setFbText]     = useState("");
  const [fbSent,   setFbSent]     = useState(false);
  const [activeService, setActiveService] = useState(0);

  const handleFbSubmit = () => {
    if (!fbName.trim() || !fbText.trim() || !fbRating) return;
    setFbSent(true);
    setTimeout(() => { setFbSent(false); setFbName(""); setFbText(""); setFbRating(0); }, 3200);
  };

  /* ── reveal refs ── */
  const servicesRef  = useReveal();
  const whyRef       = useReveal();
  const feedbackRef  = useReveal();
  const ctaRef       = useReveal();
  const statsRowRef  = useReveal();

  /* ── data ── */
  const features = [
    { icon:"🏥", title:"Easy Appointments", desc:"Book and manage appointments with top doctors in just a few clicks." },
    { icon:"👨‍⚕️", title:"Expert Doctors",    desc:"Access a wide network of verified specialists across all medical fields." },
    { icon:"📋", title:"Health Records",    desc:"Keep track of your medical history and appointment status anytime." },
    { icon:"⚡", title:"Fast & Reliable",  desc:"Get instant confirmations and real-time updates on your appointments." },
  ];

  const stats = [
    { raw:"500", suffix:"+", label:"Doctors" },
    { raw:"10000", suffix:"+", label:"Patients" },
    { raw:"98", suffix:"%", label:"Satisfaction" },
    { raw:"24", suffix:"/7", label:"Support" },
  ];

  const services = [
    {
      icon:"🩺", title:"General Consultation",
      desc:"Connect with experienced GPs for everyday health concerns. Get professional advice without long waits.",
      tags:["Online","In-Person","Same-day"],
    },
    {
      icon:"🧬", title:"Specialist Care",
      desc:"Access cardiologists, neurologists, dermatologists and 30+ other specialist fields under one roof.",
      tags:["Referral","Priority","Expert"],
    },
    {
      icon:"💊", title:"Pharmacy & Prescriptions",
      desc:"Digital prescriptions, auto-refills and home delivery of medicines with real-time tracking.",
      tags:["Digital Rx","Delivery","24/7"],
    },
    {
      icon:"🔬", title:"Lab & Diagnostics",
      desc:"Book blood tests, imaging and pathology from certified labs. Receive reports directly in your dashboard.",
      tags:["Home Sample","Fast Report","Certified"],
    },
    {
      icon:"🧠", title:"Mental Wellness",
      desc:"Confidential sessions with licensed therapists and psychiatrists. Your wellbeing matters.",
      tags:["Private","Licensed","Flexible"],
    },
    {
      icon:"🏃", title:"Preventive Health",
      desc:"Annual health packages, vaccination schedules and lifestyle coaching to stay ahead of illness.",
      tags:["Packages","Vaccines","Coaching"],
    },
  ];

  const whyItems = [
    { icon:"✅", title:"Verified Professionals",  desc:"Every doctor is credentialed, licensed and background-checked before listing." },
    { icon:"🔒", title:"Data Privacy First",       desc:"Your medical records are encrypted end-to-end. You control who sees what." },
    { icon:"⏱️", title:"Zero Waiting Rooms",       desc:"Virtual queues and real-time slot management eliminate unnecessary waits." },
    { icon:"💰", title:"Transparent Pricing",      desc:"Upfront costs with no hidden fees. Compare packages before you decide." },
    { icon:"🌐", title:"Multi-language Support",   desc:"Available in Nepali, English and Hindi so nobody gets left behind." },
    { icon:"📱", title:"Works Everywhere",          desc:"Seamless experience on any device — mobile, tablet or desktop." },
  ];

  const testimonials = [
    { name:"Sita Maharjan", role:"Patient",          rating:5, avatar:"SM", color:"#6366f1",
      text:"Booking an appointment used to take half my day. Now it takes 2 minutes. The doctor was excellent and my records were ready before I even arrived." },
    { name:"Dr. Ramesh KC",  role:"Cardiologist",     rating:5, avatar:"RK", color:"#8b5cf6",
      text:"The doctor dashboard is incredibly intuitive. I can manage my entire schedule, view patient history and send prescriptions without switching apps." },
    { name:"Priya Shrestha", role:"Patient",          rating:4, avatar:"PS", color:"#06b6d4",
      text:"I was skeptical at first, but the lab results feature is a game-changer. Got my reports in 3 hours and my doctor reviewed them the same day." },
    { name:"Anil Tamang",    role:"Hospital Admin",   rating:5, avatar:"AT", color:"#10b981",
      text:"We onboarded 80 doctors in one week. The admin panel gives us real-time occupancy, revenue and patient flow data — priceless." },
  ];

  /* ─────────────────────────────── RENDER ─────────────────────────────── */
  const font = "'Sora', 'DM Sans', sans-serif";

  return (
    <div style={{ fontFamily: font, background:"#f1f5f9", minHeight:"100vh", overflowX:"hidden" }}>

      {/* ════════════ HERO ════════════ */}
      <div style={{
        background:"linear-gradient(145deg,#0f172a 0%,#1e1b4b 50%,#312e81 100%)",
        padding:"90px 40px 80px",
        position:"relative", overflow:"hidden", textAlign:"center",
      }}>
        {/* animated orbs */}
        <div className="hms-orb" style={{ width:520,height:520,top:"50%",left:"20%",
          background:"rgba(99,102,241,.18)", animationDelay:"0s" }} />
        <div className="hms-orb" style={{ width:380,height:380,top:"30%",left:"70%",
          background:"rgba(139,92,246,.15)", animationDelay:"-3s" }} />

        {/* rings */}
        {[...Array(4)].map((_,i) => (
          <div key={i} style={{
            position:"absolute",
            width:250+i*180, height:250+i*180, borderRadius:"50%",
            border:"1px solid rgba(255,255,255,0.04)",
            top:"50%", left:"50%", transform:"translate(-50%,-50%)",
            pointerEvents:"none",
          }}/>
        ))}

        {/* badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(99,102,241,.2)", border:"1px solid rgba(99,102,241,.4)",
          padding:"6px 16px", borderRadius:20, marginBottom:24,
          animation:"fadeIn .8s .1s both",
        }}>
          <span style={{width:8,height:8,borderRadius:"50%",background:"#818cf8",display:"inline-block",
            animation:"pulse 2s infinite"}} />
          <span style={{color:"#a5b4fc",fontSize:13,fontWeight:600}}>Nepal's #1 Hospital </span>
        </div>

        <h1 style={{
          margin:"0 0 20px", fontSize:"clamp(34px,5vw,58px)",
          fontWeight:900, color:"#f8fafc", lineHeight:1.12,
          letterSpacing:"-1.5px", position:"relative", zIndex:1,
          animation:"fadeUp .8s .25s both",
        }}>
          Your Health,{" "}
          <span className="hms-gradient-text">Our Priority</span>
        </h1>

        <p style={{
          margin:"0 auto 40px", maxWidth:520, color:"#94a3b8",
          fontSize:17, lineHeight:1.75, position:"relative", zIndex:1,
          animation:"fadeUp .8s .4s both",
        }}>
          Connect with top doctors, book appointments instantly, and manage your health records — all in one place.
        </p>

        {/* CTA */}
        <div style={{
          display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap",
          position:"relative", zIndex:1, animation:"fadeUp .8s .55s both",
        }}>
          {!token ? (
            <>
              <button className="hms-hero-btn"
                onClick={() => navigate("/register")}
                style={{
                  background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                  color:"#fff", border:"none",
                  padding:"14px 32px", borderRadius:12,
                  fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"inherit",
                  boxShadow:"0 8px 24px rgba(99,102,241,.45)",
                }}>
                Get Started Free
              </button>
              <button className="hms-hero-btn"
                onClick={() => navigate("/login")}
                style={{
                  background:"rgba(255,255,255,.08)", color:"#e2e8f0",
                  border:"1px solid rgba(255,255,255,.18)",
                  padding:"14px 32px", borderRadius:12,
                  fontWeight:600, fontSize:16, cursor:"pointer", fontFamily:"inherit",
                }}>
                Sign In
              </button>
            </>
          ) : (
            <button className="hms-hero-btn"
              onClick={() => navigate(role==="admin"?"/admin":role==="doctor"?"/doctor-dashboard":"/doctors")}
              style={{
                background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                color:"#fff", border:"none",
                padding:"14px 32px", borderRadius:12,
                fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"inherit",
                boxShadow:"0 8px 24px rgba(99,102,241,.45)",
              }}>
              Go to Dashboard →
            </button>
          )}
        </div>

        {/* Stats with animated counters */}
        <div ref={statsRowRef} className="hms-reveal"
          style={{
            display:"flex", justifyContent:"center", gap:48,
            marginTop:60, flexWrap:"wrap", position:"relative", zIndex:1,
          }}>
          {stats.map((s) => (
            <div key={s.label} style={{textAlign:"center"}}>
              <p style={{margin:0, fontSize:30, fontWeight:900, color:"#f8fafc"}}>
                <Counter target={s.raw} suffix={s.suffix} />
              </p>
              <p style={{margin:"4px 0 0", fontSize:13, color:"#64748b", fontWeight:500}}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ FEATURES ════════════ */}
      <div style={{padding:"80px 40px", maxWidth:1100, margin:"0 auto"}}>
        <div className="hms-reveal" ref={useReveal()} style={{textAlign:"center", marginBottom:52}}>
          <span style={{
            display:"inline-block", background:"#ede9fe", color:"#7c3aed",
            fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase",
            padding:"4px 14px", borderRadius:20, marginBottom:12,
          }}>Core Features</span>
          <h2 style={{margin:"0 0 12px", fontSize:34, fontWeight:800, color:"#0f172a"}}>
            Everything you need
          </h2>
          <p style={{margin:0, color:"#64748b", fontSize:16}}>
            Designed to make healthcare simple and accessible for everyone.
          </p>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",
          gap:24,
        }}>
          {features.map((f, idx) => (
            <div key={f.title} className="hms-card hms-reveal"
              ref={useReveal()}
              style={{
                background:"#fff", borderRadius:18,
                border:"1px solid #e2e8f0", padding:"30px 26px",
                boxShadow:"0 2px 10px rgba(0,0,0,.05)",
                animationDelay:`${idx*0.1}s`,
              }}>
              <div style={{
                width:52, height:52, borderRadius:14, fontSize:26,
                background:"linear-gradient(135deg,#ede9fe,#ddd6fe)",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:18, animation:`float ${4+idx*.6}s ease-in-out infinite`,
              }}>{f.icon}</div>
              <h3 style={{margin:"0 0 8px", fontSize:17, fontWeight:700, color:"#0f172a"}}>{f.title}</h3>
              <p style={{margin:0, fontSize:14, color:"#64748b", lineHeight:1.65}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ OUR SERVICES ════════════ */}
      <div style={{background:"#0f172a", padding:"88px 40px", position:"relative", overflow:"hidden"}}>
        <div className="hms-orb" style={{width:600,height:600,top:"50%",left:"80%",
          background:"rgba(99,102,241,.08)"}} />

        <div ref={servicesRef} className="hms-reveal"
          style={{textAlign:"center", marginBottom:52, position:"relative", zIndex:1}}>
          <span style={{
            display:"inline-block", background:"rgba(99,102,241,.18)", color:"#a5b4fc",
            fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase",
            padding:"4px 14px", borderRadius:20, marginBottom:12,
          }}>What We Offer</span>
          <h2 style={{margin:"0 0 12px", fontSize:34, fontWeight:800, color:"#f8fafc"}}>
            Our <span className="hms-gradient-text">Services</span>
          </h2>
          <p style={{margin:0, color:"#64748b", fontSize:16, maxWidth:480, marginInline:"auto"}}>
            Comprehensive healthcare solutions designed around your needs.
          </p>
        </div>

        {/* Service tabs */}
        <div style={{
          display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap",
          marginBottom:36, position:"relative", zIndex:1,
        }}>
          {services.map((s, i) => (
            <button key={i} className="hms-tab-btn"
              onClick={() => setActiveService(i)}
              style={{
                background: activeService===i
                  ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                  : "rgba(255,255,255,.06)",
                color: activeService===i ? "#fff" : "#94a3b8",
                border: activeService===i ? "none" : "1px solid rgba(255,255,255,.1)",
                padding:"8px 18px", borderRadius:10,
                fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit",
                boxShadow: activeService===i ? "0 4px 14px rgba(99,102,241,.4)" : "none",
              }}>
              {s.icon} {s.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Service grid */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",
          gap:22, maxWidth:1100, margin:"0 auto",
          position:"relative", zIndex:1,
        }}>
          {services.map((s, i) => (
            <div key={i} className="hms-service-card"
              style={{
                background: activeService===i
                  ? "linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.12))"
                  : "rgba(255,255,255,.04)",
                border: activeService===i ? "1px solid #6366f1" : "1px solid rgba(255,255,255,.08)",
                borderRadius:16, padding:"28px 24px",
                boxShadow: activeService===i ? "0 12px 36px rgba(99,102,241,.18)" : "none",
                opacity: activeService===i ? 1 : 0.75,
              }}
              onClick={() => setActiveService(i)}>
              <div style={{
                fontSize:30, marginBottom:14,
                animation: activeService===i ? `float 3s ease-in-out infinite` : "none",
              }}>{s.icon}</div>
              <h3 style={{margin:"0 0 10px", fontSize:17, fontWeight:700, color:"#f1f5f9"}}>{s.title}</h3>
              <p style={{margin:"0 0 16px", fontSize:14, color:"#94a3b8", lineHeight:1.65}}>{s.desc}</p>
              <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
                {s.tags.map(tag => (
                  <span key={tag} style={{
                    background:"rgba(99,102,241,.2)", color:"#a5b4fc",
                    fontSize:11, fontWeight:700, padding:"3px 10px",
                    borderRadius:20, letterSpacing:.5,
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ WHY CHOOSE US ════════════ */}
      <div style={{padding:"88px 40px"}}>
        <div style={{maxWidth:1100, margin:"0 auto",
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:64,
          alignItems:"center",
        }}
          /* simple fallback for narrow screens via inline style — real project would use media query */
        >
          {/* left column */}
          <div ref={useReveal()} className="hms-reveal-left">
            <span style={{
              display:"inline-block", background:"#ede9fe", color:"#7c3aed",
              fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase",
              padding:"4px 14px", borderRadius:20, marginBottom:16,
            }}>Our Advantage</span>
            <h2 style={{margin:"0 0 16px", fontSize:"clamp(28px,3.5vw,40px)", fontWeight:800, color:"#0f172a", lineHeight:1.2}}>
              Why patients &<br/>doctors choose <span className="hms-gradient-text">Health Bridge</span>
            </h2>
            <p style={{margin:"0 0 28px", color:"#64748b", fontSize:16, lineHeight:1.75}}>
              We built Health Bridge by talking to hundreds of patients and doctors in Nepal — understanding their real pain points and designing solutions that actually work.
            </p>
            <button className="hms-hero-btn"
              onClick={() => navigate(token ? "/doctors" : "/register")}
              style={{
                background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                color:"#fff", border:"none",
                padding:"13px 28px", borderRadius:12,
                fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"inherit",
                boxShadow:"0 8px 24px rgba(99,102,241,.38)",
              }}>
              {token ? "Find a Doctor →" : "Join Free Today →"}
            </button>
          </div>

          {/* right column — why items */}
          <div ref={useReveal()} className="hms-reveal-right"
            style={{display:"flex", flexDirection:"column", gap:12}}>
            {whyItems.map((item, i) => (
              <div key={i} className="hms-why-item"
                style={{
                  display:"flex", gap:16, alignItems:"flex-start",
                  background:"#fff", borderRadius:14,
                  border:"1px solid #e2e8f0", padding:"18px 20px",
                  boxShadow:"0 2px 8px rgba(0,0,0,.04)",
                }}>
                <div style={{
                  fontSize:20, width:42, height:42, borderRadius:12, flexShrink:0,
                  background:"linear-gradient(135deg,#ede9fe,#ddd6fe)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>{item.icon}</div>
                <div>
                  <p style={{margin:"0 0 4px", fontSize:15, fontWeight:700, color:"#0f172a"}}>{item.title}</p>
                  <p style={{margin:0, fontSize:13, color:"#64748b", lineHeight:1.6}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <div style={{background:"#0f172a", padding:"88px 40px", position:"relative", overflow:"hidden"}}>
        <div className="hms-orb" style={{width:500,height:500,top:"50%",left:"10%",
          background:"rgba(6,182,212,.06)", animationDelay:"-2s"}} />

        <div ref={feedbackRef} className="hms-reveal"
          style={{textAlign:"center", marginBottom:52, position:"relative", zIndex:1}}>
          <span style={{
            display:"inline-block", background:"rgba(251,191,36,.12)", color:"#fbbf24",
            fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase",
            padding:"4px 14px", borderRadius:20, marginBottom:12,
          }}>Real Stories</span>
          <h2 style={{margin:"0 0 12px", fontSize:34, fontWeight:800, color:"#f8fafc"}}>
            What our users say
          </h2>
          <p style={{margin:0, color:"#64748b", fontSize:16}}>
            Over 10,000 patients and doctors trust HospitalMS every day.
          </p>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",
          gap:22, maxWidth:1100, margin:"0 auto",
          position:"relative", zIndex:1,
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="hms-feedback-card"
              style={{
                background:"rgba(255,255,255,.05)",
                border:"1px solid rgba(255,255,255,.09)",
                borderRadius:18, padding:"28px 24px",
              }}>
              {/* quote mark */}
              <div style={{fontSize:36, color:"rgba(99,102,241,.35)", lineHeight:1, marginBottom:12}}>"</div>
              <p style={{margin:"0 0 20px", fontSize:14, color:"#cbd5e1", lineHeight:1.75, fontStyle:"italic"}}>
                {t.text}
              </p>
              <Stars rating={t.rating} />
              <div style={{display:"flex", alignItems:"center", gap:12, marginTop:16}}>
                <div style={{
                  width:42, height:42, borderRadius:"50%",
                  background:`linear-gradient(135deg,${t.color},#c084fc)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontWeight:800, fontSize:14, color:"#fff", flexShrink:0,
                }}>{t.avatar}</div>
                <div>
                  <p style={{margin:0, fontSize:14, fontWeight:700, color:"#f1f5f9"}}>{t.name}</p>
                  <p style={{margin:0, fontSize:12, color:"#64748b"}}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ LEAVE FEEDBACK ════════════ */}
      <div style={{
        background:"linear-gradient(135deg,#1e1b4b,#0f172a)",
        padding:"80px 40px", position:"relative", overflow:"hidden",
      }}>
        <div className="hms-orb" style={{width:400,height:400,top:"50%",left:"60%",
          background:"rgba(139,92,246,.1)", animationDelay:"-1s"}} />

        <div style={{maxWidth:560, margin:"0 auto", position:"relative", zIndex:1}}>
          <div ref={useReveal()} className="hms-reveal" style={{textAlign:"center", marginBottom:40}}>
            <span style={{
              display:"inline-block", background:"rgba(99,102,241,.18)", color:"#a5b4fc",
              fontSize:12, fontWeight:700, letterSpacing:1, textTransform:"uppercase",
              padding:"4px 14px", borderRadius:20, marginBottom:12,
            }}>Your Voice Matters</span>
            <h2 style={{margin:"0 0 10px", fontSize:32, fontWeight:800, color:"#f8fafc"}}>
              Leave Your Feedback
            </h2>
            <p style={{margin:0, color:"#64748b", fontSize:15}}>
              Help us improve by sharing your experience.
            </p>
          </div>

          {fbSent ? (
            <div style={{
              background:"rgba(16,185,129,.12)", border:"1px solid rgba(16,185,129,.3)",
              borderRadius:16, padding:"32px", textAlign:"center",
              animation:"scaleIn .4s ease",
            }}>
              <div style={{fontSize:48, marginBottom:12, animation:"float 2s ease-in-out infinite"}}>🎉</div>
              <p style={{margin:"0 0 6px", fontSize:18, fontWeight:700, color:"#34d399"}}>Thank you!</p>
              <p style={{margin:0, fontSize:14, color:"#6ee7b7"}}>Your feedback has been received. We appreciate your time.</p>
            </div>
          ) : (
            <div style={{
              background:"rgba(255,255,255,.04)",
              border:"1px solid rgba(255,255,255,.1)",
              borderRadius:20, padding:"36px 32px",
            }}>
              {/* star rating input */}
              <div style={{marginBottom:24, textAlign:"center"}}>
                <p style={{margin:"0 0 10px", fontSize:13, color:"#94a3b8", fontWeight:600, letterSpacing:.5, textTransform:"uppercase"}}>
                  Rate your experience
                </p>
                <div style={{display:"flex", justifyContent:"center", gap:6}}>
                  {[1,2,3,4,5].map(n => (
                    <span key={n} className="hms-rating-star"
                      onMouseEnter={() => setFbHover(n)}
                      onMouseLeave={() => setFbHover(0)}
                      onClick={() => setFbRating(n)}
                      style={{color: n<=(fbHover||fbRating) ? "#fbbf24" : "#334155"}}>
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <div style={{display:"flex", flexDirection:"column", gap:14}}>
                <input
                  className="hms-input"
                  placeholder="Your name"
                  value={fbName}
                  onChange={e => setFbName(e.target.value)}
                  style={{width:"100%"}}
                />
                <textarea
                  className="hms-input"
                  placeholder="Share your experience with HospitalMS..."
                  rows={4}
                  value={fbText}
                  onChange={e => setFbText(e.target.value)}
                  style={{width:"100%"}}
                />
                <button className="hms-submit-btn" onClick={handleFbSubmit}
                  style={{alignSelf:"flex-end"}}>
                  Submit Feedback →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ════════════ CTA BANNER ════════════ */}
      {!token && (
        <div ref={ctaRef} className="hms-reveal"
          style={{
            margin:"0 40px 72px",
            background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
            borderRadius:22, padding:"52px 40px",
            textAlign:"center",
            boxShadow:"0 20px 56px rgba(99,102,241,.35)",
            position:"relative", overflow:"hidden",
          }}>
          <div style={{
            position:"absolute", top:-40, right:-40,
            width:200, height:200, borderRadius:"50%",
            background:"rgba(255,255,255,.08)",
          }}/>
          <div style={{
            position:"absolute", bottom:-60, left:-30,
            width:260, height:260, borderRadius:"50%",
            background:"rgba(255,255,255,.06)",
          }}/>
          <h2 style={{margin:"0 0 12px", fontSize:30, fontWeight:800, color:"#fff", position:"relative", zIndex:1}}>
            Ready to get started?
          </h2>
          <p style={{margin:"0 0 30px", color:"#c7d2fe", fontSize:16, position:"relative", zIndex:1}}>
            Create your free account and book your first appointment today.
          </p>
          <button className="hms-hero-btn"
            onClick={() => navigate("/register")}
            style={{
              background:"#fff", color:"#6366f1", border:"none",
              padding:"14px 34px", borderRadius:12,
              fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"inherit",
              boxShadow:"0 4px 16px rgba(0,0,0,.2)",
              position:"relative", zIndex:1,
            }}>
            Create Free Account →
          </button>
        </div>
      )}

      {/* ════════════ FOOTER ════════════ */}
      <div style={{
        background:"#0f172a", color:"#e2e8f0",
        padding:"60px 40px 30px", marginTop: token ? 40 : 0,
        position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", top:0, left:0, width:"100%", height:"3px",
          background:"linear-gradient(90deg,#6366f1,#8b5cf6,#22c55e)",
        }}/>

        <div style={{
          maxWidth:1100, margin:"0 auto",
          display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:40,
        }}>
          <div>
            <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:12}}>
              <div style={{
                width:36, height:36, borderRadius:10,
                background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontWeight:900, color:"#fff", fontFamily:"inherit",
              }}>H</div>
              <h3 style={{margin:0, fontSize:18, fontFamily:"inherit"}}>
                Hospital<span style={{color:"#818cf8"}}>MS</span>
              </h3>
            </div>
            <p style={{fontSize:14, color:"#94a3b8", lineHeight:1.65}}>
              Modern hospital management system to simplify appointments, doctors, and patient care in one powerful platform.
            </p>
          </div>

          <div>
            <h4 style={{marginBottom:12, fontFamily:"inherit"}}>Quick Links</h4>
            {["Home","Doctors","Appointments","About"].map(item => (
              <p key={item} style={{
                margin:"6px 0", fontSize:14, color:"#94a3b8", cursor:"pointer",
                transition:"color .2s",
              }}
                onMouseEnter={e => e.target.style.color="#fff"}
                onMouseLeave={e => e.target.style.color="#94a3b8"}
              >{item}</p>
            ))}
          </div>

          <div>
            <h4 style={{marginBottom:12, fontFamily:"inherit"}}>Support</h4>
            {["Help Center","Contact Us","Privacy Policy","Terms"].map(item => (
              <p key={item} style={{
                margin:"6px 0", fontSize:14, color:"#94a3b8", cursor:"pointer",
                transition:"color .2s",
              }}
                onMouseEnter={e => e.target.style.color="#fff"}
                onMouseLeave={e => e.target.style.color="#94a3b8"}
              >{item}</p>
            ))}
          </div>

          <div>
            <h4 style={{marginBottom:12, fontFamily:"inherit"}}>Follow Us</h4>
            <div style={{display:"flex", gap:10, marginBottom:16}}>
              {["📘","🐦","📸","💼"].map((icon, i) => (
                <div key={i} style={{
                  width:38, height:38, borderRadius:10,
                  background:"#1e293b", display:"flex", alignItems:"center",
                  justifyContent:"center", cursor:"pointer", transition:"background .2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background="#334155"}
                  onMouseLeave={e => e.currentTarget.style.background="#1e293b"}
                >{icon}</div>
              ))}
            </div>
            <p style={{fontSize:13, color:"#94a3b8"}}>contact@hospitalms.com</p>
          </div>
        </div>

        <div style={{
          borderTop:"1px solid rgba(255,255,255,.08)",
          marginTop:40, paddingTop:20,
          display:"flex", justifyContent:"space-between",
          flexWrap:"wrap", gap:10,
          fontSize:13, color:"#64748b",
          maxWidth:1100, marginInline:"auto",
        }}>
          <p style={{margin:0}}>© 2026 HospitalMS. All rights reserved.</p>
          <p style={{margin:0}}>Built with ❤️ for better healthcare in Nepal</p>
        </div>
      </div>

    </div>
  );
};

export default Home;