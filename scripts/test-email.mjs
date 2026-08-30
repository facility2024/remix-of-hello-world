#!/usr/bin/env node
/**
 * Teste de envio SMTP — Hostinger (suporte@coconudi.com)
 *
 * Valida a configuracao e envia um e-mail de teste para suporte@coconudi.com
 * usando EXCLUSIVAMENTE a variavel SMTP_PASSWORD (nunca hardcodada).
 *
 * Como executar:
 *   1. Preencha o .env na raiz (copie de .env.example e defina SMTP_PASSWORD)
 *   2. npm run test:email
 *      ou: node scripts/test-email.mjs
 *      ou: node --env-file=.env scripts/test-email.mjs
 *
 * Requisitos (.env):
 *   SMTP_HOST=smtp.hostinger.com
 *   SMTP_PORT=465
 *   SMTP_USER=suporte@coconudi.com
 *   SMTP_PASSWORD=<senha da caixa>
 *
 * O script:
 *   - valida presenca e formato das variaveis
 *   - faz transporter.verify() (erro real aparece no console)
 *   - envia e-mail de teste para suporte@coconudi.com
 *   - so imprime "sucesso" apos confirmacao do servidor SMTP (info.messageId)
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");

// Carrega .env manualmente (sem depender de dotenv)
if (existsSync(envPath)) {
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = val;
  }
}

const LOG = "[SMTP-TEST]";
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASSWORD;

console.log(`${LOG} === Teste de envio Hostinger ===`);
console.log(`${LOG} Host: ${smtpHost ?? "(nao definido)"}`);
console.log(
  `${LOG} Port: ${Number.isNaN(smtpPort) ? "(nao definido)" : smtpPort} (SSL/TLS esperado: 465)`,
);
console.log(`${LOG} User/remetente: ${smtpUser ?? "(nao definido)"}`);
console.log(
  `${LOG} Pass: ${smtpPass ? "****" + smtpPass.slice(-4) : "(nao definida — defina SMTP_PASSWORD no .env)"}`,
);
console.log("");

// Validacoes antes de tentar conexao
const errors = [];
if (!smtpHost) errors.push("SMTP_HOST nao definido (esperado: smtp.hostinger.com)");
if (!smtpPort || Number.isNaN(smtpPort)) errors.push("SMTP_PORT nao definido (esperado: 465)");
if (smtpPort !== 465)
  console.warn(`${LOG} AVISO: Porta ${smtpPort} diferente de 465 (SSL/TLS Hostinger)`);
if (!smtpUser) errors.push("SMTP_USER nao definido (esperado: suporte@coconudi.com)");
else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(smtpUser))
  errors.push(`SMTP_USER invalido: ${smtpUser}`);
if (!smtpPass) errors.push("SMTP_PASSWORD nao definida — defina no .env (nunca commitar)");

if (errors.length) {
  console.error(`${LOG} ERRO de configuracao:`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(`\n${LOG} Corrija o .env (veja .env.example) e tente novamente.`);
  process.exit(1);
}

try {
  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.default.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true, // 465 = SSL/TLS
    auth: { user: smtpUser, pass: smtpPass },
  });

  console.log(`${LOG} 1/3 Verificando conexao SMTP em ${smtpHost}:${smtpPort}...`);
  await transporter.verify();
  console.log(`${LOG}     Conexao SMTP verificada com sucesso\n`);

  const now = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

  // Dados de exemplo que simulam um cadastro/formulario real
  const nomeTeste = "Teste Facility";
  const emailTeste = smtpUser; // notificacao vai para suporte@coconudi.com
  const mensagemTeste = "Este e um teste automatico. Se voce recebeu, o SMTP Hostinger esta OK.";

  console.log(`${LOG} 2/3 Enviando notificacao de teste para ${emailTeste}...`);
  const info = await transporter.sendMail({
    from: `"Facility Software Brasil" <${smtpUser}>`,
    to: "suporte@coconudi.com",
    replyTo: smtpUser,
    subject: `[TESTE] Notificacao Hostinger — ${now}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#e85d2a,#ff8a4a);padding:20px;color:#fff;text-align:center">
          <h2 style="margin:0">Teste de notificacao — Facility</h2>
        </div>
        <div style="padding:24px">
          <p><strong>Nome:</strong> ${nomeTeste}</p>
          <p><strong>E-mail:</strong> ${emailTeste}</p>
          <p><strong>Data:</strong> ${now}</p>
          <p><strong>Mensagem:</strong> ${mensagemTeste}</p>
          <p style="margin-top:16px;color:#666;font-size:12px">Enviado via scripts/test-email.mjs — Hostinger smtp.hostinger.com:465 (SSL)</p>
        </div>
      </div>
    `,
  });

  // So considera sucesso apos confirmacao do servidor
  if (!info.messageId) throw new Error("SMTP nao retornou messageId — envio nao confirmado");

  console.log(`${LOG}     Enviado com sucesso! MessageId: ${info.messageId}`);
  console.log(`${LOG}     Destinatario confirmado: suporte@coconudi.com`);
  console.log(
    `${LOG} 3/3 Verificacao: abra a caixa suporte@coconudi.com e confirme o recebimento.\n`,
  );
  console.log(`${LOG} === SUCESSO — SMTP operacional ===`);
} catch (error) {
  console.error(`\n${LOG} FALHA NO ENVIO — erro real do SMTP:`);
  console.error(error);
  if (error && typeof error === "object") {
    if ("code" in error) console.error(`${LOG} Codigo: ${error.code}`);
    if ("command" in error) console.error(`${LOG} Comando: ${error.command}`);
    if ("response" in error) console.error(`${LOG} Resposta: ${error.response}`);
  }
  console.error(
    `\n${LOG} Dicas: verifique SMTP_PASSWORD no .env / EasyPanel Env, porta 465 com secure:true, e se a caixa suporte@coconudi.com existe na Hostinger.`,
  );
  process.exit(1);
}
