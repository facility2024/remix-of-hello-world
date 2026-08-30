#!/usr/bin/env node
/**
 * Script de teste de envio de e-mail via SMTP (Hostinger).
 *
 * Uso:
 *   node scripts/test-email.mjs
 *
 * Requer que as variáveis SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
 * estejam definidas no .env ou no ambiente.
 */
import { config } from "dotenv";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "..", ".env") });

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASSWORD;

console.log("=== Teste de envio de e-mail ===");
console.log(`Host: ${smtpHost}`);
console.log(`Port: ${smtpPort}`);
console.log(`User: ${smtpUser}`);
console.log(`Pass: ${smtpPass ? "****" + smtpPass.slice(-4) : "(não definida)"}`);
console.log("");

if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
  console.error("ERRO: Variáveis SMTP não configuradas. Verifique o arquivo .env");
  process.exit(1);
}

try {
  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.default.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true,
    auth: { user: smtpUser, pass: smtpPass },
  });

  console.log("1. Verificando conexão SMTP...");
  await transporter.verify();
  console.log("   ✅ Conexão SMTP verificada com sucesso\n");

  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  console.log("2. Enviando e-mail de teste...");
  const info = await transporter.sendMail({
    from: `"Facility Software Brasil" <${smtpUser}>`,
    to: smtpUser,
    subject: `[TESTE] E-mail de teste — ${now}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:12px">
        <h2 style="color:#e85d2a">✅ E-mail de teste enviado com sucesso!</h2>
        <p><strong>Data:</strong> ${now}</p>
        <p><strong>Remetente:</strong> ${smtpUser}</p>
        <p><strong>Destinatário:</strong> ${smtpUser}</p>
        <p>Se você recebeu este e-mail, a configuração SMTP está funcionando corretamente.</p>
      </div>
    `,
  });

  console.log(`   ✅ E-mail enviado! Message ID: ${info.messageId}`);
  console.log(`   ✅ Caixa de entrada: ${smtpUser}`);
  console.log("\n=== Teste concluído com sucesso ===");
} catch (error) {
  console.error("\n❌ FALHA NO ENVIO:");
  console.error(error.message);
  if (error.code) console.error(`   Código: ${error.code}`);
  if (error.command) console.error(`   Comando: ${error.command}`);
  process.exit(1);
}
