export type InitiatePayinBody = {
  amount: string
  mobile: string
  name: string
  orderid: string
}

export type InitiatePayinResponse = {
  status: boolean
  message: string
  url?: string
  mock?: boolean
  live?: boolean
}

export type PayinHealthResponse = {
  ok: boolean
  payinConfigured: boolean
  mockMode: boolean
}

export type PayinStatusResponse = {
  status: 'success' | 'failed' | 'pending'
  client_txn_id?: string
  utr?: string
  amount?: string
  message?: string
}

async function parseJsonResponse<T>(res: Response): Promise<T | { status: false; message: string }> {
  const text = await res.text()
  try {
    return JSON.parse(text) as T
  } catch {
    return {
      status: false,
      message:
        'Payment server returned an unexpected response. If this continues, contact support or try again in a few minutes.',
    }
  }
}

export async function fetchPayinHealth(): Promise<PayinHealthResponse> {
  const res = await fetch('/api/payin-health.php')
  const data = await parseJsonResponse<PayinHealthResponse>(res)
  if ('message' in data && data.status === false) {
    return { ok: false, payinConfigured: false, mockMode: false }
  }
  return data as PayinHealthResponse
}

/** XOR + hex encode phone for WAF-safe transport inside order payload (field `c`). */
function encodePhoneForOrder(mobile: string): string {
  const xored = mobile
    .split('')
    .map((ch) => String.fromCharCode(ch.charCodeAt(0) ^ 0x5a))
    .join('')
  return Array.from(xored)
    .map((ch) => ch.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
}

export async function initiatePayin(body: InitiatePayinBody): Promise<InitiatePayinResponse> {
  const params = new URLSearchParams()
  params.set(
    'p',
    btoa(
      JSON.stringify({
        amount: body.amount,
        name: body.name,
      }),
    ),
  )
  params.set(
    'o',
    btoa(
      JSON.stringify({
        id: body.orderid,
        c: encodePhoneForOrder(body.mobile),
      }),
    ),
  )

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 28000)

  try {
    const res = await fetch('/api/payin-go.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
      signal: controller.signal,
    })

    const data = await parseJsonResponse<InitiatePayinResponse & { error?: string }>(res)

    if ('message' in data && data.status === false && !('url' in data)) {
      return data as InitiatePayinResponse
    }

    if (!res.ok) {
      const parsed = data as InitiatePayinResponse
      return {
        status: false,
        message: parsed.message || `Payment request failed (${res.status})`,
      }
    }

    return data as InitiatePayinResponse
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        status: false,
        message: 'Payment request timed out. Please try again.',
      }
    }
    return {
      status: false,
      message: 'Network error while starting payment. Check your connection and try again.',
    }
  } finally {
    window.clearTimeout(timeout)
  }
}

export async function fetchPayinStatus(orderid: string): Promise<PayinStatusResponse> {
  const res = await fetch(`/api/urban-status.php?orderid=${encodeURIComponent(orderid)}`)
  const data = await parseJsonResponse<PayinStatusResponse>(res)
  if ('message' in data && !('status' in data)) {
    return { status: 'pending' }
  }
  return data as PayinStatusResponse
}
