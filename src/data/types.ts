export type CategoryId =
  | 'new-arrivals'
  | 'sarees'
  | 'lehenga-choli'
  | 'salwar-kameez'
  | 'indo-western'
  | 'jewellery'
  | 'gown-dresses'
  | 'couple-pairs'

export interface Product {
  id: string
  slug: string
  title: string
  categoryId: CategoryId
  price: number
  compareAtPrice: number
  image: string
  images?: string[]
  rating: number
  reviewCount: number
  description: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  image: string
  body: string[]
}
