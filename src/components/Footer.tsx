import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { IconFacebookBrand, IconInstagramBrand } from './SocialBrandIcons'

function IconCart() {
  return (
    <svg className="footer-trust-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" aria-hidden>
      <path
        d="M7 11h5l2.6 19h18.9l3-14.6H15"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="36.5" r="2.1" fill="currentColor" stroke="none" />
      <circle cx="32.5" cy="36.5" r="2.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconCard() {
  return (
    <svg className="footer-trust-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" aria-hidden>
      <rect x="6.5" y="12" width="35" height="24" rx="4" strokeWidth="1.8" />
      <path d="M6.5 20.5h35" strokeWidth="1.8" />
      <rect x="12" y="26.3" width="8.8" height="5.4" rx="1.4" strokeWidth="1.6" />
      <path d="M24.5 29h10" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function IconDollar() {
  return (
    <svg className="footer-trust-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" aria-hidden>
      <circle cx="24" cy="24" r="15.5" strokeWidth="1.8" />
      <path d="M18.2 16.6h12.1M18.2 21.2h10.4" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M28.4 21.2c0 3.9-2.9 6.6-7.3 6.6h-1.3l9.7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconGift() {
  return (
    <svg className="footer-trust-svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" aria-hidden>
      <rect x="8" y="21" width="32" height="18.5" rx="2.8" strokeWidth="1.8" />
      <path d="M24 21v18.5M8 27h32" strokeWidth="1.8" />
      <path
        d="M24 21c0-5.7 8.2-8.2 8.2-3.1 0 2-1.6 3.1-3.7 3.1H24zm0 0c0-5.7-8.2-8.2-8.2-3.1 0 2 1.6 3.1 3.7 3.1H24z"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
            <h4 className="footer-section-title">About bbn</h4>
            <p className="footer-about-text">
              bbn offers premium Indian ethnic wear including Sarees, Lehenga Choli, Salwar Suits, Indo-Western and
              more. Crafted in India with luxurious fabrics and intricate detailing for every celebration.
            </p>
            <div className="footer-social-circles">
              <a
                href="https://www.facebook.com/profile.php?id=61575424553004"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-circle footer-social-circle--brand"
                aria-label="bbn on Facebook (opens in new tab)"
              >
                <IconFacebookBrand />
              </a>
              <a
                href="https://www.instagram.com/bbn.fashion/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-circle footer-social-circle--brand"
                aria-label="bbn on Instagram (opens in new tab)"
              >
                <IconInstagramBrand />
              </a>
            </div>
          </div>
          <nav className="footer-col" aria-label="Customer services">
            <h4 className="footer-section-title">Customer Services</h4>
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
            <h4 className="footer-section-title">Quick Links</h4>
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
            <h4 className="footer-section-title">Sign Up for Email</h4>
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
