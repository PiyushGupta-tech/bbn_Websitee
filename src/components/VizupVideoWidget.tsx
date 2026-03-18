import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VIZUP_VIDEO_IDS, vizupIframeSrc } from '../data/vizupVideos'

const STORAGE_MINI = 'bbn-vizup-minimized'

export function VizupVideoWidget() {
  const [index, setIndex] = useState(0)
  const [minimized, setMinimized] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_MINI) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_MINI, minimized ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [minimized])

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % VIZUP_VIDEO_IDS.length)
  }, [])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + VIZUP_VIDEO_IDS.length) % VIZUP_VIDEO_IDS.length)
  }, [])

  const vid = VIZUP_VIDEO_IDS[index]
  const iframeSrc = vizupIframeSrc(vid)

  if (minimized) {
    return (
      <motion.button
        type="button"
        className="vizup-widget-minimized"
        onClick={() => setMinimized(false)}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Open shop videos"
      >
        <span className="vizup-minimized-icon">▶</span>
        <span className="vizup-minimized-text">Videos</span>
      </motion.button>
    )
  }

  return (
    <motion.div
      className="vizup-widget"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <div className="vizup-widget-header">
        <span className="vizup-widget-title">Watch &amp; Buy</span>
        <button
          type="button"
          className="vizup-widget-minimize"
          onClick={() => setMinimized(true)}
          aria-label="Minimize"
        >
          −
        </button>
      </div>

      <div className="vizup-widget-body">
        <button
          type="button"
          className="vizup-nav vizup-nav-prev"
          onClick={prev}
          aria-label="Previous video"
        >
          ‹
        </button>

        <div className="vizup-frame-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={vid}
              className="vizup-iframe-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <iframe
                title={`Shop video ${index + 1}`}
                src={iframeSrc}
                className="vizup-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="vizup-nav vizup-nav-next"
          onClick={next}
          aria-label="Next video"
        >
          ›
        </button>
      </div>

      <div className="vizup-widget-footer">
        <span className="vizup-counter vizup-counter-only">
          {index + 1} / {VIZUP_VIDEO_IDS.length}
        </span>
      </div>
    </motion.div>
  )
}
