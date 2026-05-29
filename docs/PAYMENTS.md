# UrbanRupee online payments

## Checkout flow

1. `/checkout` — customer enters name, address, phone, email
2. `/checkout/payment` — choose **Pay Online** or **Cash on Delivery**
3. `/checkout/payment/online` — calls UrbanRupee **Initiate Payin** and redirects to the UPI URL
4. `/checkout/thanks` — order confirmation (polls payment status for online)

## Local development

Terminal 1 — frontend:

```bash
npm run dev
```

Terminal 2 — payin API (required for online payments):

```bash
cp server/.env.example server/.env
```

Edit **`server/.env`** with your real UrbanRupee credentials:

```env
URBAN_API_TOKEN=your_token_from_dashboard
URBAN_USER_ID=your_user_id_from_dashboard
PAYIN_MOCK=false
PAYIN_CALLBACK_URL=https://YOUR-NGROK-URL/api/payin/callback
```

Then:

```bash
npm run dev:server
```

Restart the payin server after any `.env` change.

Vite proxies `/api/*` to `http://localhost:3001`.

**Without credentials**, online pay cannot open UrbanRupee — you will see a configuration error.  
**With credentials**, Pay Online calls `POST /api/payin/initiate` → UrbanRupee returns a `url` (`upi://…` or `https://…`) and the browser opens it.

## Server environment (`server/.env`)

| Variable | Description |
| -------- | ----------- |
| `URBAN_API_TOKEN` | Your UrbanRupee API token (server only) |
| `URBAN_USER_ID` | Your merchant user ID |
| `PAYIN_CALLBACK_URL` | Public URL for payin callbacks, e.g. `https://yourdomain.com/api/payin/callback` |
| `PORT` | API port (default `3001`) |

## Production (e.g. BBNshop server)

1. Build the site: `npm run build` → deploy `dist/`
2. Run the payin server with PM2/systemd on port 3001
3. Configure nginx (or aaPanel) to proxy `/api` to the Node process
4. Set `PAYIN_CALLBACK_URL` to your live callback URL (must be HTTPS and publicly reachable)

## UrbanRupee API

- Initiate: `POST https://merchant.urbanrupee.in/api/pg/urbanpay/initiate`
- Our proxy: `POST /api/payin/initiate` (adds token/userid server-side)
- Callback: UrbanRupee `POST` → `/api/payin/callback`
- Status poll: `GET /api/payin/status/:orderid`

`orderid` is always **20 alphanumeric** characters (generated automatically).
