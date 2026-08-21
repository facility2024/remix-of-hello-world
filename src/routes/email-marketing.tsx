import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  Image,
  Link2,
  MessageCircle,
  UserMinus,
  Users,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/email-marketing")({
  component: EmailMarketingPage,
});

interface SendResult {
  sent: number;
  failed: number;
  errors?: string[];
}

function EmailMarketingPage() {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonLink, setButtonLink] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [includeUnsubscribe, setIncludeUnsubscribe] = useState(true);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [error, setError] = useState("");

  const recipientCount = recipients
    .split(/[\n,;]+/)
    .map((e) => e.trim())
    .filter(Boolean).length;

  const handleSend = async () => {
    setSending(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/email-marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients,
          subject,
          message,
          imageUrl,
          buttonText,
          buttonLink,
          youtubeUrl,
          whatsappNumber,
          includeUnsubscribe,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao enviar");
        return;
      }

      setResult(data);
    } catch {
      setError("Falha na conexao. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <Mail size={14} />
              Email Marketing
            </div>
            <h1 className="font-heading text-3xl italic tracking-tight text-foreground sm:text-4xl">
              Disparo de Emails
            </h1>
            <p className="mt-2 text-muted-foreground">
              Envie emails personalizados para sua lista de contatos
            </p>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 text-green-500" size={20} />
                <div>
                  <p className="font-semibold text-green-500">Envio concluido!</p>
                  <p className="text-sm text-muted-foreground">
                    {result.sent} email(s) enviado(s)
                    {result.failed > 0 && ` · ${result.failed} falha(s)`}
                  </p>
                  {result.errors && result.errors.length > 0 && (
                    <p className="mt-1 text-xs text-red-400">
                      Falhas: {result.errors.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 text-red-500" size={20} />
                <div>
                  <p className="font-semibold text-red-500">Erro</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-6">
            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <Users size={18} />
                <h2 className="font-semibold">Destinatarios</h2>
                <span className="ml-auto rounded-full bg-primary/10 px-3 py-0.5 text-xs text-primary">
                  {recipientCount} / 100
                </span>
              </div>
              <textarea
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder={"email1@exemplo.com\nemail2@exemplo.com\nemail3@exemplo.com"}
                rows={5}
                className="w-full resize-none rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Separe por virgula, ponto-e-virgula ou enter. Maximo 100 por envio.
              </p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <FileText size={18} />
                <h2 className="font-semibold"> Conteudo</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Assunto do email *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex: Novidades da Facility"
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Mensagem *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escreva a mensagem do email aqui..."
                    rows={8}
                    className="w-full resize-none rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <Image size={18} />
                <h2 className="font-semibold">Imagem</h2>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  URL da imagem
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Insira a URL de uma imagem hospedada. Ela aparecera no corpo do email.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <Link2 size={18} />
                <h2 className="font-semibold">Link e Botao</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Texto do botao
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Ex: Saiba Mais"
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Link do botao
                  </label>
                  <input
                    type="url"
                    value={buttonLink}
                    onChange={(e) => setButtonLink(e.target.value)}
                    placeholder="https://exemplo.com"
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-foreground">
                <MessageCircle size={18} />
                <h2 className="font-semibold">Redes Sociais</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Link do YouTube
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">
                    Numero do WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="5511999999999"
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Formato: codigo do pais + DDD + numero
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserMinus size={18} className="text-foreground" />
                  <div>
                    <h2 className="font-semibold text-foreground">Cancelamento</h2>
                    <p className="text-xs text-muted-foreground">
                      Incluir link de cancelamento no rodape do email
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludeUnsubscribe(!includeUnsubscribe)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    includeUnsubscribe ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      includeUnsubscribe ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleSend}
              disabled={sending || !recipients.trim() || !subject.trim() || !message.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Enviar para {recipientCount} destinatario(s)
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
