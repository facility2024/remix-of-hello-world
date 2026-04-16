# Deploy no EasyPanel

## Tipo de serviço
**App → Dockerfile** (use o `Dockerfile` da raiz)

## Configuração
- **Port:** `3000`
- **Build context:** raiz do projeto
- **Health check path:** `/`

## Variáveis de ambiente
Nenhuma obrigatória — Nginx serve estático na porta 3000.

## Como funciona
1. Build em Node 22 com `npm run build` → gera `dist/client` (HTML/CSS/JS)
2. Stage final usa **Nginx Alpine** servindo os arquivos estáticos na porta 3000
3. SPA fallback configurado (`try_files ... /index.html`) — rotas client-side funcionam ao recarregar
4. Todo o layout, Framer Motion, Spline 3D, Tailwind v4 e ChatBot são client-side e continuam funcionando 100%
5. Gzip + cache longo nos assets hashados (`/assets/*`)

## Se aparecer "Service is not reachable"
- Confirme **Port = 3000** no EasyPanel (não 80)
- Veja os logs do container: `docker logs <container>` — deve mostrar Nginx iniciando
- Confirme que `dist/client/index.html` foi gerado no build
