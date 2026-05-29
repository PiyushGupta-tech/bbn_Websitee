# BBN Shop — Login & Admin

## Customer account (like Flipkart / Amazon)

One account per person: name, email, mobile, full address, password.

| | |
|---|---|
| **Sign up** | https://bbnshop.in/signup |
| **Log in** | https://bbnshop.in/login |
| **My account** | https://bbnshop.in/account (after login) |

### Demo customer (pre-created on first API use)

| Field | Value |
|-------|--------|
| Email | `customer@bbnshop.in` |
| Mobile | `9876543210` |
| Password | `Customer@123` |
| Name | Demo Customer |
| Address | 12 MG Road, Near City Mall, Mumbai, Maharashtra 400001 |

**Log in with either email or 10-digit mobile** + password.

---

## Admin (track all users & logins)

| | |
|---|---|
| **Admin login** | https://bbnshop.in/admin/login |
| **Dashboard** | https://bbnshop.in/admin |

### Demo admin

| Field | Value |
|-------|--------|
| Email | `admin@bbnshop.in` |
| Password | `Admin@bbn2024` |

### Admin can see

- All registered customers (name, email, phone, full address, PIN, join date, last login)
- **Login activity** — every login, signup, and admin login with time, IP, and user details

---

## Production server setup

1. Copy `auth-secrets.example.php` → `auth-secrets.php` next to `payin-secrets.php` (optional; changes default seed passwords).
2. Ensure `data/` folder exists under site root (created automatically) and is **not** web-accessible (`data/.htaccess` denies all).
3. After deploy, run `bash deploy/fix-auth-data.sh` on the VPS (or `chown -R www:www data && chmod 775 data`).
4. Deploy PHP auth with: `rsync -avz public/api/auth/ user@server:/www/wwwroot/BBNshop/api/auth/` (included in `dist/api/auth` when you `npm run build`).

If login shows *“got a web page instead of JSON”*, the API returned HTML (usually PHP permission errors). Check https://bbnshop.in/api/auth/health.php — it must be **only** JSON, no warnings.

## Local development

Run **both** (two terminals):

```bash
npm run dev:server   # port 3001 — auth + payin API
npm run dev          # Vite frontend
```

Or: `npm run dev:all`. Auth is mirrored in `server/auth.mjs`; Vite proxies `/api/auth` → `localhost:3001`.

**Change default passwords** in `server/.env`:

```
SEED_CUSTOMER_PASSWORD=YourCustomerPass
SEED_ADMIN_PASSWORD=YourAdminPass
```

---

**Security:** Change demo passwords before going live. Do not share admin credentials publicly.
