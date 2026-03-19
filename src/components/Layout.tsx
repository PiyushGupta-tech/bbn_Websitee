import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'
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
  return (
    <>
      <ScrollToTop />
      <Header />
      <PageMotion />
      <Footer />
    </>
  )
}
