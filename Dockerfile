## Stage 1 — Build
FROM node:22-alpine AS builder
WORKDIR /app

# Install deps
COPY package.json package-lock.json* bun.lock* ./
RUN npm install --legacy-peer-deps

# Build
COPY . .
RUN npm run build

## Stage 2 — Serve with Nginx (SPA)
FROM nginx:alpine AS runner

# Nginx config with SPA fallback
RUN printf 'server {\n\
  listen 3000;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
\n\
  # Gzip\n\
  gzip on;\n\
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;\n\
\n\
  # Long cache for hashed assets\n\
  location /assets/ {\n\
    expires 1y;\n\
    add_header Cache-Control "public, immutable";\n\
    try_files $uri =404;\n\
  }\n\
\n\
  # SPA fallback\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf \
 && rm -f /etc/nginx/conf.d/default.conf.default

# Copy built static files. TanStack Start with Cloudflare plugin emits the
# client bundle to dist/client. Fallback to dist/ if structure differs.
COPY --from=builder /app/dist/client /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
