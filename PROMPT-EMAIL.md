# Prompt — Envio de Email via SMTP Hostinger

Cole este prompt em projetos TanStack Start/React que precisam de envio de email pelo formulário de contato.

---

## Prompt

```
Implemente envio de e-mails transacionais no formulário de contato do site usando SMTP da Hostinger.

## Configuração SMTP
- SMTP_HOST=smtp.hostinger.com
- SMTP_PORT=465
- SMTP_USER=seu-email@seudominio.com
- SMTP_PASSWORD=lido apenas de variável de ambiente

## Requisitos técnicos

1. Criar rota POST em `src/routes/api/contact.tsx` usando o padrão TanStack Start:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        // ler body com request.json()
        // validar campos obrigatórios
        // enviar email com nodemailer (dynamic import)
        // retornar JSON { success: true } ou { error: "mensagem" }
      },
    },
  },
});
```

2. Instalar dependências:
```sh
npm install nodemailer
npm install -D @types/nodemailer
```

3. No formulário (frontend), usar fetch para chamar `/api/contact`:
```tsx
fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(dados),
})
```

4. Variáveis de ambiente (nunca no código):
- Criar `.env.example` com as variáveis (sem senha real)
- Adicionar `.env` no `.env` do `.gitignore`
- No EasyPanel: configurar SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD em Ambiente

5. Segurança:
- Senha nunca no código, frontend ou logs
- Usar conexão SSL/TLS (porta 465, secure: true)
- Validar endereço de e-mail com regex
- Validar campos obrigatórios no backend

6. Logs no backend (seguros, sem expor senha):
- [SMTP] Tentativa de envio de <email>
- [SMTP] Conexao SMTP verificada com sucesso
- [SMTP] Email enviado: <messageId>
- [SMTP] ERRO: <erro completo>

7. Email de confirmação automático:
- Enviar para suporte@seudominio.com (notificação)
- Enviar para o email do usuário (confirmação de recebimento)

## Template do email (HTML)
- Fundo escuro (#1a1a1a), card (#2a2a2a)
- Header com gradiente laranja
- Campos: Nome, E-mail, WhatsApp, Empresa, Mensagem
- Footer com data/hora do envio

## Para testar
1. Localmente: preencher `.env` com a senha e rodar `bun run dev`
2. Produção: configurar variáveis no EasyPanel e clicar em "Implantar"
3. Verificar logs no EasyPanel (Ações > terminal)

## Arquivos necessários
- `src/routes/api/contact.tsx` — API server-side
- `.env.example` — template das variáveis
- `.gitignore` — ignorar `.env`
- `package.json` — nodemailer nas dependências
```
