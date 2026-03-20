import { Link } from 'react-router-dom'
import type { Product } from '../data/types'
import { ProductCard } from './ProductCard'

interface Props {
  title: string
  products: Product[]
  viewAllHref: string
}

export function ProductSection({ title, products, viewAllHref }: Props) {
  const list = products.slice(0, 8)
  const isNewArrivalsTitle = title === 'New Arrivals - Fresh Styles, Timeless Elegance!'
  const isSareesTitle = title === 'Sarees - Timeless Elegance & Grace!'
  const isLehengaTitle = title === 'Lehenga Choli - Regal Elegance for Every Occasion!'
  const isSalwarTitle = title === 'Salwar Kameez - Timeless Grace & Elegance!'
  const isIndoWesternTitle = title === 'Indo-Western Elegance - A Fusion of Tradition & Modernity!'
  return (
    <section className="section container">
      <h2
        className={`section-title ${isNewArrivalsTitle ? 'section-title--new-arrivals-cursive' : ''} ${
          isSareesTitle ? 'section-title--sarees-cursive-blue' : ''
        } ${isLehengaTitle ? 'section-title--lehenga-cursive-royal-red' : ''} ${
          isSalwarTitle ? 'section-title--lehenga-cursive-royal-red' : ''
        } ${isIndoWesternTitle ? 'section-title--lehenga-cursive-royal-red' : ''}
        }`}
      >
        {title}
      </h2>
      <div className="product-grid">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
      <div className="view-all-wrap">
        <Link to={viewAllHref} className="btn-primary btn-dark">
          VIEW ALL
        </Link>
      </div>
    </section>
  )
}
