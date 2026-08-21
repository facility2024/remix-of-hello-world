import { createFileRoute } from "@tanstack/react-router";

interface EmailMarketingData {
  recipients: string;
  subject: string;
  message: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  youtubeUrl?: string;
  whatsappNumber?: string;
  includeUnsubscribe?: boolean;
}

function buildMarketingHTML(data: EmailMarketingData): string {
  const HEADER_IMG = "https://coconudimudial.b-cdn.net/AGENCIA%20FACILITY/Agencia.png";
  const recipientList = data.recipients
    .split(/[\n,;]+/)
    .map((e) => e.trim())
    .filter(Boolean);

  const imageBlock = data.imageUrl
    ? `<div style="margin:20px 0;text-align:center"><img src="${data.imageUrl}" alt="Imagem" style="max-width:100%;border-radius:8px" /></div>`
    : "";

  const buttonBlock =
    data.buttonText && data.buttonLink
      ? `<div style="text-align:center;margin:24px 0"><a href="${data.buttonLink}" target="_blank" style="display:inline-block;background:#e85d2a;color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:16px">${data.buttonText}</a></div>`
      : "";

  const youtubeBlock = data.youtubeUrl
    ? `<div style="text-align:center;margin:20px 0"><a href="${data.youtubeUrl}" target="_blank" style="display:inline-block;background:#ff0000;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px">&#9654; Assistir no YouTube</a></div>`
    : "";

  const whatsappBlock = data.whatsappNumber
    ? `<div style="text-align:center;margin:20px 0"><a href="https://wa.me/${data.whatsappNumber.replace(/\D/g, "")}" target="_blank" style="display:inline-block;background:#25d366;color:#fff;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:bold;font-size:14px">&#128172; Fale conosco no WhatsApp</a></div>`
    : "";

  const unsubscribeBlock = data.includeUnsubscribe
    ? `<div style="text-align:center;margin:30px 0 10px;padding-top:20px;border-top:1px solid #eee"><p style="font-size:12px;color:#999;margin:0">Se voce nao deseja mais receber nossos emails, <a href="mailto:suporte@coconudi.com?subject=Cancelar%20email%20marketing" style="color:#e85d2a">clique aqui para cancelar</a>.</p></div>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><style>
body{font-family:Arial,sans-serif;background:#f5f5f5;color:#000;margin:0;padding:20px}
.c{max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.h{width:100%}
.h img{width:100%;height:auto;display:block}
.b{padding:24px;line-height:1.6;color:#333}
.b p{margin:0 0 12px 0}
.ft{padding:16px 24px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee}
</style></head><body><div class="c"><div class="h"><img src="${HEADER_IMG}" alt="Facility Software Brasil" /></div><div class="b">
<div style="white-space:pre-wrap">${data.message}</div>
${imageBlock}
${buttonBlock}
${youtubeBlock}
${whatsappBlock}
${unsubscribeBlock}
</div><div class="ft">Facility Software Brasil — Software House e Agencia Digital</div></div></body></html>`;
}

export const Route = createFileRoute("/api/email-marketing")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const LOG_PREFIX = "[EMAIL-MARKETING]";
        try {
          const data: EmailMarketingData = await request.json();

          const recipients = data.recipients
            .split(/[\n,;]+/)
            .map((e) => e.trim())
            .filter(Boolean);

          if (!recipients.length) {
            return new Response(JSON.stringify({ error: "Adicione pelo menos um destinatario" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (recipients.length > 100) {
            return new Response(
              JSON.stringify({ error: "Maximo de 100 destinatarios por envio" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          if (!data.subject?.trim() || !data.message?.trim()) {
            return new Response(
              JSON.stringify({ error: "Assunto e mensagem sao obrigatorios" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const smtpHost = process.env.SMTP_HOST;
          const smtpPort = Number(process.env.SMTP_PORT);
          const smtpUser = process.env.SMTP_USER;
          const smtpPass = process.env.SMTP_PASSWORD;

          if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
            return new Response(
              JSON.stringify({ error: "Servico de email nao configurado" }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          const nodemailer = await import("nodemailer");
          const transporter = nodemailer.default.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: true,
            auth: { user: smtpUser, pass: smtpPass },
          });

          await transporter.verify();
          console.log(`${LOG_PREFIX} SMTP conectado`);

          const html = buildMarketingHTML(data);
          let sent = 0;
          let failed = 0;
          const errors: string[] = [];

          for (const email of recipients) {
            try {
              await transporter.sendMail({
                from: `"Facility Software Brasil" <${smtpUser}>`,
                to: email,
                subject: data.subject,
                html,
              });
              sent++;
              console.log(`${LOG_PREFIX} Enviado para ${email}`);
            } catch (err) {
              failed++;
              errors.push(email);
              console.error(`${LOG_PREFIX} Falha ao enviar para ${email}:`, err);
            }
          }

          return new Response(
            JSON.stringify({
              success: true,
              sent,
              failed,
              errors: errors.length ? errors : undefined,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        } catch (error) {
          console.error(`${LOG_PREFIX} ERRO:`, error);
          return new Response(JSON.stringify({ error: "Erro ao enviar emails" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
