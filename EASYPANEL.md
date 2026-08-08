# Deploy no EasyPanel

## Tipo de serviço

**App → Dockerfile** (use o `Dockerfile` da raiz)

## Configuração

- **Port:** `3000`
- **Build context:** raiz do projeto
- **Health check path:** `/health`

## Variáveis de ambiente

Nenhuma obrigatória — o servidor Node sobe na porta `3000` por padrão.

## Como funciona

1. Build em Node 22 com `npx vite build` → gera SSR + client em `dist/`
2. Stage final usa **Node 22 Alpine** com `node dist/server/index.mjs`
3. O servidor Nitro SSR entrega o site completo com server-side rendering
4. Todo o layout, Framer Motion, Spline 3D, Tailwind v4 e ChatBot funcionando

## Se aparecer "Service is not reachable"

- Confirme **Port = 3000** no EasyPanel (não 80)
- Veja os logs do container: deve mostrar o servidor rodando na porta 3000
- Configure o health check do EasyPanel para `/health`
