import { useId } from 'react'

export type SocialBrandIconProps = {
  /** Pixel width/height of the icon (viewBox stays 24×24). */
  size?: number
  className?: string
}

/**
 * Facebook “f” on Meta blue — brand palette #1877F2.
 */
export function IconFacebookBrand({ size = 22, className = 'social-brand-svg' }: SocialBrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M13.5 12.8h2.2l.3-2.4h-2.5V9.4c0-.7.2-1.2 1.2-1.2h1.3V5.8c-.6-.1-1.3-.1-2-.1-2 0-3.4 1.2-3.4 3.5v2H8v2.4h2.1V19h2.5v-6.2z"
      />
    </svg>
  )
}

/**
 * Instagram camera on gradient tile (app-icon style).
 */
export function IconInstagramBrand({ size = 22, className = 'social-brand-svg' }: SocialBrandIconProps) {
  const uid = useId().replace(/:/g, '')
  const gid = `ig-brand-grad-${uid}`
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="35%" stopColor="#F77737" />
          <stop offset="60%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill={`url(#${gid})`} />
      <rect
        x="6.5"
        y="6.5"
        width="11"
        height="11"
        rx="2.8"
        fill="none"
        stroke="#fff"
        strokeWidth="1.35"
      />
      <circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" strokeWidth="1.35" />
      <circle cx="16.3" cy="7.7" r="0.85" fill="#fff" />
    </svg>
  )
}

/**
 * Pinterest “P” on brand red #E60023.
 */
export function IconPinterestBrand({ size = 22, className = 'social-brand-svg' }: SocialBrandIconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#E60023" />
      <g transform="translate(12 12) scale(0.76) translate(-12 -12)">
        <path
          fill="#fff"
          d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.655 2.568-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z"
        />
      </g>
    </svg>
  )
}
