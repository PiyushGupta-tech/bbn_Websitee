import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AdminLoginPage() {
  const { adminLogin, admin, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!loading && admin) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await adminLogin(email, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="admin-section admin-section--login">
      <div className="container admin-login-wrap">
        <div className="admin-login-card">
          <p className="auth-eyebrow">BBN Admin</p>
          <h1 className="admin-title">Admin login</h1>
          <p className="admin-lead">Track customers, logins, and full account details.</p>
          <form onSubmit={onSubmit} className="auth-form">
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <div className="auth-field">
              <label className="auth-label" htmlFor="admin-email">
                Admin email
              </label>
              <input
                id="admin-email"
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary btn-dark auth-submit" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in to admin'}
            </button>
          </form>
          <p className="auth-footnote" style={{ marginTop: 16 }}>
            <Link to="/" className="auth-text-link">
              ← Back to store
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
