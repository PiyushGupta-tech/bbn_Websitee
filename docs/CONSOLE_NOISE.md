# Browser console messages (not app bugs)

## “Download the React DevTools…”

React prints this in **development** to suggest the [React DevTools](https://react.dev/link/react-devtools) browser extension. It is optional.

- **Hide the tip:** `src/devConsoleEarly.ts` is imported **first** in `main.tsx` so the console is patched before React loads (React may use `log`, `info`, or `warn`).
- **Use DevTools:** install the extension from the Chrome/Firefox store.

## “[Intervention] Slow network… Fallback font…”

This usually appeared when fonts were loaded from **Google Fonts** over a slow link.

- **Fix in this repo:** fonts are **bundled** with [Fontsource](https://fontsource.org/) (`src/fonts.ts` + npm `@fontsource/*` packages) and served from your app origin — no `fonts.googleapis.com` / `fonts.gstatic.com` requests, so this intervention should stop.

## `content-youtube-embed.js` — “only be loaded in a browser extension”

This stack trace comes from a **Chrome extension** (path often starts with `chrome-extension://`). A YouTube-related extension injects a script that throws when run on normal pages.

**Fix (pick one):**

1. **`chrome://extensions`** — disable YouTube / “enhancer” extensions, or restrict **site access** so they don’t run on `localhost`.
2. **Console filter** — in DevTools, set the filter to **`-chrome-extension://`** to hide extension logs.

**In this repo:** YouTube players use **`LazyYoutubeIframe`** so embeds start **after** they’re near the viewport and are **staggered**, which reduces how many players hit buggy extensions at once. That does **not** replace disabling a broken extension.

In **development**, **`DevBrowserHint`** (bottom bar) explains the above once per session until dismissed.

## Content Security Policy (CSP) — report-only / `unsafe-eval`

Messages like *“violates the following Content Security Policy directive”* with **“The policy is report-only”** mean something (often an **iframe**, e.g. YouTube, or an **extension**) is reporting a policy check; the browser is **not** blocking your app because of that report.

- **Vite dev:** `vite.config.ts` sets a dev `Content-Security-Policy` header so your app scripts and HMR are explicitly allowed.
- **YouTube embeds:** third-party players may still trigger separate CSP / permissions logs; that’s expected.

## `Permissions policy violation: compute-pressure`

YouTube (or the browser) may probe the **Compute Pressure** API inside the embed. Your top-level page often does not grant that permission to cross-origin frames, so Chrome logs a **violation** (informational). It does not break playback.

**No change required** for normal demo use.

## Summary

| Message                         | Cause              | Action                                      |
| ------------------------------- | ------------------ | ------------------------------------------- |
| React DevTools download         | React dev build    | Filtered in dev / install extension         |
| `content-youtube-embed.js`      | Browser extension  | Disable extension or ignore                 |
| CSP report-only                 | iframe / extension | Safe to ignore if app works                 |
| `compute-pressure`              | YouTube / Chrome   | Safe to ignore                              |
