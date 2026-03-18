import { motion } from 'framer-motion'
import { VIZUP_VIDEO_IDS, vizupIframeSrc } from '../data/vizupVideos'

export function WatchAndBuyVideos() {
  const mainVid = VIZUP_VIDEO_IDS[0]
  const iframeSrc = vizupIframeSrc(mainVid)

  return (
    <section className="watch-buy-section" aria-labelledby="watch-buy-heading">
      <div className="watch-buy-section-bg" aria-hidden />
      <div className="container watch-buy-inner">
        <div className="watch-buy-layout">
          <header className="watch-buy-header">
            <span className="watch-buy-eyebrow">Shoppable video</span>
            <motion.h2
              id="watch-buy-heading"
              className="watch-buy-title"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              Watch &amp; Buy
            </motion.h2>
            <p className="watch-buy-sub">
              See the key pieces in motion — play the shoppable video and explore the full bridal story.
            </p>
          </header>

          <div className="watch-buy-stage">
            <div className="watch-buy-card">
              <div className="watch-buy-player">
                <div className="watch-buy-frame">
                  <div className="watch-buy-frame-shine" aria-hidden />
                  <div className="watch-buy-iframe-inner">
                    <iframe
                      title="Shoppable bridal look"
                      src={iframeSrc}
                      className="watch-buy-iframe"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
