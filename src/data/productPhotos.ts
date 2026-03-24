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
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSW6jB07LwdFPv12NpeRZjJFmbVEOn_QHsE0LN2Vlkd7o1QAugP3g-QelzuBr8ejzyXRLTYlj-d97REq3dQM6GDA22g7-sXkwyY-FLQB1jr',
  // Deep Blue Dream Silk Lehenga Choli with Detailed Embroidery (₹17,999 / ₹39,999) — Google Shopping thumbnail
  'deep-blue-dream-lehenga':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS5EgbR_oiERNh1hIfGAJ3vlvqbq0-3-ykqqYKgGGHGtCYMW-72eBNqu6Hrt5g2sT4bTrxsnWpvhYa1DJSVgpGGF2f9OWlTK9rRWWDQl2s6A7DWyIbKKdbo',
  // Designer Organza Embroidered Lehenga Choli with Glamorous Sequins (₹14,999 / ₹29,999) — Google Shopping thumbnail
  'designer-organza-lehenga':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT9NxS8LQBfvHjMPVSM3vkt2oCpXaWiod0KLn6MlXrmpcKdKlvAPignaQKRAZOVqxXJ1_G2yRFCtnC8Sdg4pqAXTjcDaQzDL3f4l30D6HJL4EOMIRIUY75c',
  // Pure Silk Moti And Cording Embroidery Bridal Lehenga Choli Dupatta (₹13,999 / ₹39,999) — Google Shopping thumbnail
  'pure-silk-moti-bridal-lehenga':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcThytzscvbAqddJfJ1AI0D3pSIFMAIA0d6-Lq3rjSC4YL7-78Zek96PdWcEFeftoJgsUD0ofnm6gpeX9MbIOSAFf--WgY-9jpZ-6nTz8zA',
  // Banarasi Silk Heavy Embroidered Bridal Lehenga Choli with Dupatta (₹19,999 / ₹59,999) — Google Shopping thumbnail
  'banarasi-bridal-lehenga':
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRLf2msgYWYaqUELXatn72U5qmc3_57CgDJLB9b85M2LR7sldkl6ghh9DySI8vb1umdfG1-aZbLclu9gUrdKaAi90zr_Ij6',
  // Luxury Silk Bridal Lehenga Choli – Handcrafted Elegance (₹29,999 / ₹79,999) — Google Shopping thumbnail
  'luxury-silk-bridal-lehenga':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQoNYuW3IVdOimQbCC5UYvdJM3Ey08pueNts54UmhvTkMvpKX9u2zKD7xdzH3SitGvYe3TEq3PeJePid5D9H8bPLZi4a2CcdMuv62HkR4s',
  // Golden Beige Stone Embellished Silk Lehenga Choli (₹17,999 / ₹36,999) — Google Shopping thumbnail
  'golden-beige-stone-lehenga':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRHEp0kqk60ccbCdnh32Ww9gojGITe2cKwiep_5_GwUvlH4JV0d_dsXneq4b1Djz1QmMyvYQQt7YzbZnKShD8HhfkE4IDlb',
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
  // RUDRAPRAYAG Georgette Embroidered Semi Stitched Long Top With Palazzo (₹2,299) — Google Shopping thumbnail
  'rudraprayag-georgette-embroidered-palazzo-suit':
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSx5ULcfD0ZZ9thPQUETNNMNguyqVYyKfJStWUjHMxHWYlUiVL4w9kN0c_Q3AFOavnWoUzPy-gpri9IiMi8yn3VmKosgadseBGvKKugvzT0RQBBNk758Wun',
  // Women's Ethnic Motifs Embroidered Kurta with Trousers and Dupatta (₹2,299 / ₹8,050) — Google Shopping thumbnail
  'womens-ethnic-motifs-embroidered-kurta-set':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRjw6RKc5VUKnuw0nXn1IAkAWEBQCqv60kCAyzhku0LR_tlGnk6lM8MP5uVGA7GqbrOqWcP7n9TWreeMS64qGiorKh1ZbIxQ76d8jUVmQ-1OFIisYO7DCjOGA',
  // Libas Peach Embroidered Poly Chiffon Straight Suit with Dupatta (₹2,199) — Google Shopping thumbnail
  'libas-peach-chiffon-straight-suit-dupatta':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTWvxsxh7cpDqyoHJUm8EDBeuHFVGef4lbh6D3w_duVJs_BLcvIxPRFLaaN66a1Mjmnpo8jGpoc5XlnejTtJyaIz7ZUR-kvPUgGD4eEGe3Vd7cn4bPiq2Rj',
  // Klosia Women Solid Embroidery Kurta and Pant Set With Dupatta (₹799) — Google Shopping thumbnail
  'klosia-solid-embroidery-kurta-pant-dupatta':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRfBB8sOprQUueCtycjhwWUySKHZGTDNMHoBl3TwfK65wWgl9kQWbMKC89mplIptjqi4XaVPOqF2NJvSZ8wzOGddMSJJrE4TbrFuJbkvbjSAUfQlte3dwlUIg',
  // KALINI Regular Republic Day Kurta (₹863) — Google Shopping thumbnail
  'kalini-regular-republic-day-kurta':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ2yRGMrNLoKO1726vs5M72lhPGk0dydpvD_BwYa3TfZQzC5M08MNdxv5dZpqEQ50do8oz3mSNEM8GpTRbke1cjGzXCrtJgZneRDuu6Wpo',
  // Suppar Sleave Women's Stylish Colorful Fancy Heavy Embroidered Kurta Pant & Dupatta (₹1,499) — Google Shopping thumbnail
  'suppar-sleave-womens-embroidered-kurta-pant-dupatta':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRzQJlqRhHrtBc1ItMgoPMsB1UDut6cbEZSqaZFgehZ5lNmTslekmWmPPGi77srcsjM9zXzoOF-fuepHsYcOHUIPh5ge2UGjkBRyRwczPIYCOcJ9LO1LZjB3w',
  // Shining Diva Women's Fancy Wedding Party Crystal Diamonds Necklace Jewellery Set (₹33,000) — Google Shopping thumbnail
  'shining-diva-crystal-diamonds-necklace-jewellery-set':
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRaDmbeSSi_-97m1Ls_bHqLzBvgGJNx4XopS5oux2X8PYo5JQ0Ljp92wmbZjnKuShF4ELSIda_oGUoMOJUAcocE7drcn0yi',
  // Giva Anushka Sharma Solitaire Heart Pendant (₹31,000) — Google Shopping thumbnail
  'giva-anushka-sharma-solitaire-heart-pendant':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRUbgbTi5CblAC-4koZIfWUpae1Cy1uBUSGl6Tjp4G8qa5FH22_1RbiNDyFLrIkxlIyDvqpIKxsaL0BxrePbt1uFVR9b8X824jzFSzyg7lTtFCGCDpHabfu',
  // Rubans 24K Gold-Plated Floral Design Studded Necklace Set (₹20,000) — Google Shopping thumbnail
  'rubans-24k-gold-plated-floral-studded-necklace-set':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQTZyG1ABRKRdb1A5-qEQm0MXMb5EMBG-0SR8KTC9q2BXg-GkQRq7s25h7mk4UNfro6vnNZNnSR02OquNG8LGy7J3dWRhMHSg0Kc30e2-uD',
  // Shining Diva Women's Traditional Kundan Necklace (₹30,000) — Google Shopping thumbnail
  'shining-diva-womens-traditional-kundan-necklace':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcStd7KS_fd3orhokl61oBIlTPbqiRQl7850K6gKxtaO8uGcExNhZoOSxhdl7_p89w5DWFFPSCTjjseBnX2zP_VJ0Extia3rNktpU2aUf-a-Y11A0hhq6kuZ',
  // Shining Diva Women's Latest Choker Design Antique Kundan Traditional Necklace Jewellery Set (typically ₹300–₹325) — Google Shopping thumbnail
  'shining-diva-womens-choker-antique-kundan-necklace-jewellery-set':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSsVN3TatoZdAaBWIegQYkh_TRTX1G7LDCkb0huFoSVaX7utRyc2VFJUXf98f8Gsu7nU5PNn89P2S9LsXr8WKIFAaSENFQ-2Ih2AV_gTTp0qgSthQLe18vnhQ',
  // Zaveri Pearls Gold-Plated Kundan Stone Studded & Beaded Jewellery Set (₹15,000) — Google Shopping thumbnail
  'zaveri-pearls-gold-plated-kundan-beaded-jewellery-set':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRcQWaFu0SzJljK8vbcOf7f49RHsVSU60UHkTaSQoHgisgpJRDVQdzAKr0s_ME7ZdL5SjFhIhmecPf737OUNeJgWzBePSpO3RpvNMPsKZyGaCtcwq5n-MRFGA',
  // Lime Luxe Indo-Western Viscose Suit Set with Palazzo & Dupatta (₹6,999 / ₹19,999) — Google Shopping thumbnail
  'lime-luxe-indo-western':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSsSz4J64Q0NAUMq-EQmHWbFwn1sZ_uS1ze943If7ZCHusCzSF9P-SfHq9Y2ZE5dMF8Xgss3y5-CFKvlhRnwylLZSPPWJdW8mJdfU96YvHVGBgg7UI5LQNIFg&usqp=CAc',
  // Elegant Rani Pink Georgette Lehenga Set with Designer Touch (₹4,999 / ₹14,999) — Google Shopping thumbnail
  'rani-pink-georgette-lehenga-set':
    'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpLtyoRLOFOIbo6KGV8UsD90WBMMjeEB6hoNm_CE45-0c0gFOF61z0Nx1ORuGT_Fp65fQyKpBgq09t0eB2bcEQpSUU14BT0bndlFSyeDg&usqp=CAc',
  // Coordinated Couple Set – Sherwani & Lehenga (₹45,999 / ₹99,999) — Google Shopping thumbnail
  'couple-coordinated-sherwani-lehenga':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSj_OnEP8AvyyiKnrZT-mouxNNo0QZv6kXh_ZyTaOxc57r0AX6JOgjO-zOC_8PMF_VxjvWeT3mShFuWx5K3wp0L5EJT__cwUA',
  // Pastel Couple Wedding Set (₹38,999 / ₹79,999) — Google Shopping thumbnail
  'couple-pastel-set':
    'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQifUqMHChoN6IOpHNSMg7EdBX1HDJKyg0ViJzOa6TlWp0ux6m88B_GAPWTBs_KSAs2YqFak1jTHE5jDWc0vgaAe_R0_gxQmZV4d4EZueQ',
  // Torani Shereen Kaur & partner — Custom Mehre Zara Lehenga couple set (₹3,67,500) — Google Shopping thumbnail
  'torani-shereen-mehre-zara-lehenga-couple-set':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR35jB-U50mmIIq270kp5rbEH6RNRfMHzTfyWmIVl94KzA5_H1_QL7VB0hUfSEAbzo15FnKz8aL99viWmPknoi5pbpab0uHyg',
  // Couple Indian Matching Georgette Silk Lehenga Choli & Kurta Pajama Set (₹5,049) — Google Shopping thumbnail
  'couple-georgette-silk-lehenga-choli-kurta-pajama-set':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRA20CIN_RDe-CiLg6jRuKDPK7m7UJkS1qIbHiSCYYRJzjVRmETwQS-inPCSUdmCMglyhtx3m-EtKHTBcNWSVGHE_hAMKPuyWsaaidAAO3kaI1D3CyI_VCfxQ',
  // Ice Blue Heritage Embroidered Ethnic Perfect Couple Matching Outfit (₹6,249) — Google Shopping thumbnail
  'ice-blue-heritage-embroidered-couple-matching-outfit':
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQnornVRInSJ--3KDALF7wgFrLlDWCE-oA_rIMecMB-M5JezO4nGhk3jDOrPINLRATIwkCtdxseaazFaAu5QMAQkcDZdSLj',
  // Archittam Fashion Exquisite Couple Dress (₹1,899) — Google Shopping thumbnail
  'archittam-fashion-exquisite-couple-dress':
    'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSoDVazmZo3wdgG29J3hQJw58gozhaZpRYeTY9BSjClSK2aFQCrxrURU_oyV1qN9YYW_9NZCWlockpAwLxUSv2aCB9I8WaL_wDSfS2F2T9q',
}

export function photoForSlug(slug: string, fallback: string): string {
  return productPhotos[slug] ?? fallback
}
