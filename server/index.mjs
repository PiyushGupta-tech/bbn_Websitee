import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { registerAuthRoutes } from './auth.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })
dotenv.config({ path: join(__dirname, '..', '.env') })

const PORT = Number(process.env.PORT) || 3001
const URBAN_INITIATE_URL = 'https://merchant.urbanrupee.in/api/pg/urbanpay/initiate'
const PAYIN_MOCK = process.env.PAYIN_MOCK === 'true' || process.env.PAYIN_MOCK === '1'
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '')

function hasLiveCredentials() {
  const token = process.env.URBAN_API_TOKEN?.trim()
  const userid = process.env.URBAN_USER_ID?.trim()
  return Boolean(
    token &&
      userid &&
      token !== 'YOUR_API_TOKEN' &&
      userid !== 'YOUR_USER_ID',
  )
}

/** @type {Map<string, { status: string, utr?: string, amount?: string, updatedAt: string }>} */
const paymentStore = new Map()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function getCallbackUrl() {
  const url = process.env.PAYIN_CALLBACK_URL?.trim()
  if (url) return url
  return ''
}

function isHttpsCallback(url) {
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && !u.hostname.includes('localhost')
  } catch {
    return false
  }
}

function isValidOrderId(orderid) {
  return typeof orderid === 'string' && /^[A-Za-z0-9]{20}$/.test(orderid)
}

app.get('/api/health', (_req, res) => {
  const live = hasLiveCredentials()
  res.json({
    ok: true,
    payinConfigured: live,
    mockMode: !live && PAYIN_MOCK,
  })
})

app.post('/api/payin/initiate', async (req, res) => {
  const live = hasLiveCredentials()
  const token = process.env.URBAN_API_TOKEN?.trim()
  const userid = process.env.URBAN_USER_ID?.trim()

  const { amount, mobile, name, orderid } = req.body ?? {}

  if (!amount || !mobile || !name || !orderid) {
    return res.status(400).json({ status: false, message: 'Missing required fields: amount, mobile, name, orderid' })
  }
  if (!isValidOrderId(orderid)) {
    return res.status(400).json({
      status: false,
      message: 'orderid must be exactly 20 characters (letters and numbers only)',
    })
  }

  const mobileDigits = String(mobile).replace(/\D/g, '').slice(-10)
  if (mobileDigits.length !== 10) {
    return res.status(400).json({ status: false, message: 'mobile must be a valid 10-digit number' })
  }

  if (!live) {
    if (!PAYIN_MOCK) {
      return res.status(503).json({
        status: false,
        message:
          'Payment gateway is not configured. Add URBAN_API_TOKEN and URBAN_USER_ID to server/.env (or set PAYIN_MOCK=true for local testing), then restart: npm run dev:server',
      })
    }
    paymentStore.set(orderid, { status: 'pending', updatedAt: new Date().toISOString() })
    const mockUrl = `/checkout/payment/complete?orderid=${encodeURIComponent(orderid)}&amount=${encodeURIComponent(String(amount))}`
    console.log('[payin/initiate] mock →', mockUrl)
    return res.json({
      status: true,
      message: 'mock success',
      url: mockUrl,
      mock: true,
    })
  }

  const callback_url = getCallbackUrl()
  if (!isHttpsCallback(callback_url)) {
    return res.status(503).json({
      status: false,
      message:
        'PAYIN_CALLBACK_URL must be a public HTTPS URL (e.g. https://yourdomain.com/api/payin/callback). UrbanRupee does not accept localhost.',
    })
  }

  const payload = {
    token,
    userid,
    amount: String(amount),
    mobile: mobileDigits,
    name: String(name).trim().slice(0, 80),
    orderid,
    callback_url,
  }

  try {
    console.log('[payin/initiate] → UrbanRupee', { orderid, amount: payload.amount, callback_url })

    const upstream = await fetch(URBAN_INITIATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'BBN-Website/1.0',
      },
      body: JSON.stringify(payload),
    })

    const text = await upstream.text()
    let data = {}
    try {
      data = JSON.parse(text)
    } catch {
      console.error('[payin/initiate] non-JSON (HTTP', upstream.status, '):', text.slice(0, 500))
      const hint =
        upstream.status === 403
          ? 'UrbanRupee blocked the request. Use an HTTPS callback URL in PAYIN_CALLBACK_URL (not localhost).'
          : 'UrbanRupee returned an invalid response. Verify API token and user ID in server/.env.'
      return res.status(502).json({ status: false, message: hint })
    }

    console.log('[payin/initiate] UrbanRupee response:', JSON.stringify(data))

    const paymentUrl =
      data.url || data.payment_url || data.redirect_url || data.data?.url

    if (!paymentUrl) {
      const errMsg =
        data.message ||
        data.error ||
        (upstream.status === 500
          ? 'UrbanRupee server error. Confirm your merchant account is active and PAYIN_CALLBACK_URL is whitelisted in your UrbanRupee dashboard.'
          : `UrbanRupee error (HTTP ${upstream.status})`)
      return res.status(502).json({ status: false, message: String(errMsg) })
    }

    paymentStore.set(orderid, { status: 'pending', updatedAt: new Date().toISOString() })

    return res.json({
      status: true,
      message: data.message || 'success',
      url: String(paymentUrl),
      live: true,
    })
  } catch (err) {
    console.error('[payin/initiate]', err)
    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Failed to reach payment gateway',
    })
  }
})

/** UrbanRupee async callback (POST) */
app.post('/api/payin/callback', (req, res) => {
  const { status, client_txn_id, utr, amount } = req.body ?? {}
  const orderid = client_txn_id

  if (orderid && typeof orderid === 'string') {
    paymentStore.set(orderid, {
      status: status === 'success' ? 'success' : 'failed',
      utr: utr ? String(utr) : undefined,
      amount: amount ? String(amount) : undefined,
      updatedAt: new Date().toISOString(),
    })
    console.log('[payin/callback]', orderid, status, utr)
  }

  res.status(200).json({ received: true })
})

/** Dev mock: confirm payment after user lands on /checkout/payment/complete */
app.post('/api/payin/mock-confirm', (req, res) => {
  if (!PAYIN_MOCK && !hasLiveCredentials()) {
    return res.status(403).json({ status: false, message: 'Mock confirm disabled' })
  }
  const { orderid, amount } = req.body ?? {}
  if (!isValidOrderId(orderid)) {
    return res.status(400).json({ status: false, message: 'Invalid orderid' })
  }
  const utr = `MOCK${Date.now().toString().slice(-8)}`
  paymentStore.set(orderid, {
    status: 'success',
    utr,
    amount: amount ? String(amount) : undefined,
    updatedAt: new Date().toISOString(),
  })
  console.log('[payin/mock-confirm]', orderid, utr)
  return res.json({ status: 'success', client_txn_id: orderid, utr, amount })
})

app.get('/api/payin/status/:orderid', (req, res) => {
  const orderid = req.params.orderid
  if (!isValidOrderId(orderid)) {
    return res.status(400).json({ status: 'failed', message: 'Invalid order id' })
  }
  const record = paymentStore.get(orderid)
  if (!record) {
    return res.json({ status: 'pending', client_txn_id: orderid })
  }
  return res.json({
    status: record.status,
    client_txn_id: orderid,
    utr: record.utr,
    amount: record.amount,
  })
})

registerAuthRoutes(app)

app.listen(PORT, () => {
  console.log(`BBN payin server http://localhost:${PORT}`)
  if (hasLiveCredentials()) {
    console.log('UrbanRupee live mode enabled.')
  } else if (PAYIN_MOCK) {
    console.log('Mock payin mode — add URBAN_API_TOKEN + URBAN_USER_ID in server/.env for live payments.')
  } else {
    console.warn('Set URBAN_API_TOKEN + URBAN_USER_ID in server/.env, or PAYIN_MOCK=true for local testing.')
  }
})
