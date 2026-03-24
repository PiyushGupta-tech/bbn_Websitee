import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { staticDocs, contactLocation, contactPageContent } from '../data/staticDocs'

const policyCards: Record<string, { heading: string; points: string[] }[]> = {
  'shipping-policy': [
    {
      heading: 'Dispatch & Delivery Timeline',
      points: [
        'Processing: 24–48 hours for order review and packing.',
        'Domestic dispatch: usually within 2–5 business days.',
        'Domestic delivery: typically 3–8 business days after dispatch.',
        'International delivery: generally 7–15 business days after dispatch.',
      ],
    },
    {
      heading: 'Shipping Coverage & Charges',
      points: [
        'Pan-India shipping available to most serviceable pincodes.',
        'Free shipping appears automatically on eligible domestic orders.',
        'Non-eligible orders show exact shipping at checkout before payment.',
        'International freight is calculated by destination and parcel weight.',
      ],
    },
    {
      heading: 'Customs, Duties & Taxes (International)',
      points: [
        'Import duties, VAT/GST, and customs charges are destination-country dependent.',
        'These charges are usually payable by the recipient at delivery/clearance.',
        'Delays caused by customs checks are outside courier and store control.',
      ],
    },
    {
      heading: 'Important Notes',
      points: [
        'Double-check full address, landmark, and phone number before placing order.',
        'RTO (return-to-origin) due to wrong address may incur re-shipping charges.',
        'Made-to-order/customized items may have longer dispatch windows.',
        'Weather, strikes, and regional restrictions can impact timelines.',
      ],
    },
  ],
  'return-policy': [
    {
      heading: 'Eligibility',
      points: [
        'Item must be unused, unwashed, and in original condition.',
        'Tags, original packaging, and invoice must be available.',
        'Non-returnable categories include customized and final-sale items.',
      ],
    },
    {
      heading: 'Request Process',
      points: [
        'Email care@bbn.demo with order ID and reason for return.',
        'Share unboxing photos for damaged/wrong item claims.',
        'Support confirms eligibility and return instructions.',
      ],
    },
    {
      heading: 'Refund Timeline',
      points: [
        'Refund is initiated after quality check at the warehouse.',
        'Gateway/bank settlement timelines vary by provider.',
        'Shipping/handling charges may be non-refundable unless order error is on us.',
      ],
    },
    {
      heading: 'Exchanges',
      points: [
        'Size exchanges are subject to stock availability.',
        'Exchange shipping timelines follow standard dispatch windows.',
        'For urgent occasions, contact support before placing replacement requests.',
      ],
    },
  ],
  'privacy-policy': [
    {
      heading: 'Data We Collect',
      points: [
        'Contact details (name, email, phone).',
        'Order, billing, and shipping information.',
        'Technical data like browser, device, and site interactions.',
      ],
    },
    {
      heading: 'How We Use Data',
      points: [
        'To process orders and provide shipping updates.',
        'To improve catalog discovery, site speed, and support quality.',
        'To prevent fraud and maintain platform security.',
      ],
    },
    {
      heading: 'Data Sharing',
      points: [
        'Shared only with essential service providers (payments, shipping, analytics).',
        'We do not sell personal information.',
        'Third-party providers follow their own privacy obligations.',
      ],
    },
    {
      heading: 'Your Rights',
      points: [
        'Request data access, correction, or deletion.',
        'Opt out of non-essential marketing communication.',
        'Contact care@bbn.demo for privacy-related requests.',
      ],
    },
  ],
  'terms-of-service': [
    {
      heading: 'Orders & Payments',
      points: [
        'Orders are accepted subject to availability and verification.',
        'Prices, promotions, and stock may change without prior notice.',
        'Suspicious or high-risk transactions may be cancelled/refunded.',
      ],
    },
    {
      heading: 'Product Information',
      points: [
        'Color/texture may vary slightly by photography and screen settings.',
        'Care instructions should be followed for longevity of fabrics and embellishments.',
        'Minor handcrafted variation is part of artisanal products.',
      ],
    },
    {
      heading: 'User Responsibilities',
      points: [
        'Provide accurate account and shipping information.',
        'Do not misuse the site, content, or checkout system.',
        'Use services in compliance with applicable local laws.',
      ],
    },
    {
      heading: 'Liability & Updates',
      points: [
        'Policy updates may be posted periodically on this page.',
        'Platform interruptions can occur due to maintenance or external outages.',
        'This demo replica is for showcasing UX and not legal production text.',
      ],
    },
  ],
  wholesale: [
    {
      heading: 'Who We Work With',
      points: [
        'Boutiques, multi-designer stores, online resellers, and stylists.',
        'Domestic and international B2B partners are supported.',
        'Category-specific onboarding based on your market focus.',
      ],
    },
    {
      heading: 'MOQ & Pricing',
      points: [
        'MOQ varies by category, collection, and customization level.',
        'Tiered B2B pricing is shared post-verification.',
        'Seasonal capsules and exclusive drops can have separate terms.',
      ],
    },
    {
      heading: 'Operations',
      points: [
        'Catalog previews and line sheets shared after lead qualification.',
        'Dispatch calendar is aligned to production and quality checks.',
        'Bulk orders get dedicated support for planning and reorders.',
      ],
    },
    {
      heading: 'Getting Started',
      points: [
        'Send store profile, location, and product categories to care@bbn.demo.',
        'Our team reviews fit and shares onboarding details.',
        'Integrate CRM/ERP and payment terms for live production usage.',
      ],
    },
  ],
  about: [
    {
      heading: 'Why Choose bbn?',
      points: [
        'Wide product range: From timeless sarees and bridal lehengas to suits, Indo-western edits, men’s ethnic wear, and jewelry — we have something for every celebration.',
        'Competitive prices: Strong value across our fashion and jewelry collections, with regular deals and discounts.',
        'Fast & reliable shipping: Quick delivery with multiple options including express and standard so your outfit arrives in time.',
        'Secure shopping: Safe checkout with multiple trusted payment methods.',
        'Excellent customer support: Our dedicated team is available Monday through Saturday to help with orders, sizing, and styling questions.',
        'Easy returns: Simple, hassle-free returns on eligible items for your peace of mind.',
        'Regular deals: Flash sales, clearance events, and special promotions on sarees, lehengas, suits, and curated picks every week.',
      ],
    },
  ],
}

function ContactVisitNoteLink() {
  const vn = contactPageContent.visitNote
  const mark = 'Contact Us'
  const i = vn.indexOf(mark)
  if (i < 0) return <>{vn}</>
  return (
    <>
      {vn.slice(0, i)}
      <Link to="/pages/contact#contact-form">{mark}</Link>
      {vn.slice(i + mark.length)}
    </>
  )
}

function PolicyCards({
  docKey,
  variant = 'default',
}: {
  docKey: string
  variant?: 'default' | 'about'
}) {
  const cards = policyCards[docKey]
  if (!cards) return null

  const isAbout = variant === 'about'
  const sectionClass = isAbout ? 'shipping-policy-pro shipping-policy-pro--about' : 'shipping-policy-pro'
  const aria = isAbout ? 'Why choose bbn' : 'Detailed information'

  return (
    <section className={sectionClass} aria-label={aria}>
      <div className="shipping-policy-grid">
        {cards.map((card) => (
          <article key={card.heading} className="shipping-policy-card">
            <h2>{card.heading}</h2>
            <ul>
              {card.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {isAbout ? (
        <div className="shipping-policy-help shipping-policy-help--about">
          <h3>We&apos;re here to help</h3>
          <p>
            Visit{' '}
            <Link to="/pages/contact">Contact us</Link>
            {' or email '}
            <a href={`mailto:${contactPageContent.customerSupport.email}`}>
              {contactPageContent.customerSupport.emailDisplay}
            </a>
            {' for orders, sizing, and styling questions.'}
          </p>
        </div>
      ) : (
        <div className="shipping-policy-help">
          <h3>Need assistance?</h3>
          <p>
            For policy clarifications and priority support, email <a href="mailto:care@bbn.demo">care@bbn.demo</a>.
          </p>
        </div>
      )}
    </section>
  )
}

/** Structured “What we offer” layout from staticDocs paragraphs (intro + category lines + closing). */
function AboutPageBody({ paragraphs }: { paragraphs: string[] }) {
  if (paragraphs.length < 3) {
    return (
      <>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </>
    )
  }

  const intro = paragraphs[0]
  const closing = paragraphs[paragraphs.length - 1]
  const offerLines = paragraphs.slice(1, -1)

  return (
    <div className="about-page">
      <div className="about-page-hero">
        <p className="about-page-tagline">Premium Indian fashion for every celebration.</p>
        <p className="about-page-lead">{intro}</p>
      </div>

      <h2 className="about-page-section-title" id="what-we-offer">
        <span className="about-page-section-title-inner">What we offer</span>
      </h2>

      <div className="about-offer-grid">
        {offerLines.map((line, i) => {
          const colon = line.indexOf(': ')
          const title = colon >= 0 ? line.slice(0, colon) : line
          const body = colon >= 0 ? line.slice(colon + 2) : ''
          return (
            <article key={`${title}-${i}`} className="about-offer-card">
              <div className="about-offer-card-accent" aria-hidden />
              <h3 className="about-offer-card-title">{title}</h3>
              {body ? <p className="about-offer-card-text">{body}</p> : null}
            </article>
          )
        })}
      </div>

      <div className="about-page-closing">
        <p>{closing}</p>
      </div>
    </div>
  )
}

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

  useEffect(() => {
    if (key !== 'contact') return
    if (window.location.hash !== '#contact-form') return
    const el = document.getElementById('contact-form')
    if (!el) return
    const t = window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    return () => window.clearTimeout(t)
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

  const isPolicyDocPage =
    key === 'shipping-policy' || key === 'return-policy' || key === 'privacy-policy'

  const proseClass =
    key === 'contact'
      ? 'prose-page prose-page--contact'
      : key === 'about'
        ? 'prose-page prose-page--about'
        : isPolicyDocPage
          ? 'prose-page prose-page--policy-doc'
          : 'prose-page'

  return (
    <div className={proseClass}>
      <h1>{page.title}</h1>
      {key === 'contact' && (
        <div className="contact-page">
          <header className="contact-page-intro">
            <h2 id="contact-get-in-touch-heading" className="contact-get-in-touch-title">
              {contactPageContent.getInTouchTitle}
            </h2>
            <p className="contact-get-in-touch-lead">{contactPageContent.getInTouchLead}</p>
          </header>

          <div className="contact-page-main">
            <article className="contact-channel-card">
              <h3 className="contact-channel-title">{contactPageContent.customerSupport.title}</h3>
              <dl className="contact-channel-dl">
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contactPageContent.customerSupport.email}`}>
                    {contactPageContent.customerSupport.emailDisplay}
                  </a>
                </dd>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${contactPageContent.customerSupport.phoneTel}`}>
                    {contactPageContent.customerSupport.phoneDisplay}
                  </a>
                </dd>
                <dt>Hours</dt>
                <dd>{contactPageContent.customerSupport.hours}</dd>
              </dl>
            </article>

            <section className="contact-location-block" aria-labelledby="contact-location-heading">
              <h2 id="contact-location-heading" className="contact-location-title">
                Our location
              </h2>
              <p className="contact-location-intro">{contactLocation.intro}</p>
              <h3 className="contact-location-subhead">{contactLocation.headOfficeLabel}</h3>
              <address className="contact-location-address">
                {contactLocation.lines.map((line, i) => (
                  <span key={`${i}-${line}`} className="contact-location-line">
                    {line}
                  </span>
                ))}
              </address>
            </section>
          </div>

          <p className="contact-visit-note">
            <ContactVisitNoteLink />
          </p>

          <section className="contact-form-section" aria-labelledby="contact-form-heading">
            <h2 id="contact-form-heading" className="contact-form-section-title">
              Send us a message
            </h2>
            {contactThanks && (
              <p className="contact-form-thanks" role="status">
                Thanks — we&apos;ll get back to you. (Demo — message not sent.)
              </p>
            )}
            <form
              id="contact-form"
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault()
                setContactThanks(true)
                e.currentTarget.reset()
              }}
            >
              <input type="text" name="name" placeholder="Name" required autoComplete="name" />
              <input type="email" name="email" placeholder="Email" required autoComplete="email" />
              <textarea name="message" placeholder="Message" required rows={4} />
              <button type="submit" className="btn-primary contact-form-submit">
                Send message
              </button>
            </form>
          </section>
        </div>
      )}

      {isPolicyDocPage ? (
        <div className="policy-doc-page">
          <div className="policy-page-summary">
            {page.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <PolicyCards docKey={key} />
        </div>
      ) : key === 'about' ? (
        <>
          <AboutPageBody paragraphs={page.paragraphs} />
          <PolicyCards docKey={key} variant="about" />
        </>
      ) : key !== 'contact' ? (
        <>
          {page.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <PolicyCards docKey={key} />
        </>
      ) : null}
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
