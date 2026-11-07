# Vomtek Web

Nuxt 3 public website and authenticated customer portal for Vomtek.

## Run
```bash
pnpm install
pnpm dev
```
Open http://localhost:3300. API default: http://localhost:4110/api.

## Demo accounts
All customer accounts use `VomtekDemo!2026`:
- `demo@vomtek.com` — operator owner
- `utility@vomtek.com` — utility engineer
- `homeowner@vomtek.com` — homeowner
- `contractor@vomtek.com` — contractor
- `supplier@vomtek.com` — manufacturer

Studio demo is separate at http://localhost:3210 (`ops@vomtek.com` /
`VomtekOps!2026`).

## Routes
Marketing: `/`, `/intelligence`, `/homeowners`, `/marketplace`,
`/marketplace/:slug`, `/configurator`, `/rentals`, `/pricing`, `/contact`,
`/contractors`, `/security`, `/insights`, `/signup`, `/forgot`, `/reset`.

Portal (`/app`, client-rendered): overview, assets, inspections, reports,
marketplace, orders, rentals, home jobs, contractor work orders, manufacturer
catalog, billing/invoices and notifications.

## Environment
| Variable | Default | Purpose |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `http://localhost:4110/api` | API origin |
| `NUXT_PUBLIC_SITE_URL` | `http://localhost:3300` | Canonical/social URL |
