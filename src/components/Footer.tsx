import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { IconFacebookBrand, IconInstagramBrand, IconPinterestBrand } from './SocialBrandIcons'

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
