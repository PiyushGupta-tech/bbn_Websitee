import { motion } from 'framer-motion'
import { successStoryNehaSharma, successStorySnehaPatel } from '../data/images'

const trustSignals = [
  { label: 'Pan-India B2B supply', icon: '◇' },
  { label: 'Wholesale & bulk orders', icon: '◇' },
  { label: 'Doorstep delivery', icon: '◇' },
]

const stories = [
  {
    title: 'Wholesale That Feels Like Luxury',
    quote:
      'Their Bridal Lehengas and Organza Sarees are pure luxury at wholesale prices. 5-day doorstep delivery!',
    author: 'Sneha Patel',
    role: 'Retailer',
    location: 'Surat',
    img: successStorySnehaPatel,
    tags: ['Bridal lehengas', 'Organza sarees'],
    highlight: '5-day delivery',
  },
  {
    title: 'Best Quality & Fast Delivery!',
    quote:
      'bbn is my go-to B2B store for Silk Sarees & Bridal Lehengas. Excellent quality and great service.',
    author: 'Neha Sharma',
    role: 'Boutique Owner',
    location: 'Mumbai',
    img: successStoryNehaSharma,
    tags: ['Silk sarees', 'Bridal lehengas'],
    highlight: 'Repeat partner',
  },
]

function StarRow() {
  return (
    <div className="success-stories-stars" aria-hidden>
      {'★★★★★'.split('').map((c, i) => (
        <span key={i}>{c}</span>
      ))}
    </div>
  )
}

export function SuccessStories() {
  return (
    <section className="success-stories-section" aria-labelledby="success-stories-heading">
      <div className="success-stories-section__inner">
        <div className="container success-stories-section__container">
          <header className="success-stories-header">
            <p className="success-stories-eyebrow">B2B partner stories</p>
            <h2 id="success-stories-heading" className="success-stories-title">
              Success Stories That Inspire
            </h2>
            <p className="success-stories-lede">
              Boutiques and retailers across India trust BBN for premium ethnic wear at wholesale
              value—so you can pass on quality and margin to your customers.
            </p>
          </header>

          <ul className="success-stories-trust-row" role="list">
            {trustSignals.map((t) => (
              <li key={t.label} className="success-stories-trust-item">
                <span className="success-stories-trust-icon" aria-hidden>
                  {t.icon}
                </span>
                <span>{t.label}</span>
              </li>
            ))}
          </ul>

          <div className="success-stories-grid">
            {stories.map((s, i) => (
              <motion.article
                key={s.author}
                className="success-story-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="success-story-card__accent" aria-hidden />
                <div className="success-story-card__top">
                  <span className="success-story-card__quote-mark" aria-hidden>
                    “
                  </span>
                  <StarRow />
                  <h3 className="success-story-card__headline">{s.title}</h3>
                  <ul className="success-story-card__tags" aria-label="Categories mentioned">
                    {s.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <blockquote className="success-story-card__quote">
                  <p>{s.quote}</p>
                </blockquote>
                <footer className="success-story-card__footer">
                  <div className="success-story-card__avatar-wrap">
                    <img
                      className="success-story-card__avatar"
                      src={s.img}
                      alt={`${s.author}, ${s.role}`}
                      width={80}
                      height={80}
                      loading="lazy"
                    />
                  </div>
                  <div className="success-story-card__byline">
                    <div className="success-story-card__name-row">
                      <cite className="success-story-card__author">{s.author}</cite>
                      <span className="success-story-card__verified" title="Verified B2B partner">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                          <path
                            d="M8 12l2.5 2.5L16 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <p className="success-story-card__role">
                      {s.role}
                      <span className="success-story-card__dot" aria-hidden>
                        ·
                      </span>
                      {s.location}
                    </p>
                    <p className="success-story-card__highlight">{s.highlight}</p>
                  </div>
                </footer>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
