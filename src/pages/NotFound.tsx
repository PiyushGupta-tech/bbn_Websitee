import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="not-found">
      <h1>404 — Page not found</h1>
      <Link to="/" className="btn-primary btn-dark" style={{ marginTop: 24, display: 'inline-block' }}>
        Back home
      </Link>
    </div>
  )
}
