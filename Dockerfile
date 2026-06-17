## Stage 1 — Build (Nitro Node SSR)
FROM node:22-alpine AS builder
WORKDIR /app

ARG DEPLOY_MARKER=facility-ssr-node-2026-06-17

COPY package.json package-lock.json* bun.lock* ./
RUN npm install --legacy-peer-deps

COPY . .
# Build outside of the Lovable sandbox so vite.config's `nitro.preset = "node-server"` takes effect.
RUN echo "Deploy marker: ${DEPLOY_MARKER}" \
 && npx vite build \
 && test -f dist/server/index.mjs \
 && grep -q '"preset": "node-server"' dist/nitro.json

## Stage 2 — Runtime
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/server/index.mjs"]
