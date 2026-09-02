# CxE Americas Offsite 2025 — Step Tracker

A mobile-first step-tracking web app for the CxE Americas Offsite 2025. Live weather, dark mode, offline support, and team competition, with a Microsoft-inspired visual language.

![Mobile First](https://img.shields.io/badge/Mobile%20First-PWA-blue) ![Team Competition](https://img.shields.io/badge/Team-Competition-green) ![Offline Support](https://img.shields.io/badge/Offline-Ready-orange) ![Live Weather](https://img.shields.io/badge/Live-Weather-lightblue) ![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA-purple)

## Features

### Team competition

- **9 CxE teams:** CARE, CCP, IDNA, Management, CxE LT, Purview/CES, Scale Enablement, Shared Services, Threat Protection
- Overachiever recognition, live achievement alerts, and team standings

### Tracking and leaderboards

- Personal dashboard with animated progress, daily goal, and Microsoft/Seattle-themed challenges
- Individual and team leaderboards (today / week / total) with progressive loading
- Live display mode for event screens, auto-refreshing every 30 seconds

### Platform

- PWA install, service-worker caching, and full offline use
- Supabase PostgreSQL sync across devices, with localStorage fallback
- Admin SPA at `/admin/dist/` for user management, manual step entry, and diagnostics
- Open-Meteo weather for Redmond, WA, plus the official CxE Americas 2025 Spotify playlist
- WCAG 2.1 AA-oriented markup, keyboard shortcuts (`Alt+1`–`4`, `Ctrl/Cmd+D`, `Escape`)

## Quick start

1. Clone the repo and open `index.html` in a modern browser, or serve the tree locally:

   ```bash
   git clone https://github.com/Manaiakalani/CxEAmericasStepTracker.git
   cd CxEAmericasStepTracker
   npx http-server . -p 4173 -c-1
   ```

2. Register with a display name and CxE team.
3. Log steps. Cloud sync is used when Supabase is reachable; otherwise the app stays on-device.

### Admin

The admin console is a React + shadcn/ui SPA at `/admin/dist/`. The legacy `admin-login.html` and `admin-dashboard.html` pages redirect to it. Authentication uses the Supabase `verify_admin_credentials` RPC — no credentials are embedded in the static HTML. See [`admin/README.md`](admin/README.md) for stack, routes, and build commands.

1. Open `/admin/dist/#/login` (or `/admin-login.html`).
2. Sign in with admin credentials verified against Supabase.
3. Manage users, view analytics, add manual steps.

### Live display

Open `/live-display/` for a presentation view. It refreshes every 30 seconds; a manual refresh is also available. See [`live-display/README.md`](live-display/README.md).

### PWA install

- Chrome/Edge: install button in the address bar
- Safari: Share → Add to Home Screen
- Mobile: “Add to Home Screen” prompt

## Hosting

This is a static site (HTML/CSS/JS) plus a pre-built admin bundle in `admin/dist/`. Serve the repository root from any static host.

The Azure Static Web Apps site that previously hosted this app has been retired. There is no CI/CD pipeline that deploys on push to `main` or on pull requests. Playwright tests still run on GitHub Actions; they do not publish a site.

## Testing

- Manual checklist: [`TESTING.md`](TESTING.md)
- E2E: `npm install && npx playwright install && npm run test:e2e` (Chromium, Firefox, WebKit, and mobile profiles)
- Playwright starts `http://localhost:4173` via `http-server`

## Configuration

Supabase lives in `supabase-config.js`. Teams, weather coordinates (Redmond, WA: 47.6740, −122.1215), and the Spotify playlist URL are in `script.js`.

```js
const SUPABASE_CONFIG = {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key'
};
```

## Version history

Current release: **v2.4.1** — Testing & Polish Edition (23 January 2026). Full notes are in [`CHANGELOG.md`](CHANGELOG.md).

| Version | Date | Highlights |
|---------|------|------------|
| **2.4.1** | 2026-01-23 | Playwright E2E, persistence fix, accessibility, UI polish |
| **2.3.0** | 2025-09-24 | Supabase, admin dashboard, live display |
| **2.2.0** | 2025-09-11 | Premium hamburger menu, micro-interactions |
| **2.1.0** | 2025-09-03 | CxE LT team, interactive footer |
| **2.0.0** | 2025-08-28 | Weather API, dark mode, PWA, Spotify |
| **1.5.0** | 2025-08-27 | Challenges, activity widget |
| **1.0.0** | 2025-08-26 | Initial release |

## License

[MIT](./LICENSE). Weather data from [Open-Meteo](https://open-meteo.com). Icons: Font Awesome 6. Fonts: Inter (Google Fonts). Built for the CxE Americas Offsite 2025.
