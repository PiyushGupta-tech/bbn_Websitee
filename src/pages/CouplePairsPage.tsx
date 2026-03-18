import { CouplePairsBanner } from '../components/CouplePairsBanner'
import { ProductCard } from '../components/ProductCard'
import { getProductsByCategory } from '../data/products'

export function CouplePairsPage() {
  const products = getProductsByCategory('couple-pairs')

  return (
    <>
      <CouplePairsBanner />
      <div className="section container">
        <h2 className="section-title">Shop couple sets</h2>
        <div className="product-grid">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </>
  )
}
