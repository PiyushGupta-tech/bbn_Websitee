import { useParams, Link } from 'react-router-dom'
import { staticDocs } from '../data/staticDocs'

export function StaticDocPage() {
  const { doc } = useParams<{ doc: string }>()
  const key = doc ?? ''
  const page = staticDocs[key]

  if (!page) {
    return (
      <div className="not-found">
        <h1>Page not found</h1>
        <Link to="/">Home</Link>
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
        <form
          style={{ marginTop: 32, maxWidth: 480 }}
          onSubmit={(e) => {
            e.preventDefault()
            alert('Thanks! (Demo form)')
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
      )}
      {key === 'track-order' && (
        <form
          style={{ marginTop: 24, maxWidth: 400 }}
          onSubmit={(e) => {
            e.preventDefault()
            alert('Demo: Your order is on the way! (placeholder)')
          }}
        >
          <input
            placeholder="Order #"
            style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
          />
          <input
            type="email"
            placeholder="Email"
            style={{ width: '100%', padding: 12, marginBottom: 12, borderRadius: 8, border: '1px solid #ddd' }}
          />
          <button type="submit" className="btn-primary btn-dark">
            Track
          </button>
        </form>
      )}
    </div>
  )
}
