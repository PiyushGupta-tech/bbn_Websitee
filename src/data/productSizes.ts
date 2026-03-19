import type { Product } from './types'

/** Standard ethnic wear (lehenga, suit, gown, couple set) */
export const APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const

const FREE = ['Free size'] as const

/**
 * Sizes shown on PDP / used for cart lines.
 * Sarees & jewellery are typically unstitched / one-size.
 */
export function getSizesForProduct(product: Product): string[] {
  if (product.sizes?.length) return [...product.sizes]

  if (product.categoryId === 'sarees' || product.categoryId === 'jewellery') {
    return [...FREE]
  }

  if (product.categoryId === 'new-arrivals') {
    const t = `${product.slug} ${product.title}`.toLowerCase()
    if (
      t.includes('saree') ||
      t.includes('sari') ||
      t.includes('dupatta') ||
      t.includes('jewellery') ||
      t.includes('jewelry') ||
      t.includes('necklace') ||
      t.includes('earring')
    ) {
      return [...FREE]
    }
  }

  return [...APPAREL_SIZES]
}

export function defaultSizeForProduct(product: Product): string {
  const s = getSizesForProduct(product)
  return s[0] ?? 'M'
}
