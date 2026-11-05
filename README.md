# LineSight Web

Nuxt 3 public website and authenticated customer portal for LineSight.

## Run
```bash
pnpm install
pnpm dev
```
Open http://localhost:3300. API default: http://localhost:4110/api.

## Demo accounts
All customer accounts use `LineSightDemo!2026`:
- `demo@linesight.io` — operator owner
- `utility@linesight.io` — utility engineer
- `homeowner@linesight.io` — homeowner
- `contractor@linesight.io` — contractor

Studio demo is separate at http://localhost:3210 (`ops@linesight.io` /
`LineSightOps!2026`).

## Routes
Marketing: `/`, `/intelligence`, `/homeowners`, `/marketplace`,
`/marketplace/:slug`, `/configurator`, `/rentals`, `/pricing`, `/contact`,
`/contractors`, `/security`, `/insights`.

Portal (`/app`, client-rendered): overview, assets, inspections, reports,
marketplace, orders, rentals, home jobs, contractor, billing.

## Environment
| Variable | Default | Purpose |
|---|---|---|
| `NUXT_PUBLIC_API_BASE` | `http://localhost:4110/api` | API origin |
| `NUXT_PUBLIC_SITE_URL` | `http://localhost:3300` | Canonical/social URL |
