/** Royalty-free placeholders — swap for your CDN or /public/images */
const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=720&h=960&q=85`

/** Wide high-res stills for full-bleed heroes (small thumbs look blurry at 100vw) */
const heroW = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=88`

/** User-provided Indo-Western hero (Google Shopping thumb — consider replacing with a high-res asset in /public for production) */
const INDO_WESTERN_HERO =
  'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTazJkdkOa5E2ETNelYki9hYEouftysSSAiBRD0zOTXyh5-MpK6YE49FY3UUE1Yo-1Fpir7sjBgW5lhQH5Q0uQawrjGK1tH66-q0jEVxfwg'

/** Salwar Kameez hero — Sheetal Batra CDN */
const SALWAR_KAMEEZ_HERO =
  'https://sheetalbatra.com/cdn/shop/files/SB-0930copy.jpg?v=1749190511&width=1400'

/**
 * Red-saree / single-subject banner — hosted in /public for sharp full-width display.
 * (Google thumb ref, low-res: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAaQ8wSh3vN-voZ06HlAA_WJ1TLJo12Qca9r2ti_SrZhsvTTIZYhXbF48Qhr5cb-dHSRbj7FaHAhxRWQOi5joltWcrQQ9-&s&ec=121585077 )
 */
const RED_SAREE_BANNER = '/images/saree-red-hero-banner.png'

/** Success Stories — Sneha Patel avatar (Freepik) */
export const successStorySnehaPatel =
  'https://img.freepik.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg?semt=ais_rp_progressive&w=740&q=80'

/** Success Stories — Neha Sharma avatar (Freepik Premium) */
export const successStoryNehaSharma =
  'https://img.freepik.com/premium-photo/indian-woman-thinking-happy-college-scholarship-opportunity-campus-learning-university-student-smile-gen-z-class-schedule-idea-memory-decision-education_590464-381315.jpg'

/** Saree Glam carousel — Textile Mela (soft silk festive saree) */
const SAREE_GLAM_HERO =
  'https://textilemela.com/images/product/2023/09/rath-aarambh-traditional-soft-silk-festive-wear-saree-collection-2023-09-22_13_39_52.jpeg'

export const heroFullBleed = {
  regalLehenga: heroW('1610030469983-98e550d6193c', 2560),
  saree: SAREE_GLAM_HERO,
  salwar: SALWAR_KAMEEZ_HERO,
  indoWestern: INDO_WESTERN_HERO,
}

/** Top full-bleed banner — red saree / single subject (1024× native; CSS polish for color & clarity) */
export const topRegalHeroImage = {
  src: RED_SAREE_BANNER,
  srcSet: `${RED_SAREE_BANNER} 1024w`,
  width: 1024,
  height: 461,
} as const

export const stock = {
  a: u('1595777457583-95e059d581b8'),
  b: u('1610030469983-98e550d6193c'),
  c: u('1572804013309-59a088b7bbe3'),
  d: u('1583391733983-6c85511887f0'),
  e: u('1614083571970-ffd5d537c53a'),
  f: u('1594633313593-8fd0cd9e6c57'),
  g: u('1469334031218-e382a71b716b'),
  h: u('1509631179640-ce5c0c3d3a3c'),
  i: u('1515886657613-9f35135b6361'),
  j: u('1539008835657-9d5664990ee4'),
  k: u('1567924682947-b9e80df0439a'),
  l: u('1550614000-d5b8b67e92a5'),
  m: u('1544005313-94f41e4a5a45'),
  n: u('1490481651871-ab68de25d43d'),
  o: u('1515377902963-0f6cdbb0385d'),
  p: u('1529626455594-4ff0802cfb7e'),
  q: u('1534528741775-53994a69daeb'),
  r: u('1503341450203-d8967a5498c8'),
  s: u('1524504388940-b0107729d3b8'),
  t: u('1487412720507-e7ab37603c6f'),
  u: u('1502823403499-6ccdd4d45b7b'),
  v: u('1519741497674-611481863552'),
  w: u('1483988352575-de2596037c37'),
  x: u('1469334031218-e382a71b716b'),
  y: u('1582719478250-c89cae4dc85b'),
  z: u('1578662996442-48f60103fc96'),
  stock1: u('1566179616904-8975ec042117'),
  stock2: u('1515377902963-0f6cdbb0385d'),
  stock3: u('1614083571970-ffd5d537c53a'),
  stock4: u('1515560019520-2617e29ec1ad'),
  hero1: u('1595777457583-95e059d581b8'),
  hero2: u('1610030469983-98e550d6193c'),
  hero3: u('1572804013309-59a088b7bbe3'),
  hero4: u('1583391733983-6c85511887f0'),
  couple: u('1519741497674-611481863552'),
  blog1: u('1594633313593-8fd0cd9e6c57'),
  blog2: u('1469334031218-e382a71b716b'),
  blog3: u('1509631179640-ce5c0c3d3a3c'),
}
