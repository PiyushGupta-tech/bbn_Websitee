import { useState, useEffect, FormEvent } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { searchProducts } from '../data/products'

export function SearchPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const q = params.get('q') ?? ''
  const [draft, setDraft] = useState(q)
  const results = searchProducts(q)

  useEffect(() => {
    setDraft(q)
  }, [q])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const term = draft.trim()
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <div className="section container search-page" style={{ paddingTop: 32 }}>
      <h1 className="section-title">Search</h1>

      <form className="search-page-form" onSubmit={onSubmit} role="search">
        <label htmlFor="search-page-input" className="visually-hidden">
          Search products
        </label>
        <input
          id="search-page-input"
          type="search"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search sarees, lehengas, suits…"
          autoComplete="off"
          enterKeyHint="search"
        />
        <button type="submit" className="btn-primary btn-dark search-page-submit" disabled={!draft.trim()}>
          Search
        </button>
      </form>

      <p style={{ textAlign: 'center', color: 'var(--color-muted)', marginBottom: 32 }}>
        {q ? `Results for “${q}”` : 'Enter a search term above.'}
      </p>
      {!q && (
        <p style={{ textAlign: 'center' }}>
          <Link to="/">Browse homepage</Link>
        </p>
      )}
      {q && results.length === 0 && (
        <p style={{ textAlign: 'center' }}>No products found. Try &ldquo;saree&rdquo; or &ldquo;lehenga&rdquo;.</p>
      )}
      <div className="product-grid">
        {results.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  )
}
