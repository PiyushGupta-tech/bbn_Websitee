import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll main window to top on every client-side route change (footer & nav links). */
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search, hash])

  return null
}
