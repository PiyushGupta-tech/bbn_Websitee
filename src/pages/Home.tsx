import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HeroCarousel } from '../components/HeroCarousel'
import { CategoryCircles } from '../components/CategoryCircles'
import { MarqueeBar } from '../components/MarqueeBar'
import { ProductSection } from '../components/ProductSection'
import { CouplePairsBanner } from '../components/CouplePairsBanner'
import { HomeReviews } from '../components/HomeReviews'
import { BlogTeaser } from '../components/BlogTeaser'
import { InstagramRow } from '../components/InstagramRow'
import { SuccessStories } from '../components/SuccessStories'
import { TrustBadges } from '../components/TrustBadges'
import { WatchAndBuyVideos } from '../components/WatchAndBuyVideos'
import { getProductsByCategory } from '../data/products'

export function Home() {
  const newArrivals = getProductsByCategory('new-arrivals')
  const sarees = getProductsByCategory('sarees')
  const lehengas = getProductsByCategory('lehenga-choli')
  const salwar = getProductsByCategory('salwar-kameez')
  const indo = getProductsByCategory('indo-western')

  return (
    <>
      <HeroCarousel />
      <CategoryCircles />
      <MarqueeBar />
      <WatchAndBuyVideos />

      <ProductSection
        title="New Arrivals - Fresh Styles, Timeless Elegance!"
        products={newArrivals}
        viewAllHref="/collections/new-arrivals"
      />

      <section className="container" style={{ padding: '24px 0 48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          <motion.div
            whileHover={{ y: -6 }}
            style={{
              position: 'relative',
              minHeight: 200,
              borderRadius: 12,
              overflow: 'hidden',
              backgroundImage: `url(https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSn-OI-P116VVY7pWlVw8CniGwLLTChr0Jeg6cWowYHPUPLiliAf2KluqhQwYkGfq5f8K9I53SkLv-B8PwF85FH8rlsh2QUtQ&usqp=CAc)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: 28,
              color: '#fff',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.75), transparent)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 11, letterSpacing: '0.15em', opacity: 0.95 }}>
                TOP COLLECTIONS
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '12px 0' }}>
                Bridal Queen Look
              </h3>
              <Link to="/collections/lehenga-choli" className="btn-primary" style={{ marginTop: 8 }}>
                ORDER NOW
              </Link>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -6 }}
            style={{
              minHeight: 200,
              borderRadius: 12,
              overflow: 'hidden',
              backgroundImage: `url(https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSOVmfltcy2NsDmWHDDpLCTEowxkLk663pwq9ePwLVULA3Ii0wTOwg3VXo_-ej3Gn1r_VWIrk-5VdBab0ul7ooLqpbIIufR&usqp=CAc)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: 28,
              color: '#fff',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.75), transparent)',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: 11, letterSpacing: '0.15em' }}>PREMIUM - ONLINE EXCLUSIVE</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '12px 0' }}>
                Indo-Western Elegance
              </h3>
              <Link to="/collections/indo-western" className="btn-primary">
                ORDER NOW
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ProductSection
        title="Sarees - Timeless Elegance & Grace!"
        products={sarees}
        viewAllHref="/collections/sarees"
      />
      <ProductSection
        title="Lehenga Choli - Regal Elegance for Every Occasion!"
        products={lehengas}
        viewAllHref="/collections/lehenga-choli"
      />
      <ProductSection
        title="Salwar Kameez - Timeless Grace & Elegance!"
        products={salwar}
        viewAllHref="/collections/salwar-kameez"
      />

      <CouplePairsBanner />

      <ProductSection
        title="Indo-Western Elegance - A Fusion of Tradition & Modernity!"
        products={indo}
        viewAllHref="/collections/indo-western"
      />

      <HomeReviews />
      <BlogTeaser />
      <InstagramRow />
      <SuccessStories />
      <TrustBadges />
    </>
  )
}
