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
    proxy: {
      '/lavante-vizup': vizupProxy(),
    },
  },
  preview: {
    proxy: {
      '/lavante-vizup': vizupProxy(),
    },
  },
})
