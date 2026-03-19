import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AuthPage() {
  const { pathname } = useLocation()
  const isSignUp = pathname === '/signup'
  const { login, signUp, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (user) {
    return (
      <div className="auth-page container">
        <div className="auth-card">
          <h1 className="auth-title">You&apos;re signed in</h1>
          <p className="auth-muted">{user.email}</p>
          <Link to="/" className="btn-primary btn-dark auth-btn">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const result = isSignUp ? signUp(email, password) : login(email, password)
    if (result.ok) {
      navigate('/', { replace: true })
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-page container">
      <div className="auth-card">
        <h1 className="auth-title">{isSignUp ? 'Create account' : 'Log in'}</h1>
        <p className="auth-muted">
          {isSignUp ? 'Join bbn to save your preferences.' : 'Welcome back.'}
        </p>

        <div className="auth-tabs" role="tablist" aria-label="Account">
          <Link
            to="/login"
            className={`auth-tab ${!isSignUp ? 'active' : ''}`}
            role="tab"
            aria-selected={!isSignUp}
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className={`auth-tab ${isSignUp ? 'active' : ''}`}
            role="tab"
            aria-selected={isSignUp}
          >
            Sign up
          </Link>
        </div>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}
          <label className="auth-label" htmlFor="auth-email">
            Email
          </label>
          <input
            id="auth-email"
            className="auth-input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <label className="auth-label" htmlFor="auth-password">
            Password
          </label>
          <input
            id="auth-password"
            className="auth-input"
            type="password"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
            minLength={isSignUp ? 6 : undefined}
          />
          <button type="submit" className="btn-primary btn-dark auth-submit">
            {isSignUp ? 'Create account' : 'Log in'}
          </button>
        </form>

        <p className="auth-footnote">
          Demo only — accounts are stored on this device (localStorage).
        </p>
      </div>
    </div>
  )
}
