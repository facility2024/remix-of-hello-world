import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

interface ContactFormData {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  mensagem: string;
}

function buildNotificationHTML(data: ContactFormData): string {
  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>
body{font-family:Arial,sans-serif;background:#1a1a1a;color:#fff;margin:0;padding:20px}
.c{max-width:600px;margin:0 auto;background:#2a2a2a;border-radius:12px;overflow:hidden}
.h{background:linear-gradient(135deg,#c75b39,#e07050);padding:24px;text-align:center}
.h h1{margin:0;font-size:20px;color:#fff}
.b{padding:24px}
.f{margin-bottom:16px}
.l{font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.v{font-size:16px;color:#fff;background:#333;padding:10px 14px;border-radius:8px}
.m{background:#333;padding:16px;border-radius:8px;white-space:pre-wrap;line-height:1.5}
.ft{padding:16px 24px;text-align:center;font-size:12px;color:#666;border-top:1px solid #333}
</style></head><body><div class="c"><div class="h"><h1>Facility Software Brasil</h1></div><div class="b">
<div class="f"><div class="l">Nome</div><div class="v">${data.nome}</div></div>
<div class="f"><div class="l">E-mail</div><div class="v">${data.email}</div></div>
<div class="f"><div class="l">WhatsApp</div><div class="v">${data.whatsapp}</div></div>
<div class="f"><div class="l">Empresa</div><div class="v">${data.empresa || "Nao informada"}</div></div>
<div class="f"><div class="l">Mensagem</div><div class="m">${data.mensagem || "Sem mensagem"}</div></div>
</div><div class="ft">Enviado em ${now} via formulario de contato</div></div></body></html>`;
}

function buildConfirmationHTML(name: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>
body{font-family:Arial,sans-serif;background:#1a1a1a;color:#fff;margin:0;padding:20px}
.c{max-width:600px;margin:0 auto;background:#2a2a2a;border-radius:12px;overflow:hidden}
.h{background:linear-gradient(135deg,#c75b39,#e07050);padding:24px;text-align:center}
.h h1{margin:0;font-size:20px;color:#fff}
.b{padding:24px;line-height:1.6}
.ft{padding:16px 24px;text-align:center;font-size:12px;color:#666;border-top:1px solid #333}
</style></head><body><div class="c"><div class="h"><h1>Facility Software Brasil</h1></div><div class="b">
<p>Olá ${name},</p>
<p>Recebemos sua solicitação e nossa equipe entrará em contato em breve.</p>
<p>Horário de atendimento: Segunda a Sexta, 9h às 18h.</p>
<p>Atenciosamente,<br/><strong>Facility Software Brasil</strong></p>
</div><div class="ft">Facility Software Brasil — Software House e Agencia Digital</div></div></body></html>`;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const LOG_PREFIX = "[SMTP]";
        try {
          const data: ContactFormData = await request.json();
          console.log(`${LOG_PREFIX} Tentativa de envio de ${data.email}`);

          if (!data.nome?.trim() || !data.email?.trim() || !data.whatsapp?.trim()) {
            console.log(`${LOG_PREFIX} Validacao falhou: campos obrigatorios`);
            return new Response(JSON.stringify({ error: "Campos obrigatorios nao preenchidos" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            console.log(`${LOG_PREFIX} Validacao falhou: email invalido`);
            return new Response(JSON.stringify({ error: "E-mail invalido" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const smtpHost = process.env.SMTP_HOST;
          const smtpPort = Number(process.env.SMTP_PORT);
          const smtpUser = process.env.SMTP_USER;
          const smtpPass = process.env.SMTP_PASSWORD;

          if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
            console.error(`${LOG_PREFIX} Variaveis SMTP nao configuradas`);
            return new Response(JSON.stringify({ error: "Servico de email nao configurado" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          console.log(`${LOG_PREFIX} Conectando em ${smtpHost}:${smtpPort}...`);

          const nodemailer = await import("nodemailer");
          const transporter = nodemailer.default.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: true,
            auth: { user: smtpUser, pass: smtpPass },
          });

          await transporter.verify();
          console.log(`${LOG_PREFIX} Conexao SMTP verificada com sucesso`);

          const infoPrincipal = await transporter.sendMail({
            from: `"Facility Software Brasil" <${smtpUser}>`,
            to: "suporte@coconudi.com",
            replyTo: data.email,
            subject: `Nova solicitacao de contato — ${data.nome}`,
            html: buildNotificationHTML(data),
          });
          console.log(`${LOG_PREFIX} Email de notificacao enviado: ${infoPrincipal.messageId}`);

          try {
            const infoConfirmacao = await transporter.sendMail({
              from: `"Facility Software Brasil" <${smtpUser}>`,
              to: data.email,
              subject: "Recebemos sua solicitacao — Facility Software Brasil",
              html: buildConfirmationHTML(data.nome),
            });
            console.log(`${LOG_PREFIX} Email de confirmacao enviado: ${infoConfirmacao.messageId}`);
          } catch (confErr) {
            console.error(`${LOG_PREFIX} Falha na confirmacao (email principal enviado):`, confErr);
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error(`${LOG_PREFIX} ERRO COMPLETO:`, error);
          return new Response(JSON.stringify({ error: "Erro ao enviar mensagem" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
