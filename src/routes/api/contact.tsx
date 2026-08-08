import { createFileRoute } from "@tanstack/react-router";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import nodemailer from "nodemailer";

interface ContactFormData {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  mensagem: string;
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "suporte@coconudi.com",
      pass: process.env.SMTP_PASSWORD || "",
    },
  });
}

function buildEmailHTML(data: ContactFormData) {
  const now = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial, sans-serif; background: #1a1a1a; color: #fff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #2a2a2a; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #c75b39, #e07050); padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; color: #fff; }
        .content { padding: 24px; }
        .field { margin-bottom: 16px; }
        .label { font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .value { font-size: 16px; color: #fff; background: #333; padding: 10px 14px; border-radius: 8px; }
        .message { background: #333; padding: 16px; border-radius: 8px; white-space: pre-wrap; line-height: 1.5; }
        .footer { padding: 16px 24px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Facility Software Brasil</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Nome</div>
            <div class="value">${data.nome}</div>
          </div>
          <div class="field">
            <div class="label">E-mail</div>
            <div class="value">${data.email}</div>
          </div>
          <div class="field">
            <div class="label">WhatsApp</div>
            <div class="value">${data.whatsapp}</div>
          </div>
          <div class="field">
            <div class="label">Empresa</div>
            <div class="value">${data.empresa || "Não informada"}</div>
          </div>
          <div class="field">
            <div class="label">Mensagem</div>
            <div class="message">${data.mensagem || "Sem mensagem"}</div>
          </div>
        </div>
        <div class="footer">
          Enviado em ${now} via formulário de contato
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildConfirmationHTML(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: Arial, sans-serif; background: #1a1a1a; color: #fff; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #2a2a2a; border-radius: 12px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #c75b39, #e07050); padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; color: #fff; }
        .content { padding: 24px; line-height: 1.6; }
        .footer { padding: 16px 24px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Facility Software Brasil</h1>
        </div>
        <div class="content">
          <p>Olá ${name},</p>
          <p>Recebemos sua solicitação e nossa equipe entrará em contato em breve.</p>
          <p>Horário de atendimento: Segunda a Sexta, 9h às 18h.</p>
          <p>Atenciosamente,<br/><strong>Facility Software Brasil</strong></p>
        </div>
        <div class="footer">
          Facility Software Brasil — Software House e Agência Digital
        </div>
      </div>
    </body>
    </html>
  `;
}

async function sendContactEmail(data: ContactFormData) {
  const transporter = getTransporter();

  const mailOptions = {
    from: `"Facility Software Brasil" <${process.env.SMTP_USER || "suporte@coconudi.com"}>`,
    to: "suporte@coconudi.com",
    replyTo: data.email,
    subject: `Nova solicitação de contato — ${data.nome}`,
    html: buildEmailHTML(data),
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("[EMAIL] Notificação enviada:", info.messageId);

  const confirmationOptions = {
    from: `"Facility Software Brasil" <${process.env.SMTP_USER || "suporte@coconudi.com"}>`,
    to: data.email,
    subject: "Recebemos sua solicitação — Facility Software Brasil",
    html: buildConfirmationHTML(data.nome),
  };

  try {
    const confInfo = await transporter.sendMail(confirmationOptions);
    console.log("[EMAIL] Confirmação enviada:", confInfo.messageId);
  } catch (err) {
    console.error("[EMAIL] Falha ao enviar confirmação:", err);
  }

  return info;
}

async function handlePOST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

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

    const info = await sendContactEmail(data);

    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[EMAIL] Erro ao processar envio:", error);
    return new Response(JSON.stringify({ error: "Erro ao enviar mensagem" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const Route = createFileRoute("/api/contact")();

export const APIRoute = createAPIFileRoute("/api/contact")({
  POST: handlePOST,
});
