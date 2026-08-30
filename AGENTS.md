# AGENTS.md

## Commands

```sh
bun install              # packageManager=bun@1.3.3, Node >=22 (see engines)
npm run dev              # vite dev (TanStack Start dev server)
npm run build            # vite build && node scripts/generate-shell.mjs -> dist/
npm run build:dev        # same but --mode development
npm run lint             # eslint . (flat config, ignores dist/.output/.vinxi)
npm run format           # prettier --write . (100ch, double quotes, trailing commas, semis)
bun run easypanel:build  # bun install --frozen-lockfile && bun run build
bun run easypanel:start  # node scripts/easypanel-server.mjs (static SPA server for dist/client)
```

- No tests or CI in repo (only inside `node_modules`). No `test` script.
- Always use alias `@/*` -> `src/*` (defined in `tsconfig.json:23` + `components.json:14` + `vite-tsconfig-paths`).

## Architecture

- **TanStack Start (React 19) + Vite 7** via wrapper `@lovable.dev/vite-tanstack-config` in `vite.config.ts:1` — don't replace with vanilla vite/tanstack config. Nitro preset `node-server` outputs to `dist/server` + `dist/client` (`vite.config.ts:8`).
- **Routing**: TanStack Router file-based in `src/routes/`. Tree `src/routeTree.gen.ts` is auto-generated — never edit; regenerate with `npm run dev` or `npm run build`. Currently tracks `/`, `/sitemap.xml`, `/api/contact`; stale if new files like `src/routes/email-marketing.tsx` exist without rebuild.
- **SPA shell**: `scripts/generate-shell.mjs:11` reads `dist/client/.vite/manifest.json` and writes `dist/client/index.html`. Required for `easypanel:start` flow; skipped by Dockerfile.
- **Dual deploy**: Dockerfile (`Dockerfile:11`) runs `npx vite build` only -> entry `dist/server/index.mjs` (Nitro SSR, port 3000). `npm run build` + `easypanel:start` instead serves `dist/client/` statically with SPA fallback (`scripts/easypanel-server.mjs:111` — unknown paths without extension -> `index.html`, assets 404 otherwise). Netlify (`netlify.toml:2`) publishes `dist/client` with `/* -> /index.html`.
- **Lovabl e sync**: push to `main` syncs back to Lovable editor (`README.md:12`). Repo originated from `lovable.dev/projects/0bf37da5...`.
- **UI**: shadcn/ui `new-york/slate/lucide` (`components.json:3`), components in `src/components/ui/`, add via `npx shadcn@latest add <component>`. Tailwind v4 via `@tailwindcss/vite` — config is CSS (`src/styles.css:1`), not `tailwind.config.js`; custom utility `.bento` there (`src/styles.css:119`). Spline is `@splinetool/react-spline`.

## Conventions & Gotchas

- TypeScript strict but `noUnusedLocals`/`noUnusedParameters` off, `skipLibCheck` true (`tsconfig.json:19`). ESLint disables `@typescript-eslint/no-unused-vars` (`eslint.config.js:24`).
- `.prettierignore` excludes `routeTree.gen.ts`; `eslint.config.js:9` and `.gitignore:14` also ignore `dist/.output/.vinxi/.tanstack`.
- `Dockerfile:8` uses `npm install --legacy-peer-deps` (same in `netlify.toml:2`) due to peer dep conflicts — `bun install` works locally but CI/EasyPanel/Netlify use npm legacy flag.
- Health check is `/health` or `/healthz` handled in `scripts/easypanel-server.mjs:88` (and Nitro server). EasyPanel must set Port=3000.
- Contact/email APIs (`src/routes/api/contact.tsx:79`, `src/routes/api/email-marketing.tsx`) require SMTP env — see `.env.example` (`SMTP_HOST/PORT/USER/PASSWORD` via Hostinger). `.env` is gitignored (`.gitignore:18`); without it email returns 500 `Servico de email nao configurado`.
- `client.tsx:9` throws if `#root` missing; router error boundary in `router.tsx:4`.
