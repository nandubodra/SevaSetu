import './globals.css';

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero">
        <nav className="topbar">
          <div className="brand-wrap">
            <span className="brand-mark">S</span>
            <span>SevaSetu</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#demo">Demo</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/admin">Officer Panel</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div>
            <span className="eyebrow">AI Citizen-Service Agent</span>
            <h1>One agent. One service. Full civic flow.</h1>
            <p className="lead">
              SevaSetu handles requests end-to-end from paperwork collection to form fill,
              consent, mock submission, tracking, failure recovery, and escalation.
            </p>
            <div className="cta-row">
              <a className="primary-btn" href="/dashboard">Launch Citizen Demo</a>
              <a className="secondary-btn" href="/admin">Open Officer View</a>
            </div>
            <ul className="hero-stats">
              <li><strong>5</strong><span>Languages</span></li>
              <li><strong>10+</strong><span>Workflow steps</span></li>
              <li><strong>24/7</strong><span>Assistive agent</span></li>
            </ul>
          </div>

          <div className="workflow-card">
            <div className="workflow-header">
              <span className="status-dot green" />
              <span>End-to-end workflow</span>
            </div>
            <ol>
              <li>Understand requirement</li>
              <li>Collect documents</li>
              <li>Validate inputs</li>
              <li>Fill form</li>
              <li>Get citizen consent</li>
              <li>Submit on mock portal</li>
              <li>Track and recover</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="features" className="info-section">
        <div className="section-head">
          <span className="eyebrow accent">Core modules</span>
          <h2>Built for long-horizon civic task completion</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI Planner</h3>
            <p>Breaks a citizen request into organized milestones and decides the next step.</p>
          </div>
          <div className="feature-card">
            <h3>Document Validator</h3>
            <p>Checks missing, expired, or invalid documents before proceeding.</p>
          </div>
          <div className="feature-card">
            <h3>Consent Manager</h3>
            <p>Requires explicit confirmation before any government submission.</p>
          </div>
          <div className="feature-card">
            <h3>Failure Recovery</h3>
            <p>Retries processes, switches paths, and escalates if the portal fails.</p>
          </div>
          <div className="feature-card">
            <h3>Multilingual Interface</h3>
            <p>English, Hindi, Bengali, Punjabi, Bhojpuri-ready communication.</p>
          </div>
          <div className="feature-card">
            <h3>Audit Trail</h3>
            <p>Tracks every sensitive step for accountability and transparency.</p>
          </div>
        </div>
      </section>

      <section id="demo" className="demo-section">
        <div className="section-head">
          <span className="eyebrow accent">Hackathon demo</span>
          <h2>Service flow example</h2>
        </div>

        <div className="demo-steps">
          <div className="demo-step">
            <span>01</span>
            <p>Citizen asks: “Mujhe income certificate banana hai.”</p>
          </div>
          <div className="demo-step">
            <span>02</span>
            <p>AI identifies service, documents, and required form fields.</p>
          </div>
          <div className="demo-step">
            <span>03</span>
            <p>Citizen confirms and the agent submits on the mock portal.</p>
          </div>
          <div className="demo-step">
            <span>04</span>
            <p>Status is tracked until approval, rejection, or manual escalation.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
