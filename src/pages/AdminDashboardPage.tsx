import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { apiAdminDashboard } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import type { AuthEvent, UserProfile } from '../types/auth'

export function AdminDashboardPage() {
  const { admin, loading, logout } = useAuth()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [events, setEvents] = useState<AuthEvent[]>([])
  const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0, loginsToday: 0 })
  const [tab, setTab] = useState<'users' | 'activity'>('users')
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    if (!admin) return
    void (async () => {
      try {
        const data = await apiAdminDashboard()
        setUsers(data.users)
        setEvents(data.events)
        setStats(data.stats)
      } catch (err) {
        setFetchError(err instanceof Error ? err.message : 'Failed to load data')
      }
    })()
  }, [admin])

  if (!loading && !admin) {
    return <Navigate to="/admin/login" replace />
  }

  if (loading) {
    return (
      <section className="admin-section">
        <div className="container">Loading admin…</div>
      </section>
    )
  }

  return (
    <section className="admin-section" aria-labelledby="admin-dash-heading">
      <div className="container admin-inner">
        <header className="admin-topbar">
          <div>
            <p className="auth-eyebrow">BBN Admin</p>
            <h1 id="admin-dash-heading" className="admin-title">
              Customer dashboard
            </h1>
            <p className="admin-lead">
              Signed in as {admin?.email}
            </p>
          </div>
          <div className="admin-topbar-actions">
            <button type="button" className="account-logout" onClick={() => void logout()}>
              Log out
            </button>
            <Link to="/" className="auth-text-link">
              View store
            </Link>
          </div>
        </header>

        {fetchError && (
          <p className="auth-error" role="alert">
            {fetchError}
          </p>
        )}

        <div className="admin-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.totalUsers}</span>
            <span className="admin-stat-label">Registered users</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.loginsToday}</span>
            <span className="admin-stat-label">Logins today</span>
          </div>
          <div className="admin-stat-card">
            <span className="admin-stat-value">{stats.totalEvents}</span>
            <span className="admin-stat-label">Total events logged</span>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab ${tab === 'users' ? 'admin-tab--active' : ''}`}
            onClick={() => setTab('users')}
          >
            All customers ({users.length})
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === 'activity' ? 'admin-tab--active' : ''}`}
            onClick={() => setTab('activity')}
          >
            Login activity ({events.length})
          </button>
        </div>

        {tab === 'users' ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City / State</th>
                  <th>PIN</th>
                  <th>Joined</th>
                  <th>Last login</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>
                      {u.addressLine1}
                      {u.addressLine2 ? `, ${u.addressLine2}` : ''}
                    </td>
                    <td>
                      {u.city}, {u.state}
                    </td>
                    <td>{u.pinCode}</td>
                    <td>{new Date(u.createdAt).toLocaleString('en-IN')}</td>
                    <td>{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('en-IN') : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev.id}>
                    <td>{new Date(ev.at).toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${ev.type}`}>{ev.type}</span>
                    </td>
                    <td>{ev.fullName || '—'}</td>
                    <td>{ev.email || '—'}</td>
                    <td>{ev.phone || '—'}</td>
                    <td>{ev.addressLine1 || '—'}</td>
                    <td>{ev.city ? `${ev.city}, ${ev.state}` : '—'}</td>
                    <td>{ev.ip || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
