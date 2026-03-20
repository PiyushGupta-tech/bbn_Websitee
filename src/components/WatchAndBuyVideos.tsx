import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LazyYoutubeIframe } from './LazyYoutubeIframe'
import {
  WATCH_BUY_VIDEOS,
  buildWatchBuyYoutubeEmbedSrc,
  watchBuyYoutubeThumbnailUrl,
} from '../data/watchBuyVideo'

export function WatchAndBuyVideos() {
  return (
    <section className="watch-buy-section" aria-labelledby="watch-buy-heading">
      <div className="watch-buy-section-bg" aria-hidden />
      <div className="container watch-buy-inner">
        <header className="watch-buy-header watch-buy-header--grid">
          <motion.h2
            id="watch-buy-heading"
            className="watch-buy-title watch-buy-title--simple"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Watch &amp; Buy
          </motion.h2>
          <p className="watch-buy-sub watch-buy-sub--compact">
            Clips play <strong>muted</strong> and start automatically. Tap a look to shop.
          </p>
        </header>

        <div className="watch-buy-grid" role="list">
          {WATCH_BUY_VIDEOS.map((v, index) => {
            const src = buildWatchBuyYoutubeEmbedSrc(v.id, v.startSeconds)
            const thumb = watchBuyYoutubeThumbnailUrl(v.id)
            return (
              <article key={v.id} className="watch-buy-stack-card" role="listitem">
                <div className="watch-buy-stack-player">
                  <div className="watch-buy-vertical-frame">
                    <div className="watch-buy-vertical-crop">
                      <LazyYoutubeIframe
                        title={`Watch & Buy — ${v.description.slice(0, 48)}`}
                        src={src}
                        className="watch-buy-iframe-vertical"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen={false}
                        referrerPolicy="strict-origin-when-cross-origin"
                        mountDelayMs={index * 280}
                      />
                    </div>
                    <div className="watch-buy-video-brand" aria-hidden>
                      bbn <span className="watch-buy-video-brand-light">FASHION</span>
                    </div>
                    <div className="watch-buy-video-bottom-overlay" aria-hidden>
                      <img src={thumb} alt="" className="watch-buy-video-thumb" width={44} height={44} />
                      <p className="watch-buy-video-desc">{v.description}</p>
                    </div>
                  </div>
                </div>

                <div className="watch-buy-stack-cta">
                  <Link to={v.shopHref} className="watch-buy-cta-main">
                    Add To Cart
                  </Link>
                  <span className="watch-buy-cta-divider" aria-hidden />
                  <Link
                    to={v.shopHref}
                    className="watch-buy-cta-more"
                    aria-label={`More options for ${v.description.slice(0, 40)}`}
                  >
                    <span className="watch-buy-cta-chevron" aria-hidden>
                      ▼
                    </span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
