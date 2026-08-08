import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await request.json();

          if (!data.nome?.trim() || !data.email?.trim() || !data.whatsapp?.trim()) {
            return new Response(JSON.stringify({ error: "Campos obrigatórios não preenchidos" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            return new Response(JSON.stringify({ error: "E-mail inválido" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const nodemailer = await import("nodemailer");

          const transporter = nodemailer.default.createTransport({
            host: process.env.SMTP_HOST || "smtp.hostinger.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
              user: process.env.SMTP_USER || "suporte@coconudi.com",
              pass: process.env.SMTP_PASSWORD || "",
            },
          });

          const now = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          });

          const emailHTML = `
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8" /><style>
              body { font-family: Arial, sans-serif; background: #1a1a1a; color: #fff; margin: 0; padding: 20px; }
              .c { max-width: 600px; margin: 0 auto; background: #2a2a2a; border-radius: 12px; overflow: hidden; }
              .h { background: linear-gradient(135deg, #c75b39, #e07050); padding: 24px; text-align: center; }
              .h h1 { margin: 0; font-size: 20px; color: #fff; }
              .b { padding: 24px; }
              .f { margin-bottom: 16px; }
              .l { font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
              .v { font-size: 16px; color: #fff; background: #333; padding: 10px 14px; border-radius: 8px; }
              .m { background: #333; padding: 16px; border-radius: 8px; white-space: pre-wrap; line-height: 1.5; }
              .ft { padding: 16px 24px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; }
            </style></head>
            <body>
              <div class="c">
                <div class="h"><h1>Facility Software Brasil</h1></div>
                <div class="b">
                  <div class="f"><div class="l">Nome</div><div class="v">${data.nome}</div></div>
                  <div class="f"><div class="l">E-mail</div><div class="v">${data.email}</div></div>
                  <div class="f"><div class="l">WhatsApp</div><div class="v">${data.whatsapp}</div></div>
                  <div class="f"><div class="l">Empresa</div><div class="v">${data.empresa || "Não informada"}</div></div>
                  <div class="f"><div class="l">Mensagem</div><div class="m">${data.mensagem || "Sem mensagem"}</div></div>
                </div>
                <div class="ft">Enviado em ${now} via formulário de contato</div>
              </div>
            </body></html>
          `;

          await transporter.sendMail({
            from: `"Facility Software Brasil" <${process.env.SMTP_USER}>`,
            to: "suporte@coconudi.com",
            replyTo: data.email,
            subject: `Nova solicitação — ${data.nome}`,
            html: emailHTML,
          });

          try {
            await transporter.sendMail({
              from: `"Facility Software Brasil" <${process.env.SMTP_USER}>`,
              to: data.email,
              subject: "Recebemos sua solicitação — Facility Software Brasil",
              html: `<p>Olá ${data.nome},</p><p>Recebemos sua solicitação. Nossa equipe entrará em contato em breve.</p><p><strong>Facility Software Brasil</strong></p>`,
            });
          } catch {
            // confirmação falhou, mas o email principal foi enviado
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("[EMAIL] Erro:", error);
          return new Response(JSON.stringify({ error: "Erro ao enviar mensagem" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
