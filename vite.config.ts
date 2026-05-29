import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Strips frame blocking so Vizup (Lavante catalog, bbn-branded) can load in an iframe on localhost / preview */
function vizupProxy() {
  return {
    target: 'https://lavantefashion.com',
    changeOrigin: true,
    secure: true,
    rewrite: (path: string) => path.replace(/^\/lavante-vizup/, '') || '/',
    configure(proxy) {
      proxy.on('proxyRes', (proxyRes) => {
        delete proxyRes.headers['x-frame-options']
        delete proxyRes.headers['content-security-policy']
        delete proxyRes.headers['content-security-policy-report-only']
      })
    },
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    /**
     * Explicit CSP for the dev server HTML/asset responses so Vite HMR + module scripts
     * are allowed. (Some browsers/extensions also log separate report-only CSP noise;
     * see docs/CONSOLE_NOISE.md.)
     */
    headers: {
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline'",
        "font-src 'self' data:",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https: ws: wss:",
        'frame-src https://www.youtube.com https://www.youtube-nocookie.com',
        "object-src 'none'",
        "base-uri 'self'",
      ].join('; '),
    },
    proxy: {
      '/lavante-vizup': vizupProxy(),
      '/api/payin-go.php': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      '/api/urban-bridge.php': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      '/api/urban-status.php': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      '/api/payin-health.php': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      /** Auth: use live PHP API so `npm run dev` works without dev:server */
      '/api/auth': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      '/lavante-vizup': vizupProxy(),
      '/api/payin-go.php': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      '/api/urban-bridge.php': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      '/api/urban-status.php': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      '/api/payin-health.php': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      /** Auth: use live PHP API so `npm run dev` works without dev:server */
      '/api/auth': { target: 'https://bbnshop.in', changeOrigin: true, secure: true },
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
