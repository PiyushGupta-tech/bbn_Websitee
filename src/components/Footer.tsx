import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

function IconCart() {
  return (
    <svg className="footer-trust-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M8 12h4l2 20h24l3-14H16" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="38" r="2" fill="currentColor" stroke="none" />
      <circle cx="34" cy="38" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconCard() {
  return (
    <svg className="footer-trust-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="6" y="12" width="36" height="24" rx="3" />
      <path d="M6 20h36" />
      <path d="M12 28h10" strokeLinecap="round" />
    </svg>
  )
}

function IconDollar() {
  return (
    <svg className="footer-trust-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M24 8v32M18 16c0-3 2.5-4 6-4s6 2 6 5-3 5-8 5-6 2-6 5 2.5 4 8 4 8-1.5 8-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconGift() {
  return (
    <svg className="footer-trust-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="8" y="18" width="32" height="22" rx="2" />
      <path d="M24 18V40M8 26h32" />
      <path d="M24 18c-4-6 8-8 0-8s4 2 0 8" strokeLinecap="round" />
    </svg>
  )
}

/** Facebook brand: Meta blue + white “f” (official palette #1877F2) */
function IconFacebookBrand() {
  return (
    <svg className="footer-social-brand-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.5 12.8h2.2l.3-2.4h-2.5V9.4c0-.7.2-1.2 1.2-1.2h1.3V5.8c-.6-.1-1.3-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2H8v2.4h2.1V19h2.5v-6.2z"
      />
    </svg>
  )
}

/** Instagram brand: gradient tile + white camera (app-icon style) */
function IconInstagramBrand() {
  const gid = 'footer-ig-grad'
  return (
    <svg className="footer-social-brand-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="35%" stopColor="#F77737" />
          <stop offset="60%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill={`url(#${gid})`} />
      <rect
        x="6.5"
        y="6.5"
        width="11"
        height="11"
        rx="2.8"
        fill="none"
        stroke="#fff"
        strokeWidth="1.35"
      />
      <circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" strokeWidth="1.35" />
      <circle cx="16.3" cy="7.7" r="0.85" fill="#fff" />
    </svg>
  )
}

/** Pinterest brand: Pinterest red + white script “P” (recognizable mark) */
function IconPinterestBrand() {
  return (
    <svg className="footer-social-brand-svg" width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#E60023" />
      <g transform="translate(12 12) scale(0.76) translate(-12 -12)">
        <path
          fill="#fff"
          d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.655 2.568-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z"
        />
      </g>
    </svg>
  )
}

const trustItems = [
  {
    Icon: IconCart,
    title: 'QUALITY CHECK',
    text: 'Premium craftsmanship with rigorous quality control',
  },
  {
    Icon: IconCard,
    title: 'PAYMENT SECURED',
    text: 'Safe secure payment options for worry-free transactions',
  },
  {
    Icon: IconDollar,
    title: 'AFFORDABLE COST',
    text: 'Budget friendly ethnic fashion beautifully crafted for queens',
  },
  {
    Icon: IconGift,
    title: 'CUSTOMIZED ORDERS',
    text: 'Tailored designs to match your style and needs',
  },
]

const shippingPartners = ['Shiprocket', 'Delhivery', 'Blue Dart', 'Ecom Express', 'DHL', 'FedEx']

const paymentMethods: { short: string; title: string }[] = [
  { short: 'AMEX', title: 'American Express' },
  { short: 'Diners', title: 'Diners Club' },
  { short: 'Discover', title: 'Discover' },
  { short: 'G Pay', title: 'Google Pay' },
  { short: 'JCB', title: 'JCB' },
  { short: 'MC', title: 'Mastercard' },
  { short: 'Visa', title: 'Visa' },
]

export function Footer() {
  const [newsletterThanks, setNewsletterThanks] = useState(false)

  function onNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setNewsletterThanks(true)
    ;(e.currentTarget as HTMLFormElement).reset()
  }

  return (
    <footer className="site-footer">
      <div className="footer-trust-strip">
        <div className="container footer-trust-grid">
          {trustItems.map(({ Icon, title, text }) => (
            <div key={title} className="footer-trust-item">
              <div className="footer-trust-icon-wrap" aria-hidden>
                <Icon />
              </div>
              <h3 className="footer-trust-title">{title}</h3>
              <p className="footer-trust-text">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-dark">
        <div className="container footer-grid footer-grid-dark">
          <div className="footer-col">
            <h4>About bbn</h4>
            <p className="footer-about-text">
              bbn offers premium Indian ethnic wear including Sarees, Lehenga Choli, Salwar Suits, Indo-Western and
              more. Crafted in India with luxurious fabrics and intricate detailing for every celebration.
            </p>
            <div className="footer-social-circles">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-circle footer-social-circle--brand"
                aria-label="bbn on Facebook (opens in new tab)"
              >
                <IconFacebookBrand />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-circle footer-social-circle--brand"
                aria-label="bbn on Instagram (opens in new tab)"
              >
                <IconInstagramBrand />
              </a>
              <a
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-circle footer-social-circle--brand"
                aria-label="bbn on Pinterest (opens in new tab)"
              >
                <IconPinterestBrand />
              </a>
            </div>
          </div>
          <nav className="footer-col" aria-label="Customer services">
            <h4>Customer Services</h4>
            <ul>
              <li>
                <Link to="/pages/shipping-policy" viewTransition>
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/return-policy" viewTransition>
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/privacy-policy" viewTransition>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/pages/terms-of-service" viewTransition>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/pages/faq" viewTransition>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/pages/contact" viewTransition>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="footer-col" aria-label="Quick links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/shop" viewTransition>
                  All products
                </Link>
              </li>
              <li>
                <Link to="/search" viewTransition>
                  Search
                </Link>
              </li>
              <li>
                <Link to="/wishlist" viewTransition>
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/pages/about" viewTransition>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" viewTransition>
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/pages/wholesale" viewTransition>
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/pages/track-order" viewTransition>
                  Track Order
                </Link>
              </li>
            </ul>
          </nav>
          <div className="footer-col newsletter footer-newsletter-dark">
            <h4>Sign Up for Email</h4>
            <p className="footer-newsletter-intro">Subscribe to our newsletter to receive news on update.</p>
            <form className="newsletter newsletter-inline-dark" onSubmit={onNewsletterSubmit}>
              <input type="email" required placeholder="Enter your email" aria-label="Email for newsletter" />
              <button type="submit" className="footer-subscribe-btn">
                SUBSCRIBE
              </button>
            </form>
            {newsletterThanks && (
              <p className="footer-newsletter-thanks" role="status">
                Thanks — you&apos;re on the list. (Demo — no email is sent.)
              </p>
            )}
            <p className="footer-shipping-heading">Trusted Shipping Partner</p>
            <div className="footer-shipping-logos" role="list">
              {shippingPartners.map((name) => (
                <span key={name} className="footer-shipping-pill" role="listitem">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-legal-bar">
          <div className="container footer-legal-inner">
            <p className="footer-copyright">
              © {new Date().getFullYear()}, All Rights Reserved by bbn
            </p>
            <div className="footer-payment-row" aria-label="Accepted payment methods">
              {paymentMethods.map(({ short, title }) => (
                <span key={title} className="footer-pay-pill" title={title}>
                  {short}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
