import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { megaNav, topMarquee } from '../data/nav'
import { IconFacebookBrand, IconInstagramBrand } from './SocialBrandIcons'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

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

function IconHeart() {
  return (
    <svg className="header-icon-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      />
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

export function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { totalQty } = useCart()
  const { count: wishlistCount } = useWishlist()
  const { user, logout } = useAuth()

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
        <a
          href="https://www.facebook.com/profile.php?id=61575424553004"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="bbn on Facebook (opens in a new tab)"
        >
          <IconFacebookBrand size={24} />
        </a>
        <a
          href="https://www.instagram.com/bbn.fashion/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="bbn on Instagram (opens in a new tab)"
        >
          <IconInstagramBrand size={24} />
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

          <div className="header-search-cluster">
            <span className="header-search-inline-label">Search products</span>
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
          </div>

          <div className="header-actions">
            <Link
              to="/wishlist"
              className="icon-btn icon-btn-wishlist"
              aria-label={
                wishlistCount > 0 ? `Wishlist, ${wishlistCount} items` : 'Wishlist'
              }
            >
              <IconHeart />
              {wishlistCount > 0 && (
                <span className="cart-badge">{wishlistCount > 99 ? '99+' : wishlistCount}</span>
              )}
            </Link>
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
            <div className="header-auth">
              {user ? (
                <>
                  <span className="header-auth-greeting" title={user.email}>
                    Hi, {user.email.split('@')[0]}
                  </span>
                  <button
                    type="button"
                    className="header-auth-btn"
                    onClick={() => logout()}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="header-auth-link">
                    Log in
                  </Link>
                  <span className="header-auth-sep" aria-hidden>
                    ·
                  </span>
                  <Link to="/signup" className="header-auth-link">
                    Sign up
                  </Link>
                </>
              )}
            </div>
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
            <Link to="/shop" onClick={() => setOpen(false)}>
              All products
            </Link>
            <Link to="/wishlist" onClick={() => setOpen(false)}>
              Wishlist
            </Link>
            {!user ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  Sign up
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="mobile-nav-logout"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
              >
                Log out ({user.email.split('@')[0]})
              </button>
            )}
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
