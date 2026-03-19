import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { staticDocs } from '../data/staticDocs'

export function StaticDocPage() {
  const { doc } = useParams<{ doc: string }>()
  const key = doc ?? ''
  const page = staticDocs[key]
  const [contactThanks, setContactThanks] = useState(false)
  const [trackThanks, setTrackThanks] = useState(false)

  useEffect(() => {
    setContactThanks(false)
    setTrackThanks(false)
  }, [key])

  if (!page) {
    return (
      <div className="prose-page container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        <h1>Page not found</h1>
        <p style={{ color: 'var(--color-muted)' }}>
          That policy or page doesn&apos;t exist. Try one of these:
        </p>
        <ul style={{ marginTop: 16, lineHeight: 1.8 }}>
          <li>
            <Link to="/pages/shipping-policy">Shipping Policy</Link>
          </li>
          <li>
            <Link to="/pages/return-policy">Return Policy</Link>
          </li>
          <li>
            <Link to="/pages/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className="prose-page">
      <h1>{page.title}</h1>
      {page.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      {key === 'contact' && (
        <>
          {contactThanks && (
            <p style={{ marginTop: 24, color: 'var(--color-success, #2e7d32)' }} role="status">
              Thanks — we&apos;ll get back to you. (Demo — message not sent.)
            </p>
          )}
          <form
            style={{ marginTop: contactThanks ? 16 : 32, maxWidth: 480 }}
            onSubmit={(e) => {
              e.preventDefault()
              setContactThanks(true)
              e.currentTarget.reset()
            }}
          >
            <input
              type="text"
              placeholder="Name"
              required
              style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
            />
            <textarea
              placeholder="Message"
              required
              rows={4}
              style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
            />
            <button type="submit" className="btn-primary btn-dark">
              Send
            </button>
          </form>
        </>
      )}
      {key === 'track-order' && (
        <>
          {trackThanks && (
            <p style={{ marginTop: 16, color: 'var(--color-success, #2e7d32)' }} role="status">
              Demo: your order is on the way — check your email for tracking. (Placeholder.)
            </p>
          )}
          <form
            style={{ marginTop: trackThanks ? 16 : 24, maxWidth: 400 }}
            onSubmit={(e) => {
              e.preventDefault()
              setTrackThanks(true)
              e.currentTarget.reset()
            }}
          >
            <input
              name="order"
              placeholder="Order #"
              required
              style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
            />
            <button type="submit" className="btn-primary btn-dark">
              Track
            </button>
          </form>
        </>
      )}
    </div>
  )
}
