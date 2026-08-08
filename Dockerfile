## Stage 1 — Build (Static SPA for EasyPanel)
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* bun.lock* ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build \
 && test -f dist/client/index.html

## Stage 2 — Runtime
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/scripts/easypanel-server.mjs ./scripts/easypanel-server.mjs

EXPOSE 3000
CMD ["node", "scripts/easypanel-server.mjs"]
