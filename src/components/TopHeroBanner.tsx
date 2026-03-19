import { topRegalHeroImage } from '../data/images'

/**
 * Full-width top hero — red saree banner from /public (sharp) + CSS contrast for pop.
 */
export function TopHeroBanner() {
  return (
    <section className="top-hero-banner" aria-label="Featured saree collection">
      <div className="top-hero-banner__inner">
        <img
          src={topRegalHeroImage.src}
          srcSet={topRegalHeroImage.srcSet}
          sizes="100vw"
          alt="Woman in navy and gold saree on rich red — festive ethnic wear"
          className="top-hero-banner__img"
          width={topRegalHeroImage.width}
          height={topRegalHeroImage.height}
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </section>
  )
}
