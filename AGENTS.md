# AGENTS.md

## Commands

```sh
bun install              # packageManager=bun@1.3.3, Node >=22 (see engines in package.json:97)
npm run dev              # vite dev — TanStack Start dev server
npm run build            # vite build && node scripts/generate-shell.mjs -> dist/
npm run build:dev        # same with --mode development
npm run lint             # eslint . (flat config, ignores dist/.output/.vinxi)
npm run format           # prettier --write . (100ch, double quotes, semis — .prettierrc:1)
bun run easypanel:build  # bun install --frozen-lockfile && bun run build
bun run easypanel:start  # node scripts/easypanel-server.mjs — static SPA server for dist/client
npm run preview          # vite preview
npm start                # alias for easypanel:start (package.json:13)
```

- No tests, no CI, no `test` script — only checks are `lint` + `tsc --noEmit`.
- Path alias `@/*` -> `src/*` (`tsconfig.json:23` + `components.json:14` + `vite-tsconfig-paths`). Always use it.

## Architecture

- **TanStack Start (React 19) + Vite 7** via `@lovable.dev/vite-tanstack-config` (`vite.config.ts:1`) — do not replace with vanilla vite/tanstack config. Nitro preset `node-server` outputs `dist/server` + `dist/client` (`vite.config.ts:8`).
- **Routing**: file-based in `src/routes/`. `src/routeTree.gen.ts` is auto-generated — never edit; regenerates on `npm run dev` or `npm run build`. Current routes: `/`, `/email-marketing`, `/health`, `/healthz`, `/sitemap.xml`, `/api/contact`, `/api/email-marketing`.
- **SPA shell**: `scripts/generate-shell.mjs:11` reads `dist/client/.vite/manifest.json` and writes `dist/client/index.html`. Required for `easypanel:start`; skipped by `Dockerfile:17` which runs only `npx vite build`.
- **Dual deploy**:
  - `Dockerfile:11` — Nitro SSR (`node dist/server/index.mjs`, port 3000). Used by EasyPanel.
  - `npm run build` + `easypanel:start` — static SPA server with fallback (`scripts/easypanel-server.mjs:111` — paths with extension 404, others -> `index.html`). Used by Netlify (`netlify.toml:3` publishes `dist/client` with `/* -> /index.html`).
- **Branch split**: `origin/main` (HEAD, Lovable sync — push to `main` syncs back to `lovable.dev/projects/0bf37da5...` per `README.md:12`) vs `origin/master` (EasyPanel auto-deploy target). Push to both if you want both systems in sync.
- **UI**: shadcn `new-york/slate/lucide` (`components.json:3`), components in `src/components/ui/` (`npx shadcn@latest add <component>`). Tailwind v4 via `@tailwindcss/vite` — config is `src/styles.css:1`, not `tailwind.config.js`; custom `.bento` there (`src/styles.css:119`). Spline `@splinetool/react-spline`.

## Gotchas

- `Dockerfile:14` and `netlify.toml:2` use `npm install --legacy-peer-deps` due to peer conflicts; `bun install` works locally but CI/EasyPanel/Netlify need the flag.
- `.env` gitignored (`.gitignore:18`). Email routes (`src/routes/api/contact.tsx`, `src/routes/api/email-marketing.tsx`) need `SMTP_HOST/PORT/USER/PASSWORD` (Hostinger, see `.env.example:1`) else return 500 `Servico de email nao configurado`.
- Health checks `/health` and `/healthz` handled in both Nitro and `scripts/easypanel-server.mjs:88`. EasyPanel **Port must be `3000`** matching `Dockerfile:28` (`ENV PORT=3000`); mismatch causes restart loop — see `EASYPANEL.md:18`.
- TS strict but `noUnusedLocals`/`noUnusedParameters` off, `skipLibCheck` true (`tsconfig.json:19`); `@typescript-eslint/no-unused-vars` off (`eslint.config.js:24`). `.prettierignore:7` and `eslint.config.js:9` ignore `dist/.output/.vinxi/.tanstack` + `routeTree.gen.ts`.
- `src/client.tsx:9` throws if `#root` missing; global error boundary in `src/router.tsx:4`.
