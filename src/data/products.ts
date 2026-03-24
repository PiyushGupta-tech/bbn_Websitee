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
  description: string,
  sizes?: string[]
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
    ...(sizes?.length ? { sizes } : {}),
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
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTKwM0vG8jRH4R-k3jlzheiSXCcUD8UstVeonSvTRv_7buv7yHRiTKMliOtzu43a_ICqNk0SXOuzrCdNfSM9Mb4hPK9gEDMggXBF_C9MUWbL81tOSpOxgwdyQ',
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
    'https://ethnicvastram.com/wp-content/uploads/2025/12/Alizeh-5017-1.webp',
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
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQN0fGV2Pirbuj-HhfflbUHYB_6CodvpfZAqyaNcq0abChdCEnly5QPokffb1LZoqLNn9Yx1pTJYtVpst01bfHad9eVVvF3cSXkwqUxip3E',
    5,
    5,
    'Satin sharara ready to wear.'
  ),
  p(
    '24',
    'indo-western-jacket-suit',
    'Designer Indo-Western Jacket Suit with Intricate Cut Dana Detailing',
    'indo-western',
    6999,
    19999,
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRKJ24y4Fv52jx9Bs-kWNhBeLipZaPXZ6k-tNbabf6lIgP5C_2qJH-xsW4mnkpmyrOhJCCFFffMXsc0xbmrmwjmbyxLjBPV6ZChjnbS-DGvutYLwDv102w4gw',
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
    '31',
    'designer-gown-magenta',
    'Magenta Pink Handcrafted Designer Gown With Vibrant Embellished Details',
    'gown-dresses',
    13999,
    39999,
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTlCiRi62Qh5xcOZvhrdFXXnSNRjVgu7f-gby3pjVrRVgKGGogNvQgT29DYoMwfpSz7TW8kK2wmUcSYORGZAosW7lHA1LYDGFp2KtGAWbufPxysS9Zcwnm9VA',
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
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRcXGdYja1WJ1WFtPYr0epEylqtaCRhExVnFiXZGNKPGrVsnEZ2LIrSJTsDgpjR2PyymIDr9JVPsszg4vm_LeWSUK9wsEyBLgGf1vtBrBTG2T2-1O8ZmAcRAw',
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
    photoForSlug('couple-coordinated-sherwani-lehenga', stock.couple),
    5,
    7,
    'Coordinated sherwani and lehenga couple set — perfect for weddings and receptions.'
  ),
  p(
    '34',
    'couple-pastel-set',
    'Pastel Couple Wedding Set',
    'couple-pairs',
    38999,
    79999,
    photoForSlug('couple-pastel-set', stock.couple),
    5,
    4,
    'Pastel coordinated couple wedding set — soft tones for ceremonies and receptions.'
  ),
  p(
    '35',
    'rudraprayag-georgette-embroidered-palazzo-suit',
    'RUDRAPRAYAG Georgette Embroidered Work Semi Stitched Long Top With Palazzo Salwar Suit For Women',
    'salwar-kameez',
    2299,
    2299,
    photoForSlug('rudraprayag-georgette-embroidered-palazzo-suit', stock.v),
    4,
    5,
    'Georgette embroidered semi-stitched long top with palazzo — elegant salwar suit for everyday and festive wear.'
  ),
  p(
    '36',
    'womens-ethnic-motifs-embroidered-kurta-set',
    "Women's Ethnic Motifs Embroidered Kurta with Trousers and Dupatta",
    'salwar-kameez',
    2299,
    8050,
    photoForSlug('womens-ethnic-motifs-embroidered-kurta-set', stock.w),
    4,
    8,
    'Ethnic motifs embroidered kurta with matching trousers and dupatta — complete three-piece salwar suit set.'
  ),
  p(
    '37',
    'libas-peach-chiffon-straight-suit-dupatta',
    'Libas Peach Embroidered Poly Chiffon Straight Suit with Dupatta',
    'salwar-kameez',
    2199,
    2199,
    photoForSlug('libas-peach-chiffon-straight-suit-dupatta', stock.x),
    4,
    6,
    'Peach poly chiffon straight suit with embroidery and matching dupatta — Libas ethnic three-piece set.'
  ),
  p(
    '38',
    'klosia-solid-embroidery-kurta-pant-dupatta',
    'Klosia Women Solid Embroidery Kurta and pant set With Dupatta',
    'salwar-kameez',
    799,
    799,
    photoForSlug('klosia-solid-embroidery-kurta-pant-dupatta', stock.y),
    4,
    5,
    'Solid kurta with embroidery, matching pants and dupatta — affordable three-piece Klosia set.'
  ),
  p(
    '39',
    'kalini-regular-republic-day-kurta',
    'KALINI Regular Republic Day Kurta',
    'salwar-kameez',
    863,
    863,
    photoForSlug('kalini-regular-republic-day-kurta', stock.z),
    4,
    4,
    'KALINI regular-fit Republic Day kurta — ethnic cotton-blend kurta for patriotic and festive wear.'
  ),
  p(
    '40',
    'suppar-sleave-womens-embroidered-kurta-pant-dupatta',
    "Suppar Sleave Women's Stylish Colorful Fancy Heavy Embroidered Kurta Pant & Dupatta",
    'salwar-kameez',
    1499,
    1499,
    photoForSlug('suppar-sleave-womens-embroidered-kurta-pant-dupatta', stock.stock1),
    4,
    5,
    'Colorful fancy heavy embroidered kurta with matching pants and dupatta — stylish three-piece Suppar Sleave set.'
  ),
  p(
    '41',
    'shining-diva-crystal-diamonds-necklace-jewellery-set',
    "Shining Diva Women's Fancy Wedding Party Crystal Diamonds Necklace Jewellery Set",
    'jewellery',
    33000,
    33000,
    photoForSlug('shining-diva-crystal-diamonds-necklace-jewellery-set', stock.stock2),
    5,
    28,
    'Crystal and diamond-look necklace jewellery set for weddings and parties — Shining Diva fancy matching set.'
  ),
  p(
    '42',
    'giva-anushka-sharma-solitaire-heart-pendant',
    'Giva Anushka Sharma Solitaire Heart Pendant',
    'jewellery',
    31000,
    31000,
    photoForSlug('giva-anushka-sharma-solitaire-heart-pendant', stock.stock3),
    4.8,
    340,
    'Giva solitaire heart pendant from the Anushka Sharma collection — sterling silver with elegant heart design, gift-ready.'
  ),
  p(
    '43',
    'rubans-24k-gold-plated-floral-studded-necklace-set',
    'Rubans 24K Gold-Plated Floral Design Studded Necklace Set',
    'jewellery',
    20000,
    20000,
    photoForSlug('rubans-24k-gold-plated-floral-studded-necklace-set', stock.stock4),
    4.5,
    41,
    'Rubans 24K gold-plated floral studded necklace set — elegant party and festive jewellery with matching look.'
  ),
  p(
    '44',
    'shining-diva-womens-traditional-kundan-necklace',
    "Shining Diva Women's Traditional Kundan Necklace",
    'jewellery',
    30000,
    30000,
    photoForSlug('shining-diva-womens-traditional-kundan-necklace', stock.stock1),
    4.5,
    36,
    'Traditional kundan-style necklace by Shining Diva — perfect for weddings, festivals, and ethnic occasions.'
  ),
  p(
    '45',
    'zaveri-pearls-gold-plated-kundan-beaded-jewellery-set',
    'Zaveri Pearls Gold-Plated Kundan Stone Studded & Beaded Jewellery Set',
    'jewellery',
    15000,
    15000,
    photoForSlug('zaveri-pearls-gold-plated-kundan-beaded-jewellery-set', stock.stock2),
    4.6,
    52,
    'Gold-plated kundan stone studded and beaded jewellery set by Zaveri Pearls — ideal for weddings, festivals, and ethnic occasions.'
  ),
  p(
    '46',
    'shining-diva-womens-choker-antique-kundan-necklace-jewellery-set',
    "Shining Diva Women's Latest Choker Design Antique Kundan Traditional Necklace Jewellery Set",
    'jewellery',
    20000,
    32500,
    photoForSlug('shining-diva-womens-choker-antique-kundan-necklace-jewellery-set', stock.stock3),
    4.5,
    64,
    'Antique kundan choker-style traditional necklace jewellery set by Shining Diva — weddings, festivals, and ethnic wear.'
  ),
  p(
    '47',
    'torani-shereen-mehre-zara-lehenga-couple-set',
    'Torani Shereen Kaur and Her Partner Custom Mehre Zara Lehenga Set',
    'couple-pairs',
    367500,
    367500,
    photoForSlug('torani-shereen-mehre-zara-lehenga-couple-set', stock.couple),
    5,
    3,
    'Torani custom Mehre Zara lehenga couple set — coordinated bridal look for Shereen Kaur and partner, luxury wedding wear.'
  ),
  p(
    '48',
    'couple-georgette-silk-lehenga-choli-kurta-pajama-set',
    'Couple Indian Matching Georgette Silk Lehenga Choli and Kurta Pajama Set',
    'couple-pairs',
    5049,
    5049,
    photoForSlug('couple-georgette-silk-lehenga-choli-kurta-pajama-set', stock.couple),
    4.5,
    22,
    'Matching Indian couple set — georgette silk lehenga choli for her and kurta pajama for him, coordinated festive and wedding wear.'
  ),
  p(
    '49',
    'ice-blue-heritage-embroidered-couple-matching-outfit',
    'Ice Blue Heritage Embroidered Ethnic Perfect Couple Matching Outfit',
    'couple-pairs',
    6249,
    6249,
    photoForSlug('ice-blue-heritage-embroidered-couple-matching-outfit', stock.couple),
    4.6,
    31,
    'Ice blue heritage embroidered ethnic couple set — coordinated matching outfit for him and her, perfect for weddings and festive occasions.'
  ),
  p(
    '50',
    'archittam-fashion-exquisite-couple-dress',
    'Archittam Fashion Exquisite Couple Dress',
    'couple-pairs',
    1899,
    1899,
    photoForSlug('archittam-fashion-exquisite-couple-dress', stock.couple),
    4.5,
    18,
    'Archittam Fashion exquisite couple dress — coordinated ethnic matching outfit for him and her, ideal for parties and festive occasions.'
  ),
]

export const products: Product[] = raw

export function discountPercent(product: Product): number {
  if (product.compareAtPrice <= product.price) return 0
  return Math.round((1 - product.price / product.compareAtPrice) * 100)
}

/** Every product in the catalog (sorted A–Z for the shop-all page). */
export function getAllProducts(): Product[] {
  return [...products].sort((a, b) => a.title.localeCompare(b.title, 'en'))
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
