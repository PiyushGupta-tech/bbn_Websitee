/**
 * Homepage “Watch & Buy” — muted autoplay YouTube embeds (minimal chrome).
 * Playlist: PLFpt2rlyru4HjLo9FIbjeg2g6uYZYiOTH
 */

export const WATCH_BUY_PLAYLIST_ID = 'PLFpt2rlyru4HjLo9FIbjeg2g6uYZYiOTH'

export type WatchBuyVideo = {
  /** YouTube video id */
  id: string
  /** start time in seconds (matches ?t= on youtu.be) */
  startSeconds: number
  /** Short line under the thumb */
  description: string
  /** “Add to cart” navigates here */
  shopHref: string
}

/** Clips — order matches homepage columns / horizontal scroll */
export const WATCH_BUY_VIDEOS: WatchBuyVideo[] = [
  {
    id: 'QtI_imDpFdE',
    startSeconds: 4,
    description: 'Tissue silk elegance draped in a striking contrast border.',
    shopHref: '/collections/sarees',
  },
  {
    id: 'sgS-ybd-eIo',
    startSeconds: 0,
    description: 'Regal lehenga edit — intricate gold work and rich tones.',
    shopHref: '/collections/lehenga-choli',
  },
  {
    id: 'mlbo1ra-vrM',
    startSeconds: 3,
    description: 'Indo-western fusion — celebration-ready silhouettes.',
    shopHref: '/collections/indo-western',
  },
  {
    id: 'Su3Ebk5H57A',
    startSeconds: 7,
    description: 'Statement ethnic look — refined draping and jewel tones.',
    shopHref: '/collections/gown-dresses',
  },
  {
    id: 'AELjjK2Ke9o',
    startSeconds: 4,
    description: 'Festive couture moment — bold embroidery and modern flair.',
    shopHref: '/collections/new-arrivals',
  },
]

/** First video id (floating widget + legacy exports) */
export const WATCH_BUY_YOUTUBE_VIDEO_ID = WATCH_BUY_VIDEOS[0].id

/**
 * Build embed URL: autoplay muted, no controls, loop single clip, playlist context.
 * Note: Browsers may limit multiple simultaneous autoplay; all iframes are muted.
 */
export function buildWatchBuyYoutubeEmbedSrc(videoId: string, startSeconds: number): string {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    fs: '0',
    disablekb: '1',
    iv_load_policy: '3',
    start: String(startSeconds),
    list: WATCH_BUY_PLAYLIST_ID,
    /** loop single video — playlist param must repeat the video id */
    loop: '1',
    playlist: videoId,
  })
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
}

/** Default embed (first video) — used by floating widget */
export function watchBuyYoutubeEmbedSrc(): string {
  const v = WATCH_BUY_VIDEOS[0]
  return buildWatchBuyYoutubeEmbedSrc(v.id, v.startSeconds)
}

export function watchBuyYoutubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}
