/**
 * Stable product hero images (Unsplash — ethnic / bridal / saree).
 * To use your own wallpapers: add files under public/images/products/ and replace URLs below.
 */
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=720&h=960&q=85`

export const productPhotos: Record<string, string> = {
  // Lehengas — distinct looks (orange/navy vs deep blue vs organza vs bridal)
  // Warm orange / bridal lehenga — replace with /images/products/… for your wallpaper
  // Vibrant Orange & Navy Silk Lehenga Choli (₹17,999 / ₹39,999) — Google Shopping thumbnail
  'vibrant-orange-navy-lehenga':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSnfjK1GxBqpHkNu-Aed2bJ4gy8KN3Rp_v5EGPAUEHIFYJiK8tgMg-mtuHkdxxpD9mfAzpm5h2NzO0lLjikEQZlphV6ORUaiB8MH-LCawg&usqp=CAc',
  // Deep Blue Dream Silk Lehenga Choli with Detailed Embroidery (₹17,999 / ₹39,999) — Google Shopping thumbnail
  'deep-blue-dream-lehenga':
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSIa19pZzSc3RghBAL6fbkbKblasYKDQi5wPKd2KjIYGiqe0Y9mWHLsONwl1eMFH3kbJ22JKaCyqk2JrQtmjcICVBAQ-G8ajfTVsNZDOnyq&usqp=CAc',
  // Designer Organza Embroidered Lehenga Choli with Glamorous Sequins — Google Shopping thumbnail
  'designer-organza-lehenga':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQP9arJBMoIfXejqUv1-0zlf8x81rLZxP4usPMv5d1FMrvGaVtTRlUo7hp4niXRIUkmoYB2fIiSzEFG6sCXMhYNF5Q5x1_3k6BePmhrfCe90-AlqKXX2vvc9A&usqp=CAc',
  // Pure Silk Moti And Cording Embroidery Bridal Lehenga Choli Dupatta (₹13,999 / ₹39,999) — Google Shopping thumbnail
  'pure-silk-moti-bridal-lehenga':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSXQL_vh26sEOvtJ0680ssHS_8iMuzU6bHXsHj06ObG46nJ9v2-CTySLz5g6VeKPHArGfWmQ24-S8EGIH3RbFYngC_TTMY1Tst0gd1x7SI&usqp=CAc',
  // Banarasi Silk Heavy Embroidered Bridal Lehenga Choli with Dupatta (₹19,999 / ₹59,999) — Google Shopping thumbnail
  'banarasi-bridal-lehenga':
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQLK2M_j1MdIWoCG9FtxPUHfw8TmjRVmsThExy6rmd_BRGINm3DNB9PNTeXFsSlBrDudWpb17GQ2tV1RGSV-elBQSODUlRze83p1wRQbiFF70RVQpeaqxKYaSk&usqp=CAc',
  // Luxury Silk Bridal Lehenga Choli (₹29,999 / ₹79,999) — Google Shopping thumbnail
  'luxury-silk-bridal-lehenga':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTXiwuhByDXgoA43RRLPsUkdx7zGsE_hUxaFWtKJEN-vr4GfYwTS3U_J_4_ctR7wRPh7N74DOAVAZJ94Pk5I6q8o7xcwnhHwa5_cpBwpkotLBy-oKFmYBq3Z0M&usqp=CAc',
  // Golden Beige Stone Embellished Silk Lehenga Choli (₹17,999 / ₹36,999) — Google Shopping thumbnail
  'golden-beige-stone-lehenga':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSeIIt2qGvovQYj8RxCLkM16RwHFs7nhrw9I55QV15xDgXFqJaP1kWnwMkIJmOUXfxt8ODJYcJSE-97U211GiSr1OOCNcJDaJzPa0dFJ1Y&usqp=CAc',
  // Designer Bridal Satin Zardozi (₹13,999 / ₹39,999) — Google Shopping thumbnail
  'designer-bridal-satin-saree':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQGgsx6HFjgz_2HHuRYwaH5O19ZgnI3RZaLQRKJexmtZ-5B0eg-y84FXvjHBcuctkg2rEbLeJUvF5BaQvmVID-onr0lbyYZD9zf9qsm8ZoT&usqp=CAc',
  // Sarees — Banarasi Silk Saree Heritage (₹1,999) — Google Shopping thumbnail
  'banarasi-silk-saree-heritage':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQnkq-7yyyMTdbehBY8b8mztzn6EJ060r2IhPyhgoZQBRVhVWjoYGd0-ZN7vuI6qXhM6eVUjMKsIPTDKPviLRaO_ubcbUUNVndyudFS1ednvJQ0mDl0HBNXnw&usqp=CAc',
  // Premium Floral Banarasi (₹3,999) — Google Shopping thumbnail
  'premium-floral-banarasi':
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTe99VBYwJW_cn1ijCz2IcpH1XNjyAniKj9lO-xCyKv558YEyV6FWal35BOD_sdLmQJXeK2XRTZNr2Y8rq2FLfZD3is5KiRxecEC8oW6xp2fdUHE2FWRE2bbw&usqp=CAc',
  // Soft Dola Viscose 3D Pallu (₹7,999 / ₹21,999) — Google Shopping thumbnail
  'soft-dola-viscose-saree':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTJw6CAhX370jm7v88aXpPr_BRRZ3NmQl4B7JduCGjz-qS2PmVBP6nTNS8j8P0E8o7Evm2X-DFAZqDYPfR_oSPT2zdEAe15QxXc8qtPBLVSzthh4I1Eu_E&usqp=CAc',
  // Soft Silk Ikkat Border (₹3,999 / ₹11,999) — Google Shopping thumbnail
  'soft-silk-ikkat-saree':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRg5l34HL9vHqLh-qYEHRbxjqHEenaxlxCn4g-E0S-lc0UH2W_iSDczZLCmzayvLSYLt7oW1BGzhoQ5tBPXSpNJGNSJGeUOrcAMKNnp0udaEtWk7VJVP607md0C_J0VUWE2nKRIZafMhAw&usqp=CAc',
  // Pure Handloom Linen digital print (₹3,999 / ₹10,999) — Google Shopping thumbnail
  'pure-handloom-linen-saree':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS7285vTkhlES1XFvgPANVbAus5YTvlmitQGB7DBtyGmaUAxLaZVgYInAm0yLaYvYHJniGoxsYNfXTVXV2TuVZ3RXVKCTYqTSAa9l2_kBWm9PMHJjm0Wif8&usqp=CAc',
  // Graceful Loom handloom silk (₹2,999 / ₹9,999) — Google Shopping thumbnail
  'graceful-loom-handloom-silk':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTcU74_XDA-sxfC0GLBU1PdNF23i5BW27PdOHiJKYaxNurZxu0bfBY6ZJrnTLwfx0WNE7N1Ai-zxDa5So4Vt9WZa9SHjyweeJ9v9CaXvBhwPgFZInNHmVp_-bI&usqp=CAc',
  // Yellow Chinnon Silk Embroidered Anarkali with Dupatta (₹6,999 / ₹19,999) — Google Shopping thumbnail
  'yellow-chinnon-anarkali':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRvTTOiGgqykTADiG2YUAusxjJsMW4HN3g-hZjfAhcoKZaYes0u8t6l3VBL5olJwJ4n7EbdVMuNd-2wAl53cPTSip8SyjbimdLxSSDzPiBb&usqp=CAc',
  // Orange Georgette Embroidered Sequin Anarkali with Dupatta (₹6,999 / ₹19,999) — Google Shopping thumbnail
  'orange-georgette-anarkali':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSetVrOdqTu-boWUTaAPHAj1jPkcC65-M4PhZMse7067pXBdy8LYk2FAZQrffCHcwhkWGDYztM8QRxLhOfE_pOx8RHGEV93-ouoZ3vcJfduQcgiTscWB3ReCQ&usqp=CAc',
  // Orange Georgette Embroidered Sequin Anarkali – Indo-Western (₹6,999 / ₹19,999) — Google Shopping thumbnail
  'orange-georgette-indo-western':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRUvsPmJ-XdjIYPrSH_gKYwBt77MAA_0_t5kDCFZEqmmbKiPopyJvAfLYBDUswmTRvgeQK4U1ai-Gvj03kY1e3EiD8dr6YZDbwUkJNt7KWAq3fXuamPzqeb&usqp=CAc',
  // Royal Radiance Chinnon Palazzo Suit (₹6,999 / ₹16,999) — Google Shopping thumbnail
  'royal-radiance-palazzo':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ9yIZa11sn1iQN638_0Qg0OuD-C1qCLANKaEPEXy-wNJKhhkDi0V9WtLd2441QQWxfpeiSsziaQmaKWejh8zooMIUa2T4wx2bhADeXecPeVv30jhB1p3vGPg&usqp=CAc',
  // Regal Embroidered Sharara Ensemble with Statement Dupatta (₹6,999 / ₹18,999) — Google Shopping thumbnail
  'regal-sharara-ensemble':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRjWJdm1mk0kgDdJjQlYC6Eru4YbF3KYTgmN2jOrF0M2J90NIeuP_TTg-ObPafGijzx-aqNaiDrYjVnTOdhRukk-lR26A4zJWz_4Zrj9csuEH1kLhlDlpdICQ&usqp=CAc',
  // Lime Luxe Indo-Western Viscose Suit Set with Palazzo & Dupatta (₹6,999 / ₹19,999) — Google Shopping thumbnail
  'lime-luxe-indo-western':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSsSz4J64Q0NAUMq-EQmHWbFwn1sZ_uS1ze943If7ZCHusCzSF9P-SfHq9Y2ZE5dMF8Xgss3y5-CFKvlhRnwylLZSPPWJdW8mJdfU96YvHVGBgg7UI5LQNIFg&usqp=CAc',
  // Elegant Rani Pink Georgette Lehenga Set with Designer Touch (₹4,999 / ₹14,999) — Google Shopping thumbnail
  'rani-pink-georgette-lehenga-set':
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpLtyoRLOFOIbo6KGV8UsD90WBMMjeEB6hoNm_CE45-0c0gFOF61z0Nx1ORuGT_Fp65fQyKpBgq09t0eB2bcEQpSUU14BT0bndlFSyeDg&usqp=CAc',
}

export function photoForSlug(slug: string, fallback: string): string {
  return productPhotos[slug] ?? fallback
}
