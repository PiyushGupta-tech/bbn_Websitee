import type { BlogPost } from './types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'indian-wedding-anarkali-dresses',
    title:
      'Indian Wedding Anarkali Dresses – Buy Designer Ethnic Wear Online | bbn',
    excerpt:
      'Discover elegant Indian Wedding Anarkali Dresses at bbn. Shop premium designer ethnic wear including lehenga, sarees, and...',
    // Google Shopping thumbnail — Anarkali / ethnic wear
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS0YFlEKrzpcqSSuJBnl12YLqXcmSfQDqINOgfnsHO1_ihoVlab3l45CCvzAy0QuBR_ks9OCFqTKfo5UKwOOxYrE0xQHUN5jp_1SQqp_d2Aaw_lLoluTSjzDQ&usqp=CAc',
    body: [
      'Anarkali suits remain a timeless choice for Indian weddings and festive celebrations. At bbn, we curate designer pieces that blend traditional silhouettes with contemporary details.',
      'From floor-length chinnon anarkalis to georgette sets with sequin work, each piece is crafted for comfort and grandeur. Pair with statement jewellery from our collection for a complete look.',
      'Worldwide shipping and easy returns make shopping from anywhere simple. Explore our New Arrivals for the latest drops.',
    ],
  },
  {
    slug: 'buy-indian-lehenga-choli-online-usa',
    title: 'Buy Indian Lehenga Choli Online in USA | Bridal & Wedding Collection',
    excerpt:
      'Buy Indian bridal lehenga choli online in USA with worldwide shipping. Explore premium wedding lehenga, Banarasi silk lehenga...',
    // Google Shopping thumbnail — bridal lehenga
    image:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTi2HGVyO7TqpvYvBpY6Ucuh9PIbQH40k6w_yNEUcWdF2_zc2rjKZDt7aAdXekn69kOcz_0swzOjdtZ7r8Scl9DRXMmOYnTqemk09r3EkeJQvMM8NvgW_6MuJk&usqp=CAc',
    body: [
      'Shopping for bridal lehenga from the USA is seamless with our dedicated shipping and size guides. Banarasi silk, organza, and pure silk options cater to every ceremony—from sangeet to reception.',
      'Our bridal edit includes heavy embroidery, moti work, and dupattas that photograph beautifully. Contact us for custom stitching options.',
    ],
  },
  {
    slug: 'buy-indian-bridal-lehenga-usa-canada',
    title:
      'Buy Indian Bridal Lehenga Online in USA, Canada & Mexico | Premium Wedding Collection',
    excerpt:
      'Shop premium Indian bridal lehenga, Banarasi silk lehenga, sarees and salwar suits online at bbn with worldwide...',
    // Google Shopping thumbnail — bridal lehenga
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRx-TrTyyrrq6NeY31aKOwIta12n45p9XBRvamkZxTx2WeZFIULteZw51otm4YcSzm8q4KN2cm02-xRTCtz8ggA5B5U89PlS2b189sGRCvU_OPkKYhlFPO42g&usqp=CAc',
    body: [
      'North American customers trust bbn for authentic Indian bridal wear. We offer transparent pricing, secure payments, and tracked delivery.',
      'Whether you need a red bridal lehenga or a pastel reception look, our stylists can help you choose the right fit and fabric.',
    ],
  },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((b) => b.slug === slug)
}
