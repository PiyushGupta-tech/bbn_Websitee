import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems } from '../data/staticDocs'

export function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="prose-page">
      <h1>FAQ</h1>
      <div style={{ maxWidth: 640 }}>
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
    </div>
  )
}
