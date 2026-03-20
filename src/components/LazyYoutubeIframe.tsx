import { useEffect, useRef, useState, type IframeHTMLAttributes } from 'react'

type LazyYoutubeIframeProps = {
  title: string
  src: string
  className: string
  allow: string
  allowFullScreen?: boolean
  referrerPolicy?: IframeHTMLAttributes<HTMLIFrameElement>['referrerPolicy']
  /** Delay before attaching iframe (ms) — staggers loads so extension scripts fire less at once */
  mountDelayMs?: number
}

/**
 * Mounts the YouTube iframe only when near the viewport (or after a short delay).
 * Fewer live embeds at once means fewer duplicate errors from broken browser extensions
 * that inject `content-youtube-embed.js` per frame.
 */
export function LazyYoutubeIframe({
  title,
  src,
  className,
  allow,
  allowFullScreen = false,
  referrerPolicy,
  mountDelayMs = 0,
}: LazyYoutubeIframeProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const root = wrapRef.current
    if (!root) return

    let delayTimer: ReturnType<typeof setTimeout> | undefined

    const enable = () => {
      if (mountDelayMs > 0) {
        delayTimer = setTimeout(() => setShouldMount(true), mountDelayMs)
      } else {
        setShouldMount(true)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          enable()
        }
      },
      { rootMargin: '180px', threshold: 0.01 },
    )

    io.observe(root)
    return () => {
      io.disconnect()
      if (delayTimer) clearTimeout(delayTimer)
    }
  }, [mountDelayMs])

  return (
    <div ref={wrapRef} className="lazy-youtube-wrap">
      {shouldMount ? (
        <iframe
          title={title}
          src={src}
          className={className}
          allow={allow}
          allowFullScreen={allowFullScreen}
          referrerPolicy={referrerPolicy}
        />
      ) : (
        <div className="lazy-youtube-placeholder" aria-hidden />
      )}
    </div>
  )
}
