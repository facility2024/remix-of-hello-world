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
1. Build em Node 22 com `npm run build` → gera `dist/client` e `dist/server`
2. Stage final usa **Node 22 Alpine** com `scripts/easypanel-server.mjs`
3. O servidor entrega os arquivos estáticos de `dist/client` e usa o render do app para as rotas
4. Todo o layout, Framer Motion, Spline 3D, Tailwind v4 e ChatBot continuam funcionando
5. Assets hashados em `/assets/*` recebem cache longo automaticamente

## Se aparecer "Service is not reachable"
- Confirme **Port = 3000** no EasyPanel (não 80)
- Veja os logs do container: `docker logs <container>` — deve mostrar `Facility app listening on http://0.0.0.0:3000`
- Configure o health check do EasyPanel para `/health`; essa rota responde `ok` imediatamente
- Confirme que o build gerou `dist/client` e `dist/server`
