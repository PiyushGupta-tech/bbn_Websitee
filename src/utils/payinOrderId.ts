const ALNUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/** UrbanRupee requires orderid: exactly 20 chars, A–Z, a–z, 0–9 only */
export function generatePayinOrderId(prefix = 'BBN'): string {
  let id = prefix.replace(/[^A-Za-z0-9]/g, '').slice(0, 6)
  while (id.length < 20) {
    id += ALNUM[Math.floor(Math.random() * ALNUM.length)]!
  }
  return id.slice(0, 20)
}

export function generateOrderRef(): string {
  const t = Date.now().toString(36).toUpperCase()
  const r = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `BBN-${t}-${r}`
}
