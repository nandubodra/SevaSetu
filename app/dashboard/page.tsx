import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/applications', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, []);

  return (
    <main className="dashboard-shell simple-dashboard">
      <div className="top-row">
        <div>
          <span className="eyebrow accent">Citizen dashboard</span>
          <h1>Application tracker</h1>
        </div>
        <a href="/" className="secondary-btn small-btn">Home</a>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total</span>
          <strong>{applications.length}</strong>
        </div>
        <div className="stat-card">
          <span>Pending</span>
          <strong>{applications.filter((a) => a.status !== 'approved').length}</strong>
        </div>
        <div className="stat-card">
          <span>Approved</span>
          <strong>{applications.filter((a) => a.status === 'approved').length}</strong>
        </div>
      </div>

      <div className="list-card large-card">
        <h3>My services</h3>
        <div className="application-list">
          {applications.map((app) => (
            <div key={app.id} className="app-row dashboard-row">
              <div>
                <strong>{app.citizenName}</strong>
                <span>{app.serviceType}</span>
              </div>
              <span className="pill">{app.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
