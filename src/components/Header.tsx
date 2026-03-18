import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { megaNav, topMarquee } from '../data/nav'
import { useCart } from '../context/CartContext'

function IconMenu() {
  return (
    <svg className="header-icon-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M4 7h16M4 12h16M4 17h16"
      />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg className="header-icon-svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M20 20l-4.2-4.2" />
    </svg>
  )
}

function IconCart() {
  return (
    <svg className="header-icon-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        d="M6 6h15l-1.5 9h-12L4.5 6H2"
      />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ marginRight: 6 }}
    >
      <path d="M13 10h3.5l-.5 4H13v8h-4v-8H7v-4h2V8.5C9 5.9 10.6 4 13.7 4H17v4h-2.2C13.8 8 13 8.3 13 9.3V10z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ marginRight: 6 }}
    >
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1.3" />
    </svg>
  )
}

function IconPinterest() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ marginRight: 6 }}
    >
      <path d="M12 3C7.6 3 5 6 5 9.5c0 2.6 1.4 4.3 3.3 4.3.5 0 1-.3 1.1-.9l.3-1.1c.1-.4 0-.6-.2-.9-.4-.5-.6-1.1-.6-2 0-1.8 1.3-3.2 3.4-3.2 1.8 0 3 1.2 3 2.9 0 2-1 3.5-2.4 3.5-.7 0-1.2-.5-1-.1l.1.4-.4 1.5-.1.5-.2.7c-.1.3-.1.7 0 1.1 0 0 .1.1.1.1 3-.4 5.3-3 5.3-6.4C18.6 6 15.9 3 12 3z" />
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { totalQty } = useCart()

  const submitSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const term = q.trim()
      if (term) {
        navigate(`/search?q=${encodeURIComponent(term)}`)
        setSearchOpen(false)
        setQ('')
      }
    },
    [q, navigate]
  )

  useEffect(() => {
    if (!open && !searchOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open, searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div className="top-bar">{topMarquee}</div>
      <div className="header-socials container">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <IconFacebook />
          <span>Facebook</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <IconInstagram />
          <span>Instagram</span>
        </a>
        <a href="https://pinterest.com" target="_blank" rel="noreferrer">
          <IconPinterest />
          <span>Pinterest</span>
        </a>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <button
            type="button"
            className="menu-toggle icon-btn"
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <IconMenu />
          </button>

          <Link to="/" className="logo">
            bbn
          </Link>

          <nav className="nav-desktop" aria-label="Main">
            {megaNav.map((item) => (
              <div key={item.label} className="nav-item-wrap">
                <Link className="nav-item" to={item.href}>
                  {item.label}
                </Link>
                <div className="mega">
                  {item.children.map((c) => (
                    <Link key={c.label} to={c.href}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <form className="header-search-desktop" onSubmit={submitSearch} role="search">
            <label htmlFor="header-search-input" className="visually-hidden">
              Search products
            </label>
            <input
              id="header-search-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sarees, lehengas…"
              autoComplete="off"
              enterKeyHint="search"
            />
            <button
              type="submit"
              className="header-search-submit"
              aria-label="Search"
              disabled={!q.trim()}
            >
              <IconSearch />
            </button>
          </form>

          <div className="header-actions">
            <button
              type="button"
              className="icon-btn icon-btn-search-mobile"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <IconSearch />
            </button>
            <Link
              to="/cart"
              className="icon-btn icon-btn-cart"
              aria-label={totalQty > 0 ? `Cart, ${totalQty} items` : 'Cart'}
            >
              <IconCart />
              {totalQty > 0 && (
                <span className="cart-badge">{totalQty > 99 ? '99+' : totalQty}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <button
            type="button"
            className="search-overlay-backdrop"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          />
          <div className="search-overlay-panel">
            <div className="search-overlay-head">
              <h2 className="search-overlay-title">Search</h2>
              <button
                type="button"
                className="drawer-close-btn"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="search-overlay-form" onSubmit={submitSearch}>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search our store"
                type="search"
                enterKeyHint="search"
                aria-label="Search query"
              />
              <button
                type="submit"
                className="btn-primary btn-dark search-overlay-submit"
                disabled={!q.trim()}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={`mobile-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button
          type="button"
          className="mobile-drawer-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div className="mobile-drawer-panel" id="mobile-nav-panel">
          <div className="mobile-drawer-head">
            <span className="mobile-drawer-title">Menu</span>
            <button
              type="button"
              className="drawer-close-btn"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <nav className="mobile-nav" aria-label="Mobile">
            <Link to="/" onClick={() => setOpen(false)}>
              HOME
            </Link>
            {megaNav.map((item) => (
              <div key={item.label}>
                <Link to={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </div>
            ))}
            <Link to="/blogs" onClick={() => setOpen(false)}>
              Blogs
            </Link>
            <Link to="/pages/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link to="/pages/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
