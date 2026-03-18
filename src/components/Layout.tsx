import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { motion } from 'framer-motion'

function PageMotion() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ flex: 1, width: '100%' }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  return (
    <>
      <Header />
      <PageMotion />
      <Footer />
      <div className="float-stack-end">
        <div className="float-currency" title="Currency">
          <span aria-hidden>🇮🇳</span> INR
        </div>
        <a
          className="float-wa"
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
        >
          💬
        </a>
      </div>
    </>
  )
}
