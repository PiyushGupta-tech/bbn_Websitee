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
  return (
    <section className="section container">
      <h2 className="section-title">{title}</h2>
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
