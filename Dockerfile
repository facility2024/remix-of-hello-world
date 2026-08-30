# EasyPanel — Branch: master | Tipo de construção: Dockerfile
# Repositório já conectado na aba Github do EasyPanel
# Push em master dispara deploy automático; se não, clique em "Implantar"

## Stage 1 — Build (Nitro Node SSR)
FROM node:22-alpine AS builder
WORKDIR /app

# Bump para invalidar cache quando necessário
ARG DEPLOY_MARKER=facility-ssr-node-2026-08-30-v4

COPY package.json package-lock.json* bun.lock* ./
# EasyPanel usa npm; --legacy-peer-deps devido a conflitos de peer deps (mesmo em netlify.toml)
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi

COPY . .
RUN npx vite build \
 && test -f dist/server/index.mjs \
 && echo "Build OK: dist/server/index.mjs existe"

## Stage 2 — Runtime
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Health check usado pelo EasyPanel (também responde em /healthz)
# Usa node fetch em vez de wget (node:alpine não tem wget/curl garantido)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>{process.exit(r.ok?0:1)}).catch(()=>process.exit(1))"

CMD ["node", "dist/server/index.mjs"]
