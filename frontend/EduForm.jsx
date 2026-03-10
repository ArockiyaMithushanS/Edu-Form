import { useState, useRef, useEffect } from "react";

function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = () => {
    setError("");
    if (!form.email || !form.password) { setError("Please fill in all required fields."); return; }
    if (mode === "signup") {
      if (!form.name) { setError("Please enter your name."); return; }
      if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
      if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: form.name || form.email.split("@")[0], email: form.email });
    }, 1200);
  };

  const authStyles = `
    .auth-wrap {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #0a0e1a;
    }
    @media(max-width:700px){ .auth-wrap{ grid-template-columns:1fr; } .auth-left{ display:none; } }

    .auth-left {
      background: linear-gradient(135deg, #0d1f3c 0%, #0a1628 60%, #060d1a 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 64px 56px;
      position: relative;
      overflow: hidden;
      border-right: 1px solid #1e2d45;
    }
    .auth-left::before {
      content: '';
      position: absolute;
      top: -120px; left: -80px;
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(245,200,66,0.07) 0%, transparent 65%);
      pointer-events: none;
    }
    .auth-left::after {
      content: '';
      position: absolute;
      bottom: -100px; right: -60px;
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(34,211,200,0.06) 0%, transparent 65%);
      pointer-events: none;
    }
    .auth-brand {
      font-family: 'Syne', sans-serif;
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 12px;
    }
    .auth-brand span { color: #f5c842; }
    .auth-tagline {
      color: #7a8aaa;
      font-size: 1rem;
      line-height: 1.6;
      max-width: 340px;
      margin-bottom: 48px;
    }
    .auth-features { display: flex; flex-direction: column; gap: 18px; }
    .auth-feature {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }
    .auth-feature-icon {
      width: 38px; height: 38px;
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .auth-feature-icon.y { background: rgba(245,200,66,0.12); border: 1px solid rgba(245,200,66,0.2); }
    .auth-feature-icon.t { background: rgba(34,211,200,0.1); border: 1px solid rgba(34,211,200,0.2); }
    .auth-feature-text h4 {
      font-family: 'Syne', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      margin-bottom: 3px;
    }
    .auth-feature-text p { font-size: 0.78rem; color: #7a8aaa; line-height: 1.5; }

    .auth-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 48px 40px;
      background: #0a0e1a;
    }
    .auth-box {
      width: 100%;
      max-width: 400px;
    }
    .auth-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .auth-subtitle { color: #7a8aaa; font-size: 0.88rem; margin-bottom: 36px; }

    .auth-toggle {
      display: flex;
      background: #111827;
      border-radius: 12px;
      padding: 4px;
      margin-bottom: 28px;
      border: 1px solid #1e2d45;
    }
    .auth-toggle-btn {
      flex: 1;
      padding: 9px;
      border-radius: 9px;
      border: none;
      background: transparent;
      color: #7a8aaa;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .auth-toggle-btn.active {
      background: #1a2235;
      color: #e8eaf0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }

    .auth-field { margin-bottom: 16px; }
    .auth-field label {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #7a8aaa;
      margin-bottom: 8px;
    }
    .auth-input-wrap { position: relative; }
    .auth-input {
      width: 100%;
      background: #111827;
      border: 1px solid #1e2d45;
      border-radius: 10px;
      padding: 12px 44px 12px 14px;
      color: #e8eaf0;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .auth-input:focus { border-color: rgba(245,200,66,0.5); }
    .auth-input-icon {
      position: absolute;
      right: 14px; top: 50%;
      transform: translateY(-50%);
      color: #7a8aaa;
      font-size: 0.95rem;
      cursor: pointer;
      user-select: none;
    }

    .auth-error {
      background: rgba(255,107,107,0.1);
      border: 1px solid rgba(255,107,107,0.25);
      border-radius: 10px;
      padding: 11px 14px;
      color: #ff6b6b;
      font-size: 0.83rem;
      margin-bottom: 16px;
    }

    .auth-submit {
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      border: none;
      background: #f5c842;
      color: #0a0e1a;
      font-family: 'Syne', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      letter-spacing: 0.4px;
      transition: all 0.2s;
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .auth-submit:hover { background: #e8b930; transform: translateY(-1px); }
    .auth-submit:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

    .auth-divider {
      display: flex; align-items: center; gap: 12px;
      margin: 22px 0;
      color: #3a4a60; font-size: 0.78rem;
    }
    .auth-divider::before, .auth-divider::after {
      content: ''; flex: 1; height: 1px; background: #1e2d45;
    }

    .auth-social {
      display: flex; gap: 10px;
    }
    .auth-social-btn {
      flex: 1;
      padding: 11px;
      border-radius: 10px;
      border: 1px solid #1e2d45;
      background: #111827;
      color: #e8eaf0;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      font-family: 'DM Sans', sans-serif;
    }
    .auth-social-btn:hover { border-color: #2a3d55; background: #1a2235; }

    .auth-footer {
      text-align: center;
      margin-top: 24px;
      font-size: 0.83rem;
      color: #7a8aaa;
    }
    .auth-footer button {
      background: none; border: none;
      color: #f5c842; font-weight: 600;
      cursor: pointer; font-family: 'DM Sans', sans-serif;
      font-size: 0.83rem;
    }
    .auth-footer button:hover { text-decoration: underline; }

    .auth-spin {
      width: 18px; height: 18px;
      border-radius: 50%;
      border: 2px solid rgba(10,14,26,0.3);
      border-top-color: #0a0e1a;
      animation: spin 0.7s linear infinite;
      display: inline-block;
    }
  `;

  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-wrap">
        {/* LEFT PANEL */}
        <div className="auth-left">
          <div className="auth-brand">Edu<span>Form</span></div>
          <p className="auth-tagline">
            Your AI-powered virtual tutor for smarter exam prep and structured skill development.
          </p>
          <div className="auth-features">
            {[
              { icon: "📝", cls: "y", title: "Exam Mode", desc: "Generate predicted questions & model answers based on your syllabus." },
              { icon: "🚀", cls: "t", title: "Course Mode", desc: "Personalized learning roadmaps for any skill, built around your schedule." },
              { icon: "🎯", cls: "y", title: "Smart Assessments", desc: "AI quizzes that adapt to your progress and find your weak spots." },
              { icon: "👥", cls: "t", title: "Community", desc: "Study with peers, share notes, and join group challenges." },
            ].map((f, i) => (
              <div key={i} className="auth-feature">
                <div className={`auth-feature-icon ${f.cls}`}>{f.icon}</div>
                <div className="auth-feature-text">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">
          <div className="auth-box">
            <div className="auth-title">{mode === "login" ? "Welcome back 👋" : "Get started 🎓"}</div>
            <p className="auth-subtitle">
              {mode === "login" ? "Sign in to continue your learning journey." : "Create your free account and start learning smarter."}
            </p>

            <div className="auth-toggle">
              <button className={`auth-toggle-btn ${mode === "login" ? "active" : ""}`} onClick={() => { setMode("login"); setError(""); }}>Sign In</button>
              <button className={`auth-toggle-btn ${mode === "signup" ? "active" : ""}`} onClick={() => { setMode("signup"); setError(""); }}>Sign Up</button>
            </div>

            {mode === "signup" && (
              <div className="auth-field">
                <label>Full Name</label>
                <div className="auth-input-wrap">
                  <input className="auth-input" placeholder="Your full name" value={form.name} onChange={e => update("name", e.target.value)} />
                  <span className="auth-input-icon">👤</span>
                </div>
              </div>
            )}

            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <input className="auth-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
                <span className="auth-input-icon">✉️</span>
              </div>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrap">
                <input className="auth-input" type={showPass ? "text" : "password"} placeholder={mode === "signup" ? "Min. 6 characters" : "Enter password"} value={form.password} onChange={e => update("password", e.target.value)} />
                <span className="auth-input-icon" onClick={() => setShowPass(p => !p)}>{showPass ? "🙈" : "👁️"}</span>
              </div>
            </div>

            {mode === "signup" && (
              <div className="auth-field">
                <label>Confirm Password</label>
                <div className="auth-input-wrap">
                  <input className="auth-input" type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => update("confirm", e.target.value)} />
                  <span className="auth-input-icon">🔒</span>
                </div>
              </div>
            )}

            {error && <div className="auth-error">⚠️ {error}</div>}

            <button className="auth-submit" onClick={submit} disabled={loading}>
              {loading ? <><span className="auth-spin" /> {mode === "login" ? "Signing in..." : "Creating account..."}</> : mode === "login" ? "Sign In →" : "Create Account →"}
            </button>

            <div className="auth-divider">or continue with</div>
            <div className="auth-social">
              <button className="auth-social-btn" onClick={() => onLogin({ name: "Google User", email: "user@gmail.com" })}>🔵 Google</button>
              <button className="auth-social-btn" onClick={() => onLogin({ name: "GitHub User", email: "user@github.com" })}>⚫ GitHub</button>
            </div>

            <div className="auth-footer">
              {mode === "login"
                ? <>Don't have an account? <button onClick={() => { setMode("signup"); setError(""); }}>Sign up free</button></>
                : <>Already have an account? <button onClick={() => { setMode("login"); setError(""); }}>Sign in</button></>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const COLORS = {
  bg: "#0a0e1a",
  surface: "#111827",
  card: "#1a2235",
  border: "#1e2d45",
  accent: "#f5c842",
  accentDim: "#b8932e",
  teal: "#22d3c8",
  tealDim: "#0f9e94",
  text: "#e8eaf0",
  muted: "#7a8aaa",
  danger: "#ff6b6b",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${COLORS.bg};
    color: ${COLORS.text};
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: radial-gradient(ellipse at 20% 20%, #0d1f3c 0%, #0a0e1a 60%);
  }

  /* NAVBAR */
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 48px;
    border-bottom: 1px solid ${COLORS.border};
    background: rgba(10,14,26,0.85);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .logo {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.5px;
  }
  .logo span { color: ${COLORS.accent}; }
  .nav-tabs {
    display: flex;
    gap: 8px;
  }
  .nav-tab {
    padding: 8px 22px;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;
    background: transparent;
    color: ${COLORS.muted};
  }
  .nav-tab:hover { color: ${COLORS.text}; border-color: ${COLORS.border}; }
  .nav-tab.active {
    background: ${COLORS.accent};
    color: #0a0e1a;
    font-weight: 700;
    border-color: ${COLORS.accent};
  }
  .nav-tab.teal.active {
    background: ${COLORS.teal};
    color: #0a0e1a;
    border-color: ${COLORS.teal};
  }
  .badge {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 50px;
    background: rgba(245,200,66,0.15);
    color: ${COLORS.accent};
    border: 1px solid rgba(245,200,66,0.3);
    font-weight: 600;
  }

  /* HERO */
  .hero {
    padding: 80px 48px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    top: -100px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 300px;
    background: radial-gradient(ellipse, rgba(245,200,66,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border-radius: 50px;
    border: 1px solid rgba(34,211,200,0.3);
    background: rgba(34,211,200,0.07);
    color: ${COLORS.teal};
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 16px;
  }
  .hero h1 em { font-style: normal; color: ${COLORS.accent}; }
  .hero p {
    color: ${COLORS.muted};
    font-size: 1.05rem;
    max-width: 520px;
    margin: 0 auto 40px;
    line-height: 1.7;
  }
  .mode-cards {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .mode-hero-card {
    padding: 28px 36px;
    border-radius: 16px;
    border: 1px solid ${COLORS.border};
    background: ${COLORS.card};
    cursor: pointer;
    transition: all 0.25s;
    min-width: 220px;
    text-align: left;
    position: relative;
    overflow: hidden;
  }
  .mode-hero-card::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.25s;
    border-radius: 16px;
  }
  .mode-hero-card.exam::before { background: radial-gradient(circle at top left, rgba(245,200,66,0.1), transparent 70%); }
  .mode-hero-card.course::before { background: radial-gradient(circle at top left, rgba(34,211,200,0.1), transparent 70%); }
  .mode-hero-card:hover { transform: translateY(-4px); }
  .mode-hero-card:hover::before { opacity: 1; }
  .mode-hero-card:hover.exam { border-color: rgba(245,200,66,0.4); }
  .mode-hero-card:hover.course { border-color: rgba(34,211,200,0.4); }
  .mode-icon { font-size: 2rem; margin-bottom: 12px; }
  .mode-hero-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .mode-hero-card p { font-size: 0.83rem; color: ${COLORS.muted}; line-height: 1.5; }

  /* MAIN CONTENT */
  .main { padding: 0 48px 80px; max-width: 1100px; margin: 0 auto; }

  /* SECTION HEADER */
  .section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 32px;
  }
  .section-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
  }
  .section-dot.exam { background: ${COLORS.accent}; box-shadow: 0 0 12px ${COLORS.accent}; }
  .section-dot.course { background: ${COLORS.teal}; box-shadow: 0 0 12px ${COLORS.teal}; }
  .section-header h2 {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
  }

  /* FORMS */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
  .form-panel {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 20px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .form-panel h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: ${COLORS.accent};
  }
  .form-panel.course h3 { color: ${COLORS.teal}; }

  label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: ${COLORS.muted};
    margin-bottom: 8px;
  }
  input, select, textarea {
    width: 100%;
    background: ${COLORS.surface};
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    padding: 12px 14px;
    color: ${COLORS.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
    resize: vertical;
  }
  input:focus, select:focus, textarea:focus {
    border-color: rgba(245,200,66,0.5);
  }
  .course-input:focus { border-color: rgba(34,211,200,0.5) !important; }
  select option { background: ${COLORS.surface}; }

  /* UPLOAD ZONE */
  .upload-zone {
    border: 2px dashed ${COLORS.border};
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: ${COLORS.surface};
    position: relative;
  }
  .upload-zone:hover { border-color: rgba(245,200,66,0.4); background: rgba(245,200,66,0.03); }
  .upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .upload-icon { font-size: 2rem; margin-bottom: 8px; }
  .upload-zone p { font-size: 0.83rem; color: ${COLORS.muted}; }
  .upload-zone .filename { color: ${COLORS.accent}; font-weight: 600; margin-top: 4px; }

  /* MARK BUTTONS */
  .mark-btns { display: flex; gap: 8px; flex-wrap: wrap; }
  .mark-btn {
    padding: 7px 16px;
    border-radius: 8px;
    border: 1px solid ${COLORS.border};
    background: ${COLORS.surface};
    color: ${COLORS.muted};
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  .mark-btn:hover, .mark-btn.active {
    background: rgba(245,200,66,0.15);
    border-color: ${COLORS.accent};
    color: ${COLORS.accent};
  }

  /* SUBMIT BTN */
  .submit-btn {
    width: 100%;
    padding: 14px;
    border-radius: 12px;
    border: none;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.5px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .submit-btn.exam {
    background: ${COLORS.accent};
    color: #0a0e1a;
  }
  .submit-btn.exam:hover { background: #e8b930; transform: translateY(-1px); }
  .submit-btn.course {
    background: ${COLORS.teal};
    color: #0a0e1a;
  }
  .submit-btn.course:hover { background: #1bc4ba; transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* OUTPUT */
  .output-section { margin-top: 48px; }
  .output-card {
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 20px;
    overflow: hidden;
  }
  .output-header {
    padding: 20px 28px;
    border-bottom: 1px solid ${COLORS.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .output-header h3 {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
  }
  .output-body { padding: 28px; }

  /* AI RESPONSE */
  .ai-response {
    line-height: 1.8;
    font-size: 0.92rem;
    color: ${COLORS.text};
    white-space: pre-wrap;
  }
  .ai-response h1, .ai-response h2, .ai-response h3 {
    font-family: 'Syne', sans-serif;
    color: ${COLORS.accent};
    margin: 20px 0 10px;
  }
  .ai-response.course-response h1, .ai-response.course-response h2, .ai-response.course-response h3 {
    color: ${COLORS.teal};
  }

  /* LOADING */
  .loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 48px;
  }
  .spinner {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 3px solid ${COLORS.border};
    border-top-color: ${COLORS.accent};
    animation: spin 0.8s linear infinite;
  }
  .spinner.course { border-top-color: ${COLORS.teal}; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-wrap p { color: ${COLORS.muted}; font-size: 0.88rem; }

  /* STREAMED TEXT */
  .stream-cursor::after {
    content: '▋';
    animation: blink 1s step-end infinite;
    color: ${COLORS.accent};
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* TABS */
  .tabs { display: flex; gap: 6px; margin-bottom: 28px; }
  .tab {
    padding: 9px 22px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid ${COLORS.border};
    background: transparent;
    color: ${COLORS.muted};
    transition: all 0.2s;
  }
  .tab.active.exam { background: rgba(245,200,66,0.12); color: ${COLORS.accent}; border-color: rgba(245,200,66,0.3); }
  .tab.active.course { background: rgba(34,211,200,0.12); color: ${COLORS.teal}; border-color: rgba(34,211,200,0.3); }

  /* DIVIDER */
  .divider {
    height: 1px;
    background: ${COLORS.border};
    margin: 40px 0;
  }

  /* CHIPS */
  .chips { display: flex; gap: 6px; flex-wrap: wrap; }
  .chip {
    padding: 4px 12px;
    border-radius: 50px;
    font-size: 0.75rem;
    font-weight: 600;
    background: rgba(245,200,66,0.1);
    color: ${COLORS.accent};
    border: 1px solid rgba(245,200,66,0.2);
  }
  .chip.teal {
    background: rgba(34,211,200,0.1);
    color: ${COLORS.teal};
    border-color: rgba(34,211,200,0.2);
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .navbar { padding: 16px 20px; }
    .hero { padding: 48px 20px 40px; }
    .hero h1 { font-size: 2rem; }
    .main { padding: 0 20px 60px; }
    .form-grid { grid-template-columns: 1fr; }
  }

  /* FORMATTED RESPONSE */
  .response-block {
    background: ${COLORS.surface};
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 16px;
    border-left: 3px solid ${COLORS.accent};
    line-height: 1.7;
    font-size: 0.91rem;
  }
  .response-block.course-block { border-left-color: ${COLORS.teal}; }
`;

function FormattedResponse({ text, mode }) {
  const isExam = mode === "exam";
  const color = isExam ? COLORS.accent : COLORS.teal;
  const blockClass = isExam ? "response-block" : "response-block course-block";

  // Parse markdown-like content
  const lines = text.split("\n");
  const elements = [];
  let buffer = [];
  let key = 0;

  const flushBuffer = () => {
    if (buffer.length > 0) {
      elements.push(
        <div key={key++} className={blockClass}>
          {buffer.map((l, i) => <span key={i}>{l}<br/></span>)}
        </div>
      );
      buffer = [];
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      flushBuffer();
      elements.push(
        <h2 key={key++} style={{ fontFamily: "Syne, sans-serif", fontSize: "1.15rem", fontWeight: 700, color, margin: "28px 0 12px" }}>
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      flushBuffer();
      elements.push(
        <h1 key={key++} style={{ fontFamily: "Syne, sans-serif", fontSize: "1.4rem", fontWeight: 800, color, margin: "32px 0 16px" }}>
          {line.replace("# ", "")}
        </h1>
      );
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      flushBuffer();
      elements.push(
        <p key={key++} style={{ fontWeight: 700, color, margin: "16px 0 6px", fontSize: "0.95rem" }}>
          {line.replace(/\*\*/g, "")}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      buffer.push("• " + line.slice(2));
    } else if (line.trim() === "") {
      flushBuffer();
    } else {
      buffer.push(line);
    }
  });
  flushBuffer();

  return <div>{elements}</div>;
}

function ExamMode() {
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("university");
  const [examDate, setExamDate] = useState("");
  const [marks, setMarks] = useState([]);
  const [syllabus, setSyllabus] = useState("");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("questions");
  const fileRef = useRef();

  const toggleMark = (m) => setMarks(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFileName(f.name);
      const reader = new FileReader();
      reader.onload = (ev) => setNotes(ev.target.result.slice(0, 3000));
      reader.readAsText(f);
    }
  };

  const generate = async () => {
    if (!subject) return;
    setLoading(true);
    setResult("");

    const markStr = marks.length ? marks.join(", ") + " marks questions" : "mixed question types";
    const daysLeft = examDate ? `Exam in ${Math.ceil((new Date(examDate) - new Date()) / 86400000)} days.` : "";

    const prompts = {
      questions: `You are Edu-Form, an AI exam tutor. Generate important exam questions and detailed model answers for:
Subject: ${subject}
Exam Type: ${examType}
Mark Distribution: ${markStr}
${daysLeft}
${syllabus ? `Syllabus Topics: ${syllabus}` : ""}
${notes ? `Study Notes Provided: ${notes.slice(0, 1500)}` : ""}

Generate:
1. Top 5 most important questions likely to appear
2. For each question, provide a structured model answer appropriate for the mark weight
3. Key topics to focus on
4. Study tips for this exam

Format with clear headings and structure.`,
      quiz: `You are Edu-Form. Create a practice quiz for:
Subject: ${subject}, Exam Type: ${examType}, ${daysLeft}
${syllabus ? `Topics: ${syllabus}` : ""}

Generate 8 multiple-choice questions with 4 options each. Mark correct answers with ✓. Include a brief explanation for each answer. Format clearly.`,
      topics: `You are Edu-Form. Analyze and prioritize exam topics for:
Subject: ${subject}, Exam Type: ${examType}, ${daysLeft}, Mark Distribution: ${markStr}
${syllabus ? `Syllabus: ${syllabus}` : ""}
${notes ? `Notes: ${notes.slice(0, 1000)}` : ""}

Provide:
1. High-priority topics (likely to have high marks)
2. Medium-priority topics
3. Quick-revision topics
4. Suggested study schedule based on days remaining
Be specific and actionable.`
    };

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompts[activeTab] }]
        })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "Unable to generate response.");
    } catch {
      setResult("Error connecting to AI. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-dot exam" />
        <h2>Exam Mode</h2>
        <span className="chip">AI-Powered</span>
      </div>

      <div className="form-grid">
        <div className="form-panel">
          <h3>📋 Exam Details</h3>
          <div>
            <label>Subject / Course *</label>
            <input placeholder="e.g., Data Structures, Organic Chemistry" value={subject} onChange={e => setSubject(e.target.value)} />
          </div>
          <div>
            <label>Exam Type</label>
            <select value={examType} onChange={e => setExamType(e.target.value)}>
              <option value="university">University Exam</option>
              <option value="internal">Internal Assessment</option>
              <option value="competitive">Competitive Exam</option>
              <option value="certification">Certification</option>
            </select>
          </div>
          <div>
            <label>Exam Date</label>
            <input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
          </div>
          <div>
            <label>Answer Mark Types</label>
            <div className="mark-btns">
              {["2", "8", "16", "MCQ", "Short"].map(m => (
                <button key={m} className={`mark-btn ${marks.includes(m) ? "active" : ""}`} onClick={() => toggleMark(m)}>
                  {m} {m !== "MCQ" && m !== "Short" ? "marks" : ""}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-panel">
          <h3>📚 Study Materials</h3>
          <div>
            <label>Syllabus / Topics</label>
            <textarea rows={3} placeholder="Paste your syllabus or list key topics..." value={syllabus} onChange={e => setSyllabus(e.target.value)} />
          </div>
          <div>
            <label>Upload Notes (Optional)</label>
            <div className="upload-zone" onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept=".txt,.pdf,.doc" onChange={handleFile} style={{display:'none'}} />
              <div className="upload-icon">📄</div>
              <p>Click to upload notes or study material</p>
              {fileName && <p className="filename">✓ {fileName}</p>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="tabs">
          {[{id:"questions",label:"📝 Important Q&A"},{id:"quiz",label:"🎯 Practice Quiz"},{id:"topics",label:"📊 Topic Priority"}].map(t => (
            <button key={t.id} className={`tab ${activeTab === t.id ? "active exam" : ""}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <button className="submit-btn exam" onClick={generate} disabled={loading || !subject}>
          {loading ? "⏳ Generating..." : "✨ Generate with AI"}
        </button>
      </div>

      {(loading || result) && (
        <div className="output-section">
          <div className="output-card">
            <div className="output-header">
              <h3 style={{ color: COLORS.accent }}>
                {activeTab === "questions" ? "📝 Exam Q&A" : activeTab === "quiz" ? "🎯 Practice Quiz" : "📊 Topic Analysis"}
              </h3>
              <span className="chip">{subject}</span>
            </div>
            <div className="output-body">
              {loading ? (
                <div className="loading-wrap">
                  <div className="spinner" />
                  <p>Generating exam content for <strong>{subject}</strong>...</p>
                </div>
              ) : (
                <FormattedResponse text={result} mode="exam" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseMode() {
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("2");
  const [durationUnit, setDurationUnit] = useState("months");
  const [level, setLevel] = useState("beginner");
  const [goal, setGoal] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState("2");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("roadmap");

  const generate = async () => {
    if (!course) return;
    setLoading(true);
    setResult("");

    const prompts = {
      roadmap: `You are Edu-Form, an AI learning coach. Create a detailed learning roadmap for:
Course/Skill: ${course}
Duration: ${duration} ${durationUnit}
Current Level: ${level}
Study Hours Per Day: ${hoursPerDay} hours
Goal: ${goal || "Master the subject"}

Provide:
1. Week-by-week or month-by-month structured plan
2. Key milestones and checkpoints
3. Resources and topics for each phase
4. Projects or practice tasks for each phase
5. Final skill assessment criteria

Be specific, realistic, and encouraging.`,
      quiz: `You are Edu-Form. Create a skill assessment quiz for ${course} at ${level} level.
Generate 8 questions to test current knowledge and identify gaps. Include:
- Conceptual questions
- Practical scenarios
- Code/problem challenges (if applicable)
Mark difficulty: Easy/Medium/Hard. Provide answers and explanations.`,
      schedule: `You are Edu-Form. Create a daily/weekly study schedule for learning ${course} in ${duration} ${durationUnit}.
Available time: ${hoursPerDay} hours/day, Level: ${level}

Create:
1. A sample weekly schedule with specific topics per day
2. Time allocation for theory vs practice
3. Weekly review and assessment slots
4. Tips for staying consistent and motivated
5. Warning signs you're falling behind and how to catch up`
    };

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompts[activeTab] }]
        })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "Unable to generate response.");
    } catch {
      setResult("Error connecting to AI. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-dot course" />
        <h2>Course Mode</h2>
        <span className="chip teal">Skill Builder</span>
      </div>

      <div className="form-grid">
        <div className="form-panel course">
          <h3>🚀 Course Details</h3>
          <div>
            <label>Course / Skill to Learn *</label>
            <input className="course-input" placeholder="e.g., Python, Web Development, Machine Learning" value={course} onChange={e => setCourse(e.target.value)} />
          </div>
          <div>
            <label>Current Level</label>
            <select value={level} onChange={e => setLevel(e.target.value)}>
              <option value="beginner">Complete Beginner</option>
              <option value="basic">Basic Knowledge</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label>Your Goal</label>
            <textarea className="course-input" rows={2} placeholder="e.g., Get a job as a developer, Build a project, Pass certification..." value={goal} onChange={e => setGoal(e.target.value)} />
          </div>
        </div>

        <div className="form-panel course">
          <h3>⏰ Schedule Settings</h3>
          <div>
            <label>Duration</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="course-input" type="number" min="1" max="24" value={duration} onChange={e => setDuration(e.target.value)} style={{ width: 80 }} />
              <select value={durationUnit} onChange={e => setDurationUnit(e.target.value)} style={{ flex: 1 }}>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
          <div>
            <label>Study Hours Per Day</label>
            <select value={hoursPerDay} onChange={e => setHoursPerDay(e.target.value)}>
              {["1","2","3","4","5","6+"].map(h => <option key={h} value={h}>{h} hour{h !== "1" ? "s" : ""}</option>)}
            </select>
          </div>
          <div style={{ padding: "16px", background: COLORS.surface, borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
            <p style={{ fontSize: "0.82rem", color: COLORS.muted, lineHeight: 1.6 }}>
              📅 <strong style={{ color: COLORS.teal }}>Estimated commitment:</strong><br/>
              {parseInt(hoursPerDay) * 7} hours/week over {duration} {durationUnit}
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div className="tabs">
          {[{id:"roadmap",label:"🗺️ Learning Roadmap"},{id:"schedule",label:"📅 Study Schedule"},{id:"quiz",label:"🧠 Skill Assessment"}].map(t => (
            <button key={t.id} className={`tab ${activeTab === t.id ? "active course" : ""}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <button className="submit-btn course" onClick={generate} disabled={loading || !course}>
          {loading ? "⏳ Generating..." : "🚀 Generate Plan"}
        </button>
      </div>

      {(loading || result) && (
        <div className="output-section">
          <div className="output-card">
            <div className="output-header">
              <h3 style={{ color: COLORS.teal }}>
                {activeTab === "roadmap" ? "🗺️ Your Learning Roadmap" : activeTab === "schedule" ? "📅 Study Schedule" : "🧠 Skill Assessment"}
              </h3>
              <span className="chip teal">{course}</span>
            </div>
            <div className="output-body">
              {loading ? (
                <div className="loading-wrap">
                  <div className="spinner course" />
                  <p>Building your personalized plan for <strong>{course}</strong>...</p>
                </div>
              ) : (
                <FormattedResponse text={result} mode="course" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EduForm() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  if (!user) return <AuthPage onLogin={u => setUser(u)} />;

  return (
    <div className="app">
      <style>{styles}</style>

      <nav className="navbar">
        <div className="logo">Edu<span>Form</span></div>
        <div className="nav-tabs">
          <button className={`nav-tab ${page === "home" ? "active" : ""}`} onClick={() => setPage("home")}>Home</button>
          <button className={`nav-tab ${page === "exam" ? "active" : ""}`} onClick={() => setPage("exam")}>Exam Mode</button>
          <button className={`nav-tab teal ${page === "course" ? "active" : ""}`} onClick={() => setPage("course")}>Course Mode</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: "0.82rem", color: "#7a8aaa" }}>👤 {user.name}</span>
          <button onClick={() => setUser(null)} style={{ background: "none", border: "1px solid #1e2d45", borderRadius: 8, padding: "5px 12px", color: "#7a8aaa", fontSize: "0.78rem", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>Logout</button>
        </div>
      </nav>

      {page === "home" && (
        <>
          <div className="hero">
            <div className="hero-tag">✦ AI Virtual Tutor</div>
            <h1>Your Smart Path to<br/><em>Academic Success</em></h1>
            <p>Upload your materials, set your goals — Edu-Form's AI generates personalized study plans, exam questions, and learning roadmaps.</p>
            <div className="mode-cards">
              <div className="mode-hero-card exam" onClick={() => setPage("exam")}>
                <div className="mode-icon">📝</div>
                <h3>Exam Mode</h3>
                <p>Generate important questions, model answers, and quizzes based on your syllabus and mark distribution.</p>
              </div>
              <div className="mode-hero-card course" onClick={() => setPage("course")}>
                <div className="mode-icon">🚀</div>
                <h3>Course Mode</h3>
                <p>Get a personalized day-by-day learning roadmap to master any skill within your target timeline.</p>
              </div>
            </div>
          </div>

          <div className="main">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
              {[
                { icon: "🎯", title: "Topic Prioritization", desc: "AI identifies high-mark topics so you study smarter, not harder." },
                { icon: "📊", title: "Smart Assessments", desc: "Auto-generated quizzes and mock tests that adapt to your level." },
                { icon: "✅", title: "Verified Notes", desc: "Access teacher-verified materials reviewed by professors." },
              ].map((f, i) => (
                <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "24px 20px" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{f.icon}</div>
                  <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "0.95rem", fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: COLORS.muted, lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {page === "exam" && (
        <div className="main" style={{ paddingTop: 40 }}>
          <ExamMode />
        </div>
      )}

      {page === "course" && (
        <div className="main" style={{ paddingTop: 40 }}>
          <CourseMode />
        </div>
      )}
    </div>
  );
}
