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

/** YouTube / video extensions inject this; it throws on normal pages (e.g. after mailto navigation). */
function isExtensionScriptNoise(message: string, source: string): boolean {
  const m = message
  const s = source
  return (
    s.includes('content-youtube-embed') ||
    s.includes('chrome-extension://') ||
    s.includes('moz-extension://') ||
    s.includes('safari-extension://') ||
    m.includes('only be loaded in a browser extension') ||
    (m.includes('browser extension') && m.includes('script'))
  )
}

function stringifyOnErrorMessage(message: unknown): string {
  if (typeof message === 'string') return message
  if (message instanceof Error) return message.message
  if (message != null && typeof message === 'object' && 'message' in message) {
    const inner = (message as { message?: unknown }).message
    return typeof inner === 'string' ? inner : String(message)
  }
  return String(message ?? '')
}

if (import.meta.env.DEV) {
  const shouldSuppressExtensionConsoleError = (args: unknown[]): boolean => {
    const text = stringifyArgs(args)
    return isExtensionScriptNoise(text, text)
  }

  const methods = ['log', 'info', 'warn', 'debug'] as const
  for (const name of methods) {
    const orig = console[name].bind(console) as (...args: unknown[]) => void
    ;(console as Record<string, unknown>)[name] = (...args: unknown[]) => {
      if (shouldSuppress(args)) return
      orig(...args)
    }
  }

  const origError = console.error.bind(console) as (...args: unknown[]) => void
  console.error = (...args: unknown[]) => {
    if (shouldSuppressExtensionConsoleError(args)) return
    origError(...args)
  }

  /**
   * Suppress “Uncaught Error” spam from extension content scripts.
   * `preventDefault` on `error` does not stop Chrome from logging; returning `true` from `onerror` does.
   */
  const prevOnError = window.onerror
  window.onerror = function onerrorBbnpatch(
    message,
    source,
    _lineno,
    _colno,
    _error,
  ): boolean {
    const msg = typeof message === 'string' ? message : String(message ?? '')
    const src = typeof source === 'string' ? source : ''
    if (isExtensionScriptNoise(msg, src)) return true
    if (typeof prevOnError === 'function') {
      return prevOnError.call(window, message, source, _lineno, _colno, _error) === true
    }
    return false
  }

  window.addEventListener(
    'error',
    (ev: Event) => {
      const e = ev as ErrorEvent
      const file = e.filename ?? ''
      const msg = e.message ?? ''
      if (isExtensionScriptNoise(msg, file)) {
        ev.preventDefault()
        ev.stopImmediatePropagation()
      }
    },
    true,
  )

  window.addEventListener(
    'unhandledrejection',
    (ev: PromiseRejectionEvent) => {
      const r = ev.reason
      const msg =
        r instanceof Error
          ? r.message + (r.stack ?? '')
          : typeof r === 'string'
            ? r
            : String(r)
      if (isExtensionScriptNoise(msg, msg)) {
        ev.preventDefault()
      }
    },
    true,
  )
}
