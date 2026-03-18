import { Link } from 'react-router-dom'
import { categoryCircles } from '../data/nav'
import { categoryPhotoByHref } from '../data/categoryPhotos'

export function CategoryCircles() {
  return (
    <section className="cat-strip" aria-label="Shop by category">
      <div className="container cat-row">
        {categoryCircles.map((cat) => (
          <Link key={cat.label} to={cat.href} className="cat-item">
            <div className="cat-circle">
              <img
                src={categoryPhotoByHref[cat.href]}
                alt=""
                width={384}
                height={384}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="cat-label">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
