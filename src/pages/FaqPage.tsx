import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems, contactPageContent } from '../data/staticDocs'

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)
  const support = contactPageContent.customerSupport

  return (
    <section className="faq-pro-section" aria-labelledby="faq-main-heading">
      <div className="faq-pro-bg" aria-hidden />
      <div className="faq-pro-inner">
        <header className="faq-pro-header">
          <p className="faq-pro-eyebrow">Support</p>
          <h1 id="faq-main-heading" className="faq-page-title">
            Frequently Asked Questions
          </h1>
          <p className="faq-pro-lead">
            Quick answers about shipping, sizing, customization, and orders. For a live order, email{' '}
            <a href={`mailto:${support.email}`}>{support.emailDisplay}</a>.
          </p>
        </header>

        <div className="faq-pro-list-wrap">
          <div className="faq-pro-list">
            {faqItems.map((item, i) => {
              const isOpen = open === i
              return (
                <div
                  key={item.q}
                  className={`faq-item faq-item-pro${isOpen ? ' faq-item-pro--open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    id={`faq-q-${i}`}
                    aria-controls={`faq-a-${i}`}
                  >
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-q-toggle" aria-hidden>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="faq-a-inner">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        <div className="faq-pro-help">
          <h2 className="faq-pro-help-title">Still need help?</h2>
          <p>
            Share your order ID and query at{' '}
            <a href={`mailto:${support.email}`}>{support.emailDisplay}</a> — we&apos;ll assist you as soon as we can.
          </p>
        </div>
      </div>
    </section>
  )
}
