# Ultra X Hub

A PIN-protected adult content directory app with a dark mobile-style UI built in React + Vite.

## Run & Operate

- `npm run dev` — starts Vite dev server on port 5000

## Stack

- React 18, Vite 5, Tailwind CSS 3, lucide-react icons
- Node.js 20

## Where things live

- `src/App.jsx` — entire app (PIN screen, site cards, navigation, views)
- `src/index.css` — Tailwind base + scrollbar-hide utility
- `vite.config.js` — Vite config (port 5000, allowedHosts: true)
- `tailwind.config.js` — Tailwind content paths

## Architecture decisions

- Single-file component approach — all UI lives in `src/App.jsx`
- PIN code is hardcoded to `6969` (mock/demo only)
- No backend — all data is static mock arrays

## Product

- PIN lock screen with 4-digit entry and error feedback
- Home feed with site cards, category filter pills, favorites toggle
- Search view with popular tags
- Tabbed navigation (Home, Sites, Search, Favorites)

## User preferences

_Populate as you build_

## Gotchas

- Vite must use port 5000 with `host: true` and `allowedHosts: true` for the Replit preview to work

## Pointers

- [react-vite skill](.local/skills/react-vite/SKILL.md)
- [workflows skill](.local/skills/workflows/SKILL.md)
