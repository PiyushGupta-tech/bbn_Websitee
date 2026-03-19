import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function CouplePairsBanner() {
  return (
    <section className="couple-banner">
      <motion.div
        className="couple-banner-img"
        style={{
          backgroundImage:
            'url(https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRA20CIN_RDe-CiLg6jRuKDPK7m7UJkS1qIbHiSCYYRJzjVRmETwQS-inPCSUdmCMglyhtx3m-EtKHTBcNWSVGHE_hAMKPuyWsaaidAAO3kaI1D3CyI_VCfxQ)',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />
      <div className="couple-banner-text">
        <p className="eyebrow couple-banner-eyebrow">
          Couple Pairs Ethnic Wear - Perfect for Every Occasion
        </p>
        <motion.h2
          className="couple-banner-title"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Couple Pairs
        </motion.h2>
        <Link to="/pages/couple-pairs" className="couple-banner-cta">
          <span className="couple-banner-cta-label">Shop couple set</span>
          <span className="couple-banner-cta-icon" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  )
}
