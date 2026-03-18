import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4>About bbn</h4>
          <p style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.6 }}>
            bbn offers premium Indian ethnic wear including Sarees, Lehenga
            Choli, Salwar Suits and more. Crafted in India with luxurious fabrics and
            intricate detailing.
          </p>
          <p style={{ marginTop: 16, fontSize: 13 }}>
            <a href="https://instagram.com">Instagram</a>
            {' · '}
            <a href="https://facebook.com">Facebook</a>
            {' · '}
            <a href="https://pinterest.com">Pinterest</a>
          </p>
        </div>
        <div className="footer-col">
          <h4>Customer Services</h4>
          <ul>
            <li>
              <Link to="/pages/shipping-policy">Shipping Policy</Link>
            </li>
            <li>
              <Link to="/pages/return-policy">Return Policy</Link>
            </li>
            <li>
              <Link to="/pages/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/pages/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="/pages/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/pages/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/pages/about">About Us</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/pages/wholesale">Wholesale</Link>
            </li>
            <li>
              <Link to="/pages/track-order">Track Order</Link>
            </li>
          </ul>
        </div>
        <div className="footer-col newsletter">
          <h4>Sign Up for Email</h4>
          <p style={{ fontSize: 14, color: 'var(--color-muted)' }}>
            Subscribe to our newsletter for updates.
          </p>
          <form
            className="newsletter"
            onSubmit={(e) => {
              e.preventDefault()
              alert('Thanks for subscribing! (demo)')
            }}
          >
            <input type="email" required placeholder="Enter your email" />
            <button type="submit" className="btn-primary btn-dark" style={{ width: '100%' }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} All Rights Reserved by bbn</p>
        <p style={{ marginTop: 12, fontSize: 12 }}>
          Visa · Mastercard · Amex · PayPal · Google Pay
        </p>
      </div>
    </footer>
  )
}
