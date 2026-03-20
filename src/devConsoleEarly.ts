/**
 * Runs before other app imports (import this file first in main.tsx).
 * Suppresses React’s DevTools install hint — it may use log, info, or warn.
 */
const REACT_DEVTOOLS_HINT =
  /Download the React DevTools|react\.dev\/link\/react-devtools|better development experience/i

function stringifyArgs(args: unknown[]): string {
  return args
    .map((a) => {
      if (typeof a === 'string') return a
      if (a == null) return ''
      if (typeof a === 'object' && a !== null && 'message' in a) {
        const m = (a as { message?: unknown }).message
        return typeof m === 'string' ? m : ''
      }
      return ''
    })
    .join(' ')
}

function shouldSuppress(args: unknown[]): boolean {
  return REACT_DEVTOOLS_HINT.test(stringifyArgs(args))
}

if (import.meta.env.DEV) {
  const methods = ['log', 'info', 'warn', 'debug'] as const
  for (const name of methods) {
    const orig = console[name].bind(console) as (...args: unknown[]) => void
    ;(console as Record<string, unknown>)[name] = (...args: unknown[]) => {
      if (shouldSuppress(args)) return
      orig(...args)
    }
  }

  /**
   * Some Chrome extensions inject youtube “content” scripts that throw on normal pages.
   * We can’t remove them from the page, but capture-phase handling may reduce duplicate reporting.
   */
  window.addEventListener(
    'error',
    (ev: Event) => {
      const e = ev as ErrorEvent
      const file = e.filename ?? ''
      const msg = e.message ?? ''
      if (
        file.includes('content-youtube-embed') ||
        file.includes('chrome-extension://') ||
        msg.includes('only be loaded in a browser extension')
      ) {
        ev.preventDefault()
        ev.stopImmediatePropagation()
      }
    },
    true,
  )
}
