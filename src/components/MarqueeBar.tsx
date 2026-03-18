const items = [
  '💝 Wedding Sale ON! – Limited Time | Upto 70% OFF on All Orders! 🧵',
  '🛍️ Extra Discount Coupons: BUY3GET20 | WED10 ❤️',
  '✂️ Custom Stitching Available | ✈ Worldwide Shipping',
  '🚚 Free Shipping On all Orders Delivered in India',
  '🌍 Free Worldwide Shipping On All Orders Above $399 🚀',
]

export function MarqueeBar() {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((text, i) => (
          <span key={i} className="marquee-item">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
