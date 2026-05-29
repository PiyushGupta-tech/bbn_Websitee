import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AccountPage() {
  const { user, loading, updateProfile, logout } = useAuth()
  const [form, setForm] = useState(user)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (user) setForm(user)
  }, [user])

  if (!loading && !user) {
    return <Navigate to="/login" replace />
  }

  if (loading || !form) {
    return (
      <section className="account-section">
        <div className="container">
          <p>Loading account…</p>
        </div>
      </section>
    )
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setMessage(null)
    try {
      await updateProfile({
        fullName: form.fullName,
        phone: form.phone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        pinCode: form.pinCode,
      })
      setMessage('Profile saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="account-section" aria-labelledby="account-heading">
      <div className="container account-inner">
        <header className="account-header">
          <h1 id="account-heading" className="account-title">
            My account
          </h1>
          <p className="account-lead">
            {form.email} · Member since {new Date(form.createdAt).toLocaleDateString('en-IN')}
          </p>
        </header>

        <form className="account-card" onSubmit={onSubmit}>
          {message && <p className="account-success">{message}</p>}
          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <div className="auth-form-row">
            <div className="auth-field">
              <label className="auth-label" htmlFor="acc-name">
                Full name
              </label>
              <input
                id="acc-name"
                className="auth-input"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="acc-phone">
                Mobile
              </label>
              <input
                id="acc-phone"
                className="auth-input"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="acc-email">
              Email
            </label>
            <input id="acc-email" className="auth-input" value={form.email} disabled />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="acc-addr1">
              Address
            </label>
            <input
              id="acc-addr1"
              className="auth-input"
              value={form.addressLine1}
              onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
              required
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="acc-addr2">
              Address line 2
            </label>
            <input
              id="acc-addr2"
              className="auth-input"
              value={form.addressLine2}
              onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
            />
          </div>
          <div className="auth-form-row">
            <div className="auth-field">
              <label className="auth-label" htmlFor="acc-city">
                City
              </label>
              <input
                id="acc-city"
                className="auth-input"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="acc-state">
                State
              </label>
              <input
                id="acc-state"
                className="auth-input"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="acc-pin">
                PIN
              </label>
              <input
                id="acc-pin"
                className="auth-input"
                value={form.pinCode}
                onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="account-actions">
            <button type="submit" className="btn-primary btn-dark" disabled={busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </button>
            <button type="button" className="account-logout" onClick={() => void logout()}>
              Log out
            </button>
            <Link to="/shop" className="auth-text-link">
              Continue shopping
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
