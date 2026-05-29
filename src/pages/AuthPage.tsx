import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const emptyProfile = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pinCode: '',
}

export function AuthPage() {
  const { pathname } = useLocation()
  const isSignUp = pathname === '/signup'
  const { login, signUp, user, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyProfile)
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!loading && user) {
    return (
      <section className="auth-section" aria-labelledby="auth-signed-in-heading">
        <div className="auth-section-bg" aria-hidden />
        <div className="container auth-section-inner">
          <motion.div className="auth-shell auth-shell--single" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="auth-panel auth-panel--centered">
              <div className="auth-success-icon" aria-hidden>
                ✓
              </div>
              <h1 id="auth-signed-in-heading" className="auth-panel-title">
                Welcome, {user.fullName}
              </h1>
              <p className="auth-panel-lead auth-email-display">
                {user.email} · {user.phone}
              </p>
              <div className="auth-actions-stack">
                <Link to="/account" className="btn-primary btn-dark auth-cta-primary">
                  My account
                </Link>
                <Link to="/shop" className="auth-cta-secondary">
                  Continue shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (isSignUp) {
        await signUp({
          email: form.email,
          phone: form.phone,
          password: form.password,
          fullName: form.fullName,
          addressLine1: form.addressLine1,
          addressLine2: form.addressLine2,
          city: form.city,
          state: form.state,
          pinCode: form.pinCode,
        })
      } else {
        await login(loginId, password)
      }
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
    }
  }

  const field = (key: keyof typeof form, label: string, opts?: { type?: string; placeholder?: string }) => (
    <div className="auth-field">
      <label className="auth-label" htmlFor={`auth-${key}`}>
        {label}
      </label>
      <input
        id={`auth-${key}`}
        className="auth-input"
        type={opts?.type || 'text'}
        placeholder={opts?.placeholder}
        value={form[key]}
        onChange={(ev) => setForm((p) => ({ ...p, [key]: ev.target.value }))}
        required
      />
    </div>
  )

  return (
    <section className="auth-section" aria-labelledby="auth-main-heading">
      <div className="auth-section-bg" aria-hidden />
      <div className="container auth-section-inner">
        <motion.div className="auth-shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <aside className="auth-brand">
            <Link to="/" className="auth-brand-logo-link">
              <span className="auth-brand-logo">bbn</span>
              <span className="auth-brand-logo-sub">ethnic wear</span>
            </Link>
            <h2 className="auth-brand-title">
              {isSignUp ? 'Create your account' : <span className="auth-welcome-back">Welcome back</span>}
            </h2>
            <p className="auth-brand-lead">
              {isSignUp
                ? 'One account for orders, faster checkout, and saved delivery details — like Flipkart or Amazon.'
                : 'Sign in with your email or 10-digit mobile number and password.'}
            </p>
          </aside>

          <motion.div className="auth-panel" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <p className="auth-eyebrow">Account</p>
            <h1 id="auth-main-heading" className="auth-panel-title">
              {isSignUp ? 'Sign up' : 'Log in'}
            </h1>

            <div className="auth-tabs" role="tablist">
              <Link to="/login" className={`auth-tab ${!isSignUp ? 'auth-tab--active' : ''}`}>
                Log in
              </Link>
              <Link to="/signup" className={`auth-tab ${isSignUp ? 'auth-tab--active' : ''}`}>
                Sign up
              </Link>
            </div>

            <form className="auth-form" onSubmit={onSubmit} noValidate>
              {error && (
                <p className="auth-error" role="alert">
                  {error}
                </p>
              )}

              {isSignUp ? (
                <>
                  {field('fullName', 'Full name', { placeholder: 'Adarsh Sharma' })}
                  {field('email', 'Email', { type: 'email', placeholder: 'you@example.com' })}
                  {field('phone', 'Mobile number', { type: 'tel', placeholder: '10-digit mobile' })}
                  {field('addressLine1', 'Address line 1', { placeholder: 'House no., street' })}
                  {field('addressLine2', 'Address line 2 (optional)', { placeholder: 'Landmark' })}
                  <div className="auth-form-row">
                    {field('city', 'City')}
                    {field('state', 'State')}
                  </div>
                  {field('pinCode', 'PIN code', { placeholder: '6 digits' })}
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="auth-password">
                      Password
                    </label>
                    <input
                      id="auth-password"
                      className="auth-input"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(ev) => setForm((p) => ({ ...p, password: ev.target.value }))}
                      required
                      minLength={6}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="auth-field">
                    <label className="auth-label" htmlFor="auth-login-id">
                      Email or mobile
                    </label>
                    <input
                      id="auth-login-id"
                      className="auth-input"
                      type="text"
                      autoComplete="username"
                      placeholder="email or 10-digit phone"
                      value={loginId}
                      onChange={(ev) => setLoginId(ev.target.value)}
                      required
                    />
                  </div>
                  <div className="auth-field">
                    <div className="auth-label-row">
                      <label className="auth-label" htmlFor="auth-password">
                        Password
                      </label>
                      <button
                        type="button"
                        className="auth-toggle-password"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <input
                      id="auth-password"
                      className="auth-input"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              <button type="submit" className="btn-primary btn-dark auth-submit" disabled={busy}>
                {busy ? 'Please wait…' : isSignUp ? 'Create account' : 'Log in'}
              </button>
            </form>

            <p className="auth-footnote">
              Staff?{' '}
              <Link to="/admin/login" className="auth-text-link">
                Admin login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
