import type { Product } from './types'
import { stock } from './images'
import { photoForSlug } from './productPhotos'

function p(
  id: string,
  slug: string,
  title: string,
  categoryId: Product['categoryId'],
  price: number,
  compareAt: number,
  image: string,
  rating: number,
  reviews: number,
  description: string
): Product {
  const imgs = [image, stock.b, stock.c].filter((x, i, arr) => arr.indexOf(x) === i)
  return {
    id,
    slug,
    title,
    categoryId,
    price,
    compareAtPrice: compareAt,
    image,
    images: imgs,
    rating,
    reviewCount: reviews,
    description,
  }
}

const raw: Product[] = [
  p(
    '1',
    'luxury-silk-embroidered-lehenga',
    'Luxury Silk Embroidered Lehenga Choli with Mirror & Sequin Work | Designer Wedding Lehenga',
    'new-arrivals',
    19999,
    59999,
    stock.a,
    5,
    48,
    'Handcrafted bridal lehenga with mirror and sequin work. Perfect for weddings and receptions.'
  ),
  p(
    '2',
    'pure-viscose-tissue-saree',
    'Pure Viscose Tissue Saree with Handworked Pallu and Contrast Designer',
    'sarees',
    10999,
    29999,
    stock.b,
    0,
    0,
    'Elegant tissue saree with intricate handworked pallu.'
  ),
  p(
    '3',
    'designer-bridal-satin-saree',
    'Designer Bridal Satin Saree with Heavy Zardozi Border, Zircon & Kaanch Work',
    'sarees',
    13999,
    39999,
    photoForSlug('designer-bridal-satin-saree', stock.c),
    5,
    2,
    'Wedding party wear with heavy zardozi detailing.'
  ),
  p(
    '4',
    'banarasi-silk-saree-heritage',
    'Banarasi Silk Saree with Heritage-Inspired Woven Design',
    'sarees',
    1999,
    4999,
    photoForSlug('banarasi-silk-saree-heritage', stock.d),
    0,
    0,
    'Classic Banarasi weave for festive occasions.'
  ),
  p(
    '5',
    'premium-floral-banarasi',
    'Premium Floral Banarasi Saree with Pashmina Silk Look',
    'sarees',
    3999,
    11999,
    photoForSlug('premium-floral-banarasi', stock.e),
    0,
    0,
    'Floral motifs with luxurious finish.'
  ),
  p(
    '6',
    'soft-dola-viscose-saree',
    'Soft Dola Viscose Silk Saree with 3D Weaved Pallu',
    'sarees',
    7999,
    21999,
    photoForSlug('soft-dola-viscose-saree', stock.f),
    5,
    1,
    'Soft drape with stunning 3D pallu.'
  ),
  p(
    '7',
    'soft-silk-ikkat-saree',
    'Soft Silk Saree with Ikkat Border and Classic Elegance',
    'sarees',
    3999,
    11999,
    photoForSlug('soft-silk-ikkat-saree', stock.g),
    0,
    0,
    'Ikkat border saree for everyday elegance.'
  ),
  p(
    '8',
    'pure-handloom-linen-saree',
    'Pure Handloom Linen Silk Saree in Contemporary Digital Print',
    'sarees',
    3999,
    10999,
    photoForSlug('pure-handloom-linen-saree', stock.h),
    0,
    0,
    'Contemporary print on pure handloom.'
  ),
  p(
    '9',
    'graceful-loom-handloom-silk',
    'Graceful Loom Pure Handloom Silk Saree in Luxurious Soft Finish',
    'sarees',
    2999,
    9999,
    photoForSlug('graceful-loom-handloom-silk', stock.i),
    5,
    2,
    'Luxurious soft silk handloom.'
  ),
  p(
    '10',
    'vibrant-orange-navy-lehenga',
    'Vibrant Orange & Navy Silk Lehenga Choli',
    'lehenga-choli',
    17999,
    39999,
    photoForSlug('vibrant-orange-navy-lehenga', stock.j),
    0,
    0,
    'Bold orange and navy silk ensemble.'
  ),
  p(
    '11',
    'designer-organza-lehenga',
    'Designer Organza Embroidered Lehenga Choli with Glamorous Sequins',
    'lehenga-choli',
    14999,
    29999,
    photoForSlug('designer-organza-lehenga', stock.k),
    0,
    0,
    'Organza with sequin glamour.'
  ),
  p(
    '12',
    'pure-silk-moti-bridal-lehenga',
    'Pure Silk Moti And Cording Embroidery Bridal Lehenga Choli Dupatta',
    'lehenga-choli',
    13999,
    39999,
    photoForSlug('pure-silk-moti-bridal-lehenga', stock.l),
    0,
    0,
    'Bridal lehenga with moti and cording work.'
  ),
  p(
    '13',
    'banarasi-bridal-lehenga',
    'Banarasi Silk Heavy Embroidered Bridal Lehenga Choli with Dupatta',
    'lehenga-choli',
    19999,
    59999,
    photoForSlug('banarasi-bridal-lehenga', stock.m),
    0,
    0,
    'Heavy Banarasi bridal set.'
  ),
  p(
    '14',
    'luxury-silk-bridal-lehenga',
    'Luxury Silk Bridal Lehenga Choli – Handcrafted Elegance for Your Big Day',
    'lehenga-choli',
    29999,
    79999,
    photoForSlug('luxury-silk-bridal-lehenga', stock.n),
    5,
    3,
    'Ultimate bridal luxury.'
  ),
  p(
    '15',
    'deep-blue-dream-lehenga',
    'Deep Blue Dream Silk Lehenga Choli with Detailed Embroidery',
    'lehenga-choli',
    17999,
    39999,
    photoForSlug('deep-blue-dream-lehenga', stock.o),
    5,
    12,
    'Silk lehenga choli with detailed embroidery — deep blue dream for weddings and festive wear.'
  ),
  p(
    '16',
    'golden-beige-stone-lehenga',
    'Golden Beige Stone Embellished Silk Lehenga Choli',
    'lehenga-choli',
    17999,
    36999,
    photoForSlug('golden-beige-stone-lehenga', stock.p),
    5,
    8,
    'Golden beige silk lehenga choli with stone embellishments — elegant for weddings and celebrations.'
  ),
  p(
    '17',
    'yellow-chinnon-anarkali',
    'Yellow Chinnon Silk Embroidered Anarkali Suit with Dupatta – Festive & Wedding Wear',
    'salwar-kameez',
    6999,
    19999,
    photoForSlug('yellow-chinnon-anarkali', stock.q),
    5,
    1,
    'Yellow chinnon silk embroidered anarkali with dupatta — ideal for festive occasions and weddings.'
  ),
  p(
    '18',
    'orange-georgette-anarkali',
    'Orange Georgette Embroidered Sequin Anarkali Suit with Dupatta – Wedding & Festive Wear',
    'salwar-kameez',
    6999,
    19999,
    photoForSlug('orange-georgette-anarkali', stock.r),
    5,
    1,
    'Orange georgette anarkali with embroidered sequin work and dupatta — perfect for weddings and festive occasions.'
  ),
  p(
    '19',
    'royal-radiance-palazzo',
    'Royal Radiance Chinnon With Heavy Embroidered Work Palazzo Suit',
    'salwar-kameez',
    6999,
    16999,
    photoForSlug('royal-radiance-palazzo', stock.s),
    5,
    10,
    'Royal Radiance chinnon palazzo suit with heavy embroidered work — festive and party ready.'
  ),
  p(
    '20',
    'regal-sharara-ensemble',
    'Regal Embroidered Sharara Ensemble with Statement Dupatta',
    'salwar-kameez',
    6999,
    18999,
    photoForSlug('regal-sharara-ensemble', stock.t),
    5,
    12,
    'Regal embroidered sharara ensemble with a statement dupatta — wedding and festive ready.'
  ),
  p(
    '21',
    'orange-georgette-indo-western',
    'Orange Georgette Embroidered Sequin Anarkali – Indo-Western',
    'indo-western',
    6999,
    19999,
    photoForSlug('orange-georgette-indo-western', stock.u),
    5,
    12,
    'Orange georgette embroidered sequin anarkali in an Indo-Western silhouette — festive, wedding-ready, and party perfect.'
  ),
  p(
    '22',
    'red-jacquard-skirt-suit',
    'Red Jacquard Indo-Western Skirt Suit with Stylish Waistcoat',
    'indo-western',
    6999,
    14999,
    stock.v,
    5,
    2,
    'Jacquard skirt with waistcoat.'
  ),
  p(
    '23',
    'designer-satin-sharara-suit',
    'Designer Beige Readymade Satin Sharara Suit',
    'indo-western',
    6999,
    16999,
    stock.w,
    5,
    2,
    'Satin sharara ready to wear.'
  ),
  p(
    '24',
    'indo-western-jacket-suit',
    'Designer Indo-Western Jacket Suit with Intricate Cut Dana Detailing',
    'indo-western',
    6999,
    19999,
    stock.x,
    5,
    2,
    'Jacket suit with cut dana work.'
  ),
  p(
    '25',
    'viscose-bandhani-kaftan',
    'Viscose Bandhani Handwork Kaftan with Digital Print',
    'indo-western',
    5999,
    14999,
    stock.a,
    5,
    4,
    'Comfortable kaftan with bandhani.'
  ),
  p(
    '26',
    'full-length-indo-western-dress',
    'Full-Length Indo-Western Dress with Zari Detailing for Luxe Festive Looks',
    'indo-western',
    7499,
    19999,
    stock.b,
    5,
    2,
    'Full length zari dress.'
  ),
  p(
    '27',
    'lime-luxe-indo-western',
    'Lime Luxe Indo-Western Viscose Suit Set with Palazzo & Dupatta',
    'indo-western',
    6999,
    19999,
    photoForSlug('lime-luxe-indo-western', stock.c),
    5,
    2,
    'Lime palazzo set.'
  ),
  p(
    '28',
    'rani-pink-georgette-lehenga-set',
    'Elegant Rani Pink Georgette Lehenga Set with Designer Touch',
    'indo-western',
    4999,
    14999,
    photoForSlug('rani-pink-georgette-lehenga-set', stock.d),
    5,
    2,
    'Rani pink georgette set.'
  ),
  p(
    '29',
    'kundan-necklace-set',
    'Antique Kundan Necklace Set with Earrings',
    'jewellery',
    4999,
    8999,
    stock.e,
    5,
    12,
    'Traditional kundan necklace set.'
  ),
  p(
    '30',
    'bridal-choker-set',
    'Bridal Polki Choker with Maang Tikka',
    'jewellery',
    7999,
    12999,
    stock.f,
    4,
    8,
    'Polki choker for brides.'
  ),
  p(
    '31',
    'designer-gown-magenta',
    'Magenta Pink Handcrafted Designer Gown With Vibrant Embellished Details',
    'gown-dresses',
    13999,
    39999,
    stock.g,
    5,
    3,
    'Evening gown with embellishments.'
  ),
  p(
    '32',
    'evening-gown-sequin',
    'Sequin Evening Gown – Floor Length',
    'gown-dresses',
    8999,
    18999,
    stock.h,
    4,
    5,
    'Sequin floor length gown.'
  ),
  p(
    '33',
    'couple-coordinated-sherwani-lehenga',
    'Coordinated Couple Set – Sherwani & Lehenga',
    'couple-pairs',
    45999,
    99999,
    stock.couple,
    5,
    7,
    'Matching couple ethnic set for weddings.'
  ),
  p(
    '34',
    'couple-pastel-set',
    'Pastel Couple Wedding Set',
    'couple-pairs',
    38999,
    79999,
    stock.j,
    5,
    4,
    'Pastel coordinated wedding wear.'
  ),
]

export const products: Product[] = raw

export function discountPercent(product: Product): number {
  if (product.compareAtPrice <= product.price) return 0
  return Math.round((1 - product.price / product.compareAtPrice) * 100)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'new-arrivals')
    return [
      products[0],
      ...products.filter((p) => p.categoryId === 'lehenga-choli').slice(0, 7),
    ].filter(Boolean)
  return products.filter((p) => p.categoryId === categorySlug)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function searchProducts(q: string): Product[] {
  const s = q.trim().toLowerCase()
  if (!s) return []
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(s) ||
      p.description.toLowerCase().includes(s)
  )
}

export function getRelated(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit)
}
