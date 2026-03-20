import { useState, useEffect } from 'react'

const STORAGE_KEY = 'bbn-dismiss-ext-hint'

/**
 * Dev only: explains console errors from browser extensions (e.g. content-youtube-embed.js).
 * The site cannot remove extension code — user disables the extension or filters the console.
 */
export function DevBrowserHint() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!import.meta.env.DEV) return
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      /* ignore */
    }
    setVisible(true)
  }, [])

  if (!import.meta.env.DEV || !visible) return null

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <div className="dev-browser-hint" role="status">
      <div className="dev-browser-hint-body">
        <p className="dev-browser-hint-title">
          <strong>Not a bug in bbn:</strong>{' '}
          <code>content-youtube-embed.js</code> is injected by a <strong>Chrome extension</strong> (often
          YouTube-related). This repo does not include that file.
        </p>
        <ul className="dev-browser-hint-steps">
          <li>
            <strong>Fix:</strong> open <code>chrome://extensions</code> → turn off YouTube / video enhancer
            extensions, or click <em>Details</em> → <em>Site access</em> → don’t run on{' '}
            <code>localhost</code>.
          </li>
          <li>
            <strong>Hide in DevTools:</strong> in the Console filter box, enter{' '}
            <code className="dev-browser-hint-code">-chrome-extension://</code> to hide extension messages.
          </li>
        </ul>
        <p className="dev-browser-hint-note">
          We also <strong>lazy-load</strong> YouTube embeds so fewer players start at once (less noise from
          buggy extensions).
        </p>
      </div>
      <button type="button" className="dev-browser-hint-dismiss" onClick={dismiss}>
        Dismiss
      </button>
    </div>
  )
}
