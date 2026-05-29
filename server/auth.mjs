import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { randomBytes, createHash } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, 'data')
const usersFile = join(dataDir, 'users.json')
const eventsFile = join(dataDir, 'events.json')

const CUSTOMER_PASS = process.env.SEED_CUSTOMER_PASSWORD || 'Customer@123'
const ADMIN_PASS = process.env.SEED_ADMIN_PASSWORD || 'Admin@bbn2024'

function hashPassword(pw) {
  const salt = randomBytes(16).toString('hex')
  const hash = createHash('sha256').update(salt + pw).digest('hex')
  return `${salt}:${hash}`
}

function verifyPassword(pw, stored) {
  const [salt, hash] = String(stored).split(':')
  if (!salt || !hash) return false
  return createHash('sha256').update(salt + pw).digest('hex') === hash
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    return fallback
  }
}

function writeJson(path, data) {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf8')
}

function seed() {
  if (existsSync(usersFile)) return
  writeJson(usersFile, {
    users: [
      {
        id: 'u_demo_customer',
        email: 'customer@bbnshop.in',
        phone: '9876543210',
        passwordHash: hashPassword(CUSTOMER_PASS),
        fullName: 'Demo Customer',
        addressLine1: '12 MG Road',
        addressLine2: 'Near City Mall',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001',
        createdAt: new Date().toISOString(),
        lastLoginAt: null,
      },
    ],
    sessions: [],
    admins: [
      {
        id: 'admin_main',
        email: 'admin@bbnshop.in',
        fullName: 'BBN Admin',
        passwordHash: hashPassword(ADMIN_PASS),
        createdAt: new Date().toISOString(),
      },
    ],
  })
  writeJson(eventsFile, { events: [] })
}

function normEmail(e) {
  return String(e).trim().toLowerCase()
}

function normPhone(p) {
  const d = String(p).replace(/\D/g, '')
  return d.length >= 10 ? d.slice(-10) : d
}

function publicUser(u) {
  return {
    id: u.id,
    email: u.email,
    phone: u.phone,
    fullName: u.fullName,
    addressLine1: u.addressLine1,
    addressLine2: u.addressLine2 || '',
    city: u.city,
    state: u.state,
    pinCode: u.pinCode,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt ?? null,
  }
}

function logEvent(event) {
  const store = readJson(eventsFile, { events: [] })
  store.events = [event, ...(store.events || [])].slice(0, 5000)
  writeJson(eventsFile, store)
}

function loadStore() {
  seed()
  return readJson(usersFile, { users: [], sessions: [], admins: [] })
}

function saveStore(store) {
  writeJson(usersFile, store)
}

function bearer(req) {
  const h = req.headers.authorization || ''
  const m = h.match(/^Bearer\s+(\S+)$/i)
  return m ? m[1] : null
}

function resolveSession(store, token) {
  if (!token) return null
  return store.sessions.find((s) => s.token === token) || null
}

export function registerAuthRoutes(app) {
  seed()

  app.get('/api/auth/health.php', (_req, res) => {
    res.json({ ok: true, service: 'bbn-auth', version: 1 })
  })

  app.post('/api/auth/register.php', (req, res) => {
    const body = req.body || {}
    const email = normEmail(body.email)
    const phone = normPhone(body.phone)
    const password = String(body.password || '')
    const fullName = String(body.fullName || '').trim()
    const addressLine1 = String(body.addressLine1 || '').trim()
    const addressLine2 = String(body.addressLine2 || '').trim()
    const city = String(body.city || '').trim()
    const state = String(body.state || '').trim()
    const pinCode = String(body.pinCode || '').trim()

    if (!email.includes('@')) return res.status(400).json({ ok: false, message: 'Valid email required.' })
    if (phone.length !== 10) return res.status(400).json({ ok: false, message: 'Phone must be 10 digits.' })
    if (password.length < 6) return res.status(400).json({ ok: false, message: 'Password min 6 chars.' })
    if (!fullName || !addressLine1 || !city || !state || pinCode.length !== 6) {
      return res.status(400).json({ ok: false, message: 'Complete address required.' })
    }

    const store = loadStore()
    if (store.users.some((u) => u.email === email)) {
      return res.status(409).json({ ok: false, message: 'Email already registered.' })
    }
    if (store.users.some((u) => u.phone === phone)) {
      return res.status(409).json({ ok: false, message: 'Phone already registered.' })
    }

    const user = {
      id: 'u' + randomBytes(8).toString('hex'),
      email,
      phone,
      passwordHash: hashPassword(password),
      fullName,
      addressLine1,
      addressLine2,
      city,
      state,
      pinCode,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    }
    const token = randomBytes(24).toString('hex')
    store.users.push(user)
    store.sessions.push({ token, userId: user.id, role: 'customer', createdAt: new Date().toISOString() })
    saveStore(store)
    logEvent({
      id: 'ev_' + randomBytes(6).toString('hex'),
      type: 'signup',
      userId: user.id,
      email,
      phone,
      fullName,
      city,
      state,
      pinCode,
      addressLine1,
      ip: req.ip,
      userAgent: String(req.headers['user-agent'] || '').slice(0, 500),
      at: new Date().toISOString(),
    })
    res.json({ ok: true, token, role: 'customer', user: publicUser(user) })
  })

  app.post('/api/auth/login.php', (req, res) => {
    const loginId = String(req.body?.loginId || req.body?.email || req.body?.phone || '').trim()
    const password = String(req.body?.password || '')
    const store = loadStore()
    const emailTry = normEmail(loginId)
    const phoneTry = normPhone(loginId)
    const user = store.users.find(
      (u) => u.email === emailTry || (phoneTry.length === 10 && u.phone === phoneTry),
    )
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ ok: false, message: 'Invalid email/phone or password.' })
    }
    user.lastLoginAt = new Date().toISOString()
    const token = randomBytes(24).toString('hex')
    store.sessions.push({ token, userId: user.id, role: 'customer', createdAt: new Date().toISOString() })
    saveStore(store)
    logEvent({
      id: 'ev_' + randomBytes(6).toString('hex'),
      type: 'login',
      userId: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      city: user.city,
      state: user.state,
      pinCode: user.pinCode,
      addressLine1: user.addressLine1,
      ip: req.ip,
      userAgent: String(req.headers['user-agent'] || '').slice(0, 500),
      at: new Date().toISOString(),
    })
    res.json({ ok: true, token, role: 'customer', user: publicUser(user) })
  })

  app.post('/api/auth/admin-login.php', (req, res) => {
    const email = normEmail(req.body?.email || '')
    const password = String(req.body?.password || '')
    const store = loadStore()
    const admin = store.admins.find((a) => a.email === email)
    if (!admin || !verifyPassword(password, admin.passwordHash)) {
      return res.status(401).json({ ok: false, message: 'Invalid admin credentials.' })
    }
    const token = randomBytes(24).toString('hex')
    store.sessions.push({ token, userId: admin.id, role: 'admin', createdAt: new Date().toISOString() })
    saveStore(store)
    logEvent({
      id: 'ev_' + randomBytes(6).toString('hex'),
      type: 'admin_login',
      userId: admin.id,
      email: admin.email,
      phone: '',
      fullName: admin.fullName || 'Admin',
      city: '',
      state: '',
      pinCode: '',
      addressLine1: '',
      ip: req.ip,
      userAgent: String(req.headers['user-agent'] || '').slice(0, 500),
      at: new Date().toISOString(),
    })
    res.json({
      ok: true,
      token,
      role: 'admin',
      admin: { id: admin.id, email: admin.email, fullName: admin.fullName || 'Admin' },
    })
  })

  app.get('/api/auth/me.php', (req, res) => {
    const store = loadStore()
    const session = resolveSession(store, bearer(req))
    if (!session) return res.status(401).json({ ok: false, message: 'Not signed in.' })
    if (session.role === 'admin') {
      const admin = store.admins.find((a) => a.id === session.userId)
      if (!admin) return res.status(401).json({ ok: false, message: 'Session expired.' })
      return res.json({
        ok: true,
        role: 'admin',
        admin: { id: admin.id, email: admin.email, fullName: admin.fullName || 'Admin' },
      })
    }
    const user = store.users.find((u) => u.id === session.userId)
    if (!user) return res.status(401).json({ ok: false, message: 'Session expired.' })
    res.json({ ok: true, role: 'customer', user: publicUser(user) })
  })

  app.post('/api/auth/me.php', (req, res) => {
    const store = loadStore()
    const session = resolveSession(store, bearer(req))
    if (!session || session.role !== 'customer') {
      return res.status(401).json({ ok: false, message: 'Not signed in.' })
    }
    const idx = store.users.findIndex((u) => u.id === session.userId)
    if (idx < 0) return res.status(404).json({ ok: false, message: 'User not found.' })
    const user = { ...store.users[idx], ...req.body }
    if (req.body.phone) user.phone = normPhone(req.body.phone)
    store.users[idx] = user
    saveStore(store)
    res.json({ ok: true, role: 'customer', user: publicUser(user) })
  })

  app.post('/api/auth/logout.php', (req, res) => {
    const token = bearer(req)
    const store = loadStore()
    store.sessions = store.sessions.filter((s) => s.token !== token)
    saveStore(store)
    res.json({ ok: true, message: 'Signed out.' })
  })

  app.get('/api/auth/admin-dashboard.php', (req, res) => {
    const store = loadStore()
    const session = resolveSession(store, bearer(req))
    if (!session || session.role !== 'admin') {
      return res.status(403).json({ ok: false, message: 'Admin only.' })
    }
    const events = readJson(eventsFile, { events: [] }).events || []
    const today = new Date().toDateString()
    res.json({
      ok: true,
      stats: {
        totalUsers: store.users.length,
        totalEvents: events.length,
        loginsToday: events.filter(
          (e) =>
            (e.type === 'login' || e.type === 'admin_login') &&
            new Date(e.at).toDateString() === today,
        ).length,
      },
      users: store.users.map(publicUser),
      events: events.slice(0, 200),
    })
  })
}
