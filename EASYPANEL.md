# Deploy no EasyPanel

## Tipo de serviço
**App → Dockerfile** (use o `Dockerfile` da raiz)

## Configuração
- **Port:** `3000`
- **Build context:** raiz do projeto
- **Health check path:** `/`

## Variáveis de ambiente
```
NODE_ENV=production
HOST=0.0.0.0
PORT=3000
```

## Como funciona
1. Build em Node 22 (mais estável que Bun no EasyPanel)
2. `npm run build` gera `dist/` (cliente + servidor SSR)
3. Servidor SSR do TanStack Start é iniciado com `node dist/server/index.mjs`
4. Layout, animações, Spline, Framer Motion — tudo preservado

## Se aparecer erro do entry do servidor
O TanStack pode gerar `dist/server/index.js` ou `dist/server/index.mjs`. Se o
container falhar com "Cannot find module", confira o nome real:
```
docker run --rm -it <image> ls dist/server
```
e ajuste o `CMD` no Dockerfile.
