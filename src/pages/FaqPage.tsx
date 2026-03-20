import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems } from '../data/staticDocs'

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="faq-pro-section">
      <div className="faq-pro-bg" aria-hidden />
      <div className="prose-page faq-pro-inner">
        <header className="faq-pro-header">
          <p className="faq-pro-eyebrow">Support</p>
          <h1>Frequently Asked Questions</h1>
          <p className="faq-pro-lead">
            Quick answers about shipping, sizing, customization, and orders. If you need help with a live order,
            email care@bbn.demo.
          </p>
        </header>
        <div className="faq-pro-list" style={{ maxWidth: 760 }}>
        {faqItems.map((item, i) => (
          <div key={i} className="faq-item">
            <button
              type="button"
              className="faq-q"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
              <span>{open === i ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  className="faq-a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        </div>
        <div className="faq-pro-help">
          <h2>Still need help?</h2>
          <p>
            Share your order ID and query at <a href="mailto:care@bbn.demo">care@bbn.demo</a> and our team will
            assist you.
          </p>
        </div>
      </div>
    </section>
  )
}
