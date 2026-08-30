# Deploy no EasyPanel — Deploy Automático via GitHub

> Configuração atual: **Branch `master`** | **Tipo Dockerfile** | Repositório já conectado na aba **Github**

## 1. Configuração no EasyPanel (uma vez)

No serviço já criado:

1. **Source → Github**
   - Repositório: `facility2024/remix-of-hello-world`
   - Branch: `master` ⚠️ (não `main`)
   - Auto Deploy: **ativado** (se houver toggle)
2. **Build → Dockerfile**
   - Tipo de construção: `Dockerfile`
   - Dockerfile Path: `Dockerfile` (raiz do projeto)
   - Build Context: `.` (raiz)
   - Se aparecer campo "Docker command", deixe padrão (o `Dockerfile` já faz `npx vite build`)
3. **General → Port** ⚠️ CRÍTICO — deve casar com `PORT` do container
   - Port: `3000` (não 80) — este é o padrão do `Dockerfile` (`ENV PORT=3000`)
   - Health Check Path: `/health` (também atende `/healthz`)
   - **Se o Port estiver em 80, o container sobe em 3000, o health em 80 falha e o serviço reinicia em loop** (`Listening on: http://localhost:3000` ≠ `Port 80` → amarelo)
   - Correção: OU mude o Port do EasyPanel para `3000`, OU vá em **Env** e defina `PORT=80` e troque `Dockerfile:26` para `ENV PORT=80` / `EXPOSE 80`
4. **Env** (opcional, só para e-mail)
   - `SMTP_HOST=smtp.hostinger.com`
   - `SMTP_PORT=465`
   - `SMTP_USER=...`
   - `SMTP_PASSWORD=...`
   - Sem essas vars o site sobe normal, mas `/api/contact` e `/api/email-marketing` retornam 500 `Servico de email nao configurado`
5. Clique em **Salvar**

## 2. Como funciona o deploy automático

- Você faz `git push` para `origin/master`
- EasyPanel detecta o push via webhook do GitHub e inicia o build automaticamente
- Build: `node:22-alpine` → `npm ci --legacy-peer-deps` → `npx vite build` → gera `dist/server/index.mjs` (Nitro SSR) + `dist/client`
- Runtime: `node dist/server/index.mjs` em `0.0.0.0:3000`
- Se o auto deploy não disparar, abra o serviço no EasyPanel e clique em **Implantar / Deploy**

## 3. Fluxo de trabalho local (sempre)

```sh
# 1. fazer alterações no código
git add -A
git commit -m "descrição da alteração"
git push origin master
# EasyPanel faz deploy automaticamente
```

> O agente deste repositório já está configurado para fazer `git add -A && git commit && git push` a cada alteração.

## 4. Verificação

- Logs do container devem mostrar: `Listening on: http://0.0.0.0:3000 (all interfaces)` ou `http://localhost:3000` — a **PORTA no log deve ser idêntica ao Port do EasyPanel**
  - Se o log mostra `...:3000` mas o Port do EasyPanel é `80` → **troque o Port para 3000** e reimplante
  - Alternativa: mantenha `Port 80` no EasyPanel e defina `PORT=80` em **Env** + `ENV PORT=80`/`EXPOSE 80` no Dockerfile
- Acesse `https://SEU_DOMINIO/health` → deve retornar `ok` (confirma que o `HEALTHCHECK` dinâmico está passando)
- Status deve ficar **verde e estável**, sem `Server closed successfully.` repetido
- Se aparecer **"Service is not reachable"** ou ficar **amarelo em loop**:
  - Confirme **Port = 3000** no EasyPanel (não 80) — causa #1 do loop
  - Confirme **Branch = master** (não main)
  - Confirme **Build = Dockerfile** (não Nixpacks/Buildpacks)
  - Veja os logs: erro de `vite build` ou `dist/server/index.mjs` não encontrado = falha de build
  - Re-clique em **Implantar**

## 5. Arquivos relevantes

- `Dockerfile` — multi-stage Node 22, `HEALTHCHECK` em `/health`, `EXPOSE 3000`
- `vite.config.ts` — Nitro `node-server`, output `dist/server` + `dist/client`
- `scripts/easypanel-server.mjs` — servidor estático alternativo (não usado no Dockerfile, apenas `npm run easypanel:start`)
- `netlify.toml` — irrelevante para EasyPanel, mas usa mesmo `--legacy-peer-deps`
