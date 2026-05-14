import { useEffect, useState } from "react";
import { getDoctorAppointments } from "../services/doctorService";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=Outfit:wght@300;400;500;600&display=swap');

  .dd-root {
    min-height: 100vh;
    background: #f0ede8;
    font-family: 'Outfit', sans-serif;
    padding: 2.5rem 1.5rem;
  }

  .dd-inner {
    max-width: 860px;
    margin: 0 auto;
  }

  /* Header */
  .dd-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .dd-greeting {
    font-family: 'Lora', serif;
    font-size: 2rem;
    font-weight: 600;
    color: #1a1a18;
    line-height: 1.2;
  }

  .dd-greeting span {
    display: block;
    font-size: 0.95rem;
    font-family: 'Outfit', sans-serif;
    font-weight: 400;
    color: #7a7870;
    margin-top: 4px;
    letter-spacing: 0.01em;
  }

  .dd-date-badge {
    background: #1a1a18;
    color: #f0ede8;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 8px 16px;
    border-radius: 40px;
    white-space: nowrap;
  }

  /* Stat cards */
  .dd-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 12px;
    margin-bottom: 2.5rem;
  }

  .dd-stat {
    background: #fff;
    border-radius: 16px;
    padding: 1.1rem 1.25rem;
    position: relative;
    overflow: hidden;
  }

  .dd-stat::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 16px 16px 0 0;
  }

  .dd-stat.total::before  { background: #1a1a18; }
  .dd-stat.conf::before   { background: #2d8c6e; }
  .dd-stat.pend::before   { background: #c47d1e; }
  .dd-stat.canc::before   { background: #b03030; }

  .dd-stat-label {
    font-size: 0.72rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #9a9890;
    margin-bottom: 6px;
  }

  .dd-stat-val {
    font-size: 1.9rem;
    font-weight: 600;
    color: #1a1a18;
    line-height: 1;
  }

  .dd-stat.conf .dd-stat-val { color: #2d8c6e; }
  .dd-stat.pend .dd-stat-val { color: #c47d1e; }
  .dd-stat.canc .dd-stat-val { color: #b03030; }

  /* Toolbar */
  .dd-toolbar {
    display: flex;
    gap: 10px;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .dd-search-wrap {
    flex: 1;
    min-width: 200px;
    position: relative;
  }

  .dd-search-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: #9a9890;
    font-size: 1rem;
    pointer-events: none;
  }

  .dd-search {
    width: 100%;
    padding: 10px 14px 10px 38px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.875rem;
    background: #fff;
    border: 1.5px solid transparent;
    border-radius: 10px;
    color: #1a1a18;
    outline: none;
    transition: border-color 0.2s;
  }

  .dd-search:focus {
    border-color: #1a1a18;
  }

  .dd-filters {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .dd-filter-btn {
    padding: 8px 16px;
    font-family: 'Outfit', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 40px;
    border: 1.5px solid #d8d5d0;
    background: transparent;
    color: #7a7870;
    cursor: pointer;
    transition: all 0.18s;
    letter-spacing: 0.01em;
  }

  .dd-filter-btn:hover {
    border-color: #1a1a18;
    color: #1a1a18;
  }

  .dd-filter-btn.active {
    background: #1a1a18;
    border-color: #1a1a18;
    color: #f0ede8;
  }

  /* Section heading */
  .dd-section-title {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #9a9890;
    margin-bottom: 1rem;
  }

  /* Appointment cards */
  .dd-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .dd-card {
    background: #fff;
    border-radius: 16px;
    padding: 1.1rem 1.25rem;
    display: grid;
    grid-template-columns: 48px 1fr auto;
    gap: 14px;
    align-items: center;
    transition: transform 0.15s, box-shadow 0.15s;
    animation: fadeUp 0.3s ease both;
  }

  .dd-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(26,26,24,0.08);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Avatar */
  .dd-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.85rem;
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }

  .av-0 { background: #e1f5ee; color: #0f6e56; }
  .av-1 { background: #faeeda; color: #854f0b; }
  .av-2 { background: #e6f1fb; color: #185fa5; }
  .av-3 { background: #fbeaf0; color: #993556; }
  .av-4 { background: #f0ede8; color: #5a5048; }

  /* Card body */
  .dd-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1a1a18;
    margin-bottom: 2px;
  }

  .dd-email {
    font-size: 0.78rem;
    color: #9a9890;
    margin-bottom: 8px;
  }

  .dd-meta {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  .dd-meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    color: #6a6860;
    font-weight: 400;
  }

  /* Right side */
  .dd-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .dd-badge {
    font-size: 0.72rem;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 40px;
    text-transform: capitalize;
    letter-spacing: 0.03em;
  }

  .badge-confirmed  { background: #e1f5ee; color: #0f6e56; }
  .badge-pending    { background: #faeeda; color: #854f0b; }
  .badge-cancelled  { background: #fcebeb; color: #a32d2d; }
  .badge-completed  { background: #e6f1fb; color: #185fa5; }

  .dd-id {
    font-size: 0.72rem;
    color: #bcbab5;
    font-family: monospace;
  }

  /* Empty state */
  .dd-empty {
    text-align: center;
    padding: 4rem 2rem;
    color: #9a9890;
  }

  .dd-empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.35;
  }

  .dd-empty p {
    font-size: 0.9rem;
  }
`;

const AVATAR_COLORS = ['av-0', 'av-1', 'av-2', 'av-3', 'av-4'];

function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
}

function getAvatarClass(name = '') {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function getBadgeClass(status = '') {
  return { confirmed: 'badge-confirmed', pending: 'badge-pending', cancelled: 'badge-cancelled', completed: 'badge-completed' }[status] || 'badge-pending';
}

function formatDate(d) {
  try { return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return d; }
}

const TODAY = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getDoctorAppointments();
        setAppointments(data.appointments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointments();
  }, []);

  const filtered = appointments.filter(a => {
    const name = (a.patientId?.userId?.name || '').toLowerCase();
    const email = (a.patientId?.userId?.email || '').toLowerCase();
    const q = search.toLowerCase();
    const matchQ = !q || name.includes(q) || email.includes(q);
    const matchF = filter === 'all' || a.status === filter;
    return matchQ && matchF;
  });

  const count = s => appointments.filter(a => a.status === s).length;

  return (
    <>
      <style>{styles}</style>
      <div className="dd-root">
        <div className="dd-inner">

          {/* Header */}
          <div className="dd-header">
            <div className="dd-greeting">
              Doctor Dashboard
              <span>Welcome back — here's your schedule</span>
            </div>
            <div className="dd-date-badge">{TODAY}</div>
          </div>

          {/* Stats */}
          <div className="dd-stats">
            <div className="dd-stat total">
              <div className="dd-stat-label">Total</div>
              <div className="dd-stat-val">{appointments.length}</div>
            </div>
            <div className="dd-stat conf">
              <div className="dd-stat-label">Confirmed</div>
              <div className="dd-stat-val">{count('confirmed')}</div>
            </div>
            <div className="dd-stat pend">
              <div className="dd-stat-label">Pending</div>
              <div className="dd-stat-val">{count('pending')}</div>
            </div>
            <div className="dd-stat canc">
              <div className="dd-stat-label">Cancelled</div>
              <div className="dd-stat-val">{count('cancelled')}</div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="dd-toolbar">
            <div className="dd-search-wrap">
              <span className="dd-search-icon">🔍</span>
              <input
                className="dd-search"
                type="text"
                placeholder="Search patient name or email…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="dd-filters">
              {['all', 'confirmed', 'pending', 'cancelled'].map(f => (
                <button
                  key={f}
                  className={`dd-filter-btn${filter === f ? ' active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="dd-section-title">Appointments — {filtered.length} shown</div>

          {filtered.length === 0 ? (
            <div className="dd-empty">
              <div className="dd-empty-icon">📭</div>
              <p>No appointments match your search.</p>
            </div>
          ) : (
            <div className="dd-list">
              {filtered.map((appt, i) => {
                const name = appt.patientId?.userId?.name || 'Unknown Patient';
                const email = appt.patientId?.userId?.email || '—';
                return (
                  <div
                    key={appt._id}
                    className="dd-card"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className={`dd-avatar ${getAvatarClass(name)}`}>
                      {getInitials(name)}
                    </div>

                    <div>
                      <div className="dd-name">{name}</div>
                      <div className="dd-email">{email}</div>
                      <div className="dd-meta">
                        <span className="dd-meta-item">📅 {formatDate(appt.date)}</span>
                        <span className="dd-meta-item">🕐 {appt.time}</span>
                      </div>
                    </div>

                    <div className="dd-right">
                      <span className={`dd-badge ${getBadgeClass(appt.status)}`}>
                        {appt.status}
                      </span>
                      <span className="dd-id">#{appt._id?.slice(-6)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;