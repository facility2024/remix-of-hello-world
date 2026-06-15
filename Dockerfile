## Stage 1 — Build
FROM node:22-alpine AS builder
WORKDIR /app

ARG DEPLOY_MARKER=facility-node-static-root-2026-06-15

COPY package.json package-lock.json* bun.lock* ./
RUN npm install --legacy-peer-deps

COPY . .
RUN echo "Deploy marker: ${DEPLOY_MARKER}" && npm run build && test -f dist/client/index.html

## Stage 2 — Serve with Node
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts ./scripts

EXPOSE 3000
CMD ["node", "scripts/easypanel-server.mjs"]
