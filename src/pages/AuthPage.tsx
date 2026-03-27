import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const benefits = [
  'Sync your wishlist on this device',
  'Faster checkout with a saved profile (demo)',
  'Early access to edits & new collections',
]

function AuthBenefits() {
  return (
    <ul className="auth-benefits" aria-label="Member benefits">
      {benefits.map((text) => (
        <li key={text}>
          <span className="auth-benefit-icon" aria-hidden>
            ✓
          </span>
          {text}
        </li>
      ))}
    </ul>
  )
}

export function AuthPage() {
  const { pathname } = useLocation()
  const isSignUp = pathname === '/signup'
  const { login, signUp, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (user) {
    return (
      <section className="auth-section" aria-labelledby="auth-signed-in-heading">
        <div className="auth-section-bg" aria-hidden />
        <div className="container auth-section-inner">
          <motion.div
            className="auth-shell auth-shell--single"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="auth-panel auth-panel--centered">
              <div className="auth-success-icon" aria-hidden>
                ✓
              </div>
              <h1 id="auth-signed-in-heading" className="auth-panel-title">
                You&apos;re signed in
              </h1>
              <p className="auth-panel-lead auth-email-display">{user.email}</p>
              <div className="auth-actions-stack">
                <Link to="/shop" className="btn-primary btn-dark auth-cta-primary">
                  Continue shopping
                </Link>
                <Link to="/" className="auth-cta-secondary">
                  Back to home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
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
    <section className="auth-section" aria-labelledby="auth-main-heading">
      <div className="auth-section-bg" aria-hidden />
      <div className="container auth-section-inner">
        <motion.div
          className="auth-shell"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <aside className="auth-brand" aria-labelledby="auth-brand-heading">
            <Link to="/" className="auth-brand-logo-link">
              <span className="auth-brand-logo">bbn</span>
              <span className="auth-brand-logo-sub">ethnic wear</span>
            </Link>
            <h2 id="auth-brand-heading" className="auth-brand-title">
              {isSignUp ? 'Join the bbn circle' : <span className="auth-welcome-back">Welcome back</span>}
            </h2>
            <p className="auth-brand-lead">
              {isSignUp
                ? 'Create an account to personalize your experience across sarees, lehengas, and more.'
                : 'Sign in to continue where you left off — your wishlist and preferences stay on this device.'}
            </p>
            <AuthBenefits />
            <div className="auth-brand-footer">
              <Link to="/shop" className="auth-text-link">
                Browse new arrivals →
              </Link>
            </div>
          </aside>

          <motion.div
            className="auth-panel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="auth-eyebrow">Account</p>
            <h1 id="auth-main-heading" className="auth-panel-title">
              {isSignUp ? 'Create your account' : 'Log in'}
            </h1>
            <p className="auth-panel-lead">
              {isSignUp
                ? 'Use a real email format — this is a demo; data stays in your browser only.'
                : 'Enter the email and password you used when you signed up.'}
            </p>

            <div className="auth-tabs" role="tablist" aria-label="Sign in or register">
              <Link
                to="/login"
                className={`auth-tab ${!isSignUp ? 'auth-tab--active' : ''}`}
                role="tab"
                aria-selected={!isSignUp}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className={`auth-tab ${isSignUp ? 'auth-tab--active' : ''}`}
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
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-email">
                  Email address
                </label>
                <input
                  id="auth-email"
                  className="auth-input"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  required
                />
              </div>
              <div className="auth-field">
                <div className="auth-label-row">
                  <label className="auth-label" htmlFor="auth-password">
                    Password
                  </label>
                  {isSignUp && (
                    <span className="auth-hint" id="auth-pw-hint">
                      Min. 6 characters
                    </span>
                  )}
                </div>
                <div className="auth-input-wrap">
                  <input
                    id="auth-password"
                    className="auth-input auth-input--with-toggle"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    placeholder={isSignUp ? 'Create a password' : '••••••••'}
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    required
                    minLength={isSignUp ? 6 : undefined}
                    aria-describedby={isSignUp ? 'auth-pw-hint' : undefined}
                  />
                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary btn-dark auth-submit">
                {isSignUp ? 'Create account' : 'Log in'}
              </button>
            </form>

            <p className="auth-footnote">
              <strong>Demo mode:</strong> accounts are stored locally in your browser (localStorage), not on a
              server. For production, connect a real auth provider.
            </p>

            <p className="auth-alt">
              Prefer to browse first?{' '}
              <Link to="/shop" className="auth-text-link">
                Shop the collection
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
