# EasyPanel

Use este projeto como **App/Node customizado com Bun**, sem mexer no layout.

## Runtime
- Runtime: Bun
- Version: 1.3.3+
- Port: `3000`

## Commands
- Install: `bun install --frozen-lockfile`
- Build: `bun run build`
- Start: `bun run dist/server/index.js`

## Environment
- `NODE_ENV=production`
- `HOST=0.0.0.0`
- `PORT=3000`

## Observação
Se o EasyPanel subir com Node e não com Bun, este projeto SSR pode encerrar sem responder. Nesse caso, troque o runtime para Bun no serviço.
