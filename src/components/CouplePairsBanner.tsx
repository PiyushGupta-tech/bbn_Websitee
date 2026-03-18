import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { stock } from '../data/images'

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
        <p className="eyebrow">Couple Pairs Ethnic Wear - Perfect for Every Occasion</p>
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Couple Pairs
        </motion.h2>
        <Link to="/pages/couple-pairs" className="btn-primary btn-dark btn-arrow">
          SHOP COUPLE SET <span aria-hidden>↗</span>
        </Link>
      </div>
    </section>
  )
}
