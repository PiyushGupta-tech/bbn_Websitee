/** Vizup shoppable video IDs (embed from partner Lavante catalog, branded as bbn in UI) */
export const VIZUP_WID = '11158'
export const VIZUP_ORIGIN = 'https://lavantefashion.com'

export const VIZUP_VIDEO_IDS = [
  '360307',
  '391210',
  '391209',
  '382667',
  '372435',
  '382909',
  '382666',
  '373354',
  '371474',
  '373609',
  '373943',
  '363692',
  '371571',
  '372231',
  '373153',
  '362159',
] as const

export function vizupVideoUrl(vid: string): string {
  return `${VIZUP_ORIGIN}/?vizup_wid=${VIZUP_WID}&vizup_vid=${vid}`
}

/**
 * URL for <iframe src> on this site. Uses dev/preview proxy (/lavante-vizup) so bbn’s source
 * X-Frame-Options: DENY is not applied. Production: set VITE_VIZUP_IFRAME_BASE to your own
 * reverse proxy that strips X-Frame-Options + CSP frame-ancestors (see README).
 */
export function vizupIframeSrc(vid: string): string {
  const q = `?vizup_wid=${VIZUP_WID}&vizup_vid=${encodeURIComponent(vid)}`
  const base = import.meta.env.VITE_VIZUP_IFRAME_BASE as string | undefined
  if (base?.trim()) return `${base.replace(/\/$/, '')}${q}`
  return `/lavante-vizup${q}`
}
