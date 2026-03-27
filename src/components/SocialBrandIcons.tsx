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

