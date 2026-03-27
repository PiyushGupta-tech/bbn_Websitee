export const staticDocs: Record<
  string,
  { title: string; paragraphs: string[] }
> = {
  about: {
    title: 'About bbn',
    paragraphs: [
      'At bbn, we offer a comprehensive range of products across various categories:',
      'Fashion & Ethnic Wear: Premium sarees, lehengas, anarkalis, kurta sets, and Indo-western edits for weddings, festivals, and celebrations — plus curated styling picks.',
      'Fashion & Apparel: Trendy clothing and accessories for women and men.',
      'Jewelry: Beautiful and elegant jewelry pieces for every occasion.',
      "Women's saree & drape edits: Classic and contemporary sarees — Banarasi, tissue, silk, and printed drapes — with blouse pieces, petticoats, and styling picks for an elegant finish.",
      'Lehengas & festive women’s wear: Bridal and party lehengas, sharara sets, anarkalis, and half-saree looks for weddings, sangeet, and celebrations.',
      'Flash Deals & Clearance Sales: Exclusive deals and discounts on selected products.',
      'We regularly update our inventory with new arrivals and offer special promotions, flash deals, and clearance sales to provide our customers with the best value for their money.',
    ],
  },
  contact: {
    title: 'Contact Us',
    paragraphs: [],
  },
  wholesale: {
    title: 'Wholesale',
    paragraphs: [
      'bbn partners with boutiques, multi-designer stores, and online resellers across India and international markets.',
      'Wholesale pricing, curated catalog access, and dispatch timelines are shared after business verification and MOQ confirmation.',
      'For priority onboarding, email your store profile and product categories to care@bbn.demo. (Demo site — connect your CRM/ERP for live B2B workflows.)',
    ],
  },
  'shipping-policy': {
    title: 'Shipping Policy',
    paragraphs: [
      'We process and dispatch most in-stock domestic orders within 2–5 business days from payment confirmation. During festive peaks, launches, or sale periods, dispatch may take slightly longer.',
      'Domestic deliveries across India are fulfilled through trusted courier partners. Metro cities usually arrive faster; remote areas may require additional transit time.',
      'Free domestic shipping is available on eligible orders as shown at checkout. If an item or pincode is not eligible, shipping charges are displayed before payment.',
      'International orders are shipped via tracked courier services. Delivery timelines vary by country, customs processing, and local carrier conditions.',
      'Import duties, VAT/GST, customs clearance fees, and local handling charges (if any) are the responsibility of the customer unless explicitly stated otherwise at checkout.',
      'Once an order is shipped, you will receive tracking details by email. Please ensure shipping address and contact details are accurate to avoid delays or return-to-origin shipments.',
      'For order edits, address corrections, or urgent support, contact care@bbn.demo as early as possible after placing the order.',
    ],
  },
  'return-policy': {
    title: 'Return Policy',
    paragraphs: [
      'Returns are accepted for eligible unused items in original condition with tags, packaging, and invoice within the return window communicated at purchase.',
      'Items that are customized, altered, made-to-order, intimate wear, or marked final sale are generally non-returnable unless received damaged or incorrect.',
      'To request a return, contact care@bbn.demo with your order ID, item details, and issue photos (if applicable).',
      'Approved refunds are processed to the original payment method; timelines vary by payment provider and bank.',
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    paragraphs: [
      'Last Updated: December 2024',
      'bbnpay solution pvt ltd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.',
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    paragraphs: [
      'By accessing or using this website, you agree to the terms governing browsing, purchases, policies, and communication.',
      'Product color and texture may slightly vary due to lighting, photography, and screen calibration differences.',
      'Prices, offers, stock availability, and dispatch timelines may change without prior notice. Orders may be cancelled in case of pricing or inventory anomalies.',
      'This is a demo storefront; connect production legal, payment, and compliance systems before going live.',
    ],
  },
  'track-order': {
    title: 'Track Order',
    paragraphs: [
      'Enter your order number and email to see shipment status. (Demo — use any value to see placeholder message.)',
    ],
  },
}

/** Registered head office — Contact page “Our location” */
export const contactLocation = {
  intro: 'bbnpay solution pvt ltd is headquartered in Uttar Pradesh, India.',
  headOfficeLabel: 'Head office',
  lines: [
    'bbnpay solution pvt ltd',
    'Golden -1, Shop No. T3-910, Block T3',
    'Sector Techzone IV, Greater Noida',
    'Bisrakh, Gautam Buddha Nagar',
    'Uttar Pradesh - 201306',
    'India',
  ],
} as const

/** Contact page — Get in Touch + customer support */
export const contactPageContent = {
  getInTouchTitle: 'Get in Touch',
  getInTouchLead:
    "We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, our team is here to help.",
  customerSupport: {
    title: 'Customer Support',
    email: 'bbnpaysolution2025@gmail.com',
    emailDisplay: 'BBNPAYSOLUTION2025@GMAIL.COM',
    phoneDisplay: '9625761902',
    phoneTel: '+919625761902',
    hours: 'Monday - Saturday, 9:00 AM - 6:00 PM IST',
  },
  visitNote:
    'Visit our Contact Us page for more ways to reach us.',
} as const

export const faqItems = [
  {
    q: 'Do you ship worldwide?',
    a: 'Yes. We offer worldwide shipping with tracking on most orders.',
  },
  {
    q: 'How long does dispatch take?',
    a: 'Most in-stock orders are dispatched within 2–5 business days. Festive or sale periods can add additional processing time.',
  },
  {
    q: 'Is custom stitching available?',
    a: 'Yes. Contact us with your measurements after placing an order.',
  },
  {
    q: 'How do I choose the right size?',
    a: 'Refer to our size chart on each product page or message us for guidance.',
  },
  {
    q: 'Can I modify my address after placing an order?',
    a: 'Address edits are possible only before dispatch. Email support quickly with your order ID and updated address details.',
  },
  {
    q: 'Are duties included for international orders?',
    a: 'Usually no. Import duties/taxes are collected by destination customs or local carriers unless explicitly stated otherwise.',
  },
]
