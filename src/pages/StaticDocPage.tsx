import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { staticDocs } from '../data/staticDocs'

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
      heading: 'Our Design Philosophy',
      points: [
        'Celebration-first styling rooted in Indian heritage.',
        'Modern silhouettes that remain timeless in photos and events.',
        'Attention to drape, movement, and comfort across product lines.',
      ],
    },
    {
      heading: 'Craft & Quality',
      points: [
        'Fabric-led development with quality checkpoints.',
        'Focus on finishing, fit consistency, and wearable construction.',
        'Curated detailing that balances richness and versatility.',
      ],
    },
    {
      heading: 'Customer Experience',
      points: [
        'Clear policy communication and support-led order journeys.',
        'Tracked shipping and proactive post-order updates.',
        'Designed for both direct retail and B2B scaling.',
      ],
    },
    {
      heading: 'Brand Direction',
      points: [
        'A modern ethnic label built for global Indian fashion demand.',
        'Digital-first storefront with storytelling, trust, and conversion focus.',
        'This project is a polished demo representation of that vision.',
      ],
    },
  ],
}

function PolicyCards({ docKey }: { docKey: string }) {
  const cards = policyCards[docKey]
  if (!cards) return null

  return (
    <section className="shipping-policy-pro" aria-label="Detailed information">
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

      <div className="shipping-policy-help">
        <h3>Need assistance?</h3>
        <p>
          For policy clarifications and priority support, email <a href="mailto:care@bbn.demo">care@bbn.demo</a>.
        </p>
      </div>
    </section>
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

  return (
    <div className="prose-page">
      <h1>{page.title}</h1>
      {page.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <PolicyCards docKey={key} />
      {key === 'contact' && (
        <>
          {contactThanks && (
            <p style={{ marginTop: 24, color: 'var(--color-success, #2e7d32)' }} role="status">
              Thanks — we&apos;ll get back to you. (Demo — message not sent.)
            </p>
          )}
          <form
            style={{ marginTop: contactThanks ? 16 : 32, maxWidth: 480 }}
            onSubmit={(e) => {
              e.preventDefault()
              setContactThanks(true)
              e.currentTarget.reset()
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
        </>
      )}
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
