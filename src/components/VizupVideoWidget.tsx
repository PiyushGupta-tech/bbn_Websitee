import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { watchBuyYoutubeEmbedSrc } from '../data/watchBuyVideo'

const STORAGE_MINI = 'bbn-vizup-minimized'

/** Fixed panel: same muted YouTube as homepage Watch & Buy */
export function VizupVideoWidget() {
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

  const iframeSrc = watchBuyYoutubeEmbedSrc()

  if (minimized) {
    return (
      <motion.button
        type="button"
        className="vizup-widget-minimized"
        onClick={() => setMinimized(false)}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Open Watch & Buy video"
      >
        <span className="vizup-minimized-icon">▶</span>
        <span className="vizup-minimized-text">Video</span>
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

      <div className="vizup-widget-body vizup-widget-body-single">
        <div className="vizup-frame-wrap vizup-frame-wrap--vertical">
          <div className="vizup-iframe-inner vizup-vertical-crop">
            <iframe
              title="Watch & Buy — featured look (YouTube, muted)"
              src={iframeSrc}
              className="vizup-iframe vizup-iframe-vertical"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
