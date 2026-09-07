import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Mail, MailOpen, Clock, ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/email-marketing/stats")({
  component: EmailStatsPage,
});

interface CampaignStats {
  campaignId: string;
  subject: string;
  sentAt: string;
  total: number;
  opened: number;
  pending: number;
}

function EmailStatsPage() {
  const [stats, setStats] = useState<CampaignStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/track-stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalSent = stats.reduce((acc, s) => acc + s.total, 0);
  const totalOpened = stats.reduce((acc, s) => acc + s.opened, 0);
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0";

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #eef4ff 0%, #f5eeff 50%, #f8faff 100%)" }}
    >
      <div className="mx-auto max-w-[760px] px-4 py-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <a
              href="/email-marketing"
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "#7c6ff0" }}
            >
              <ArrowLeft size={16} />
              Voltar ao disparo
            </a>
            <div className="text-center">
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{
                  background: "linear-gradient(135deg, #e0e7ff, #ede9fe)",
                  color: "#7c6ff0",
                }}
              >
                <BarChart3 size={14} />
                Estatisticas
              </div>
              <h1
                className="font-heading text-3xl italic tracking-tight sm:text-4xl"
                style={{ color: "#1e2233" }}
              >
                Acompanhamento de Envios
              </h1>
            </div>
          </div>

          {/* Cards de resumo */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-white p-5 text-center"
              style={{
                boxShadow: "0 10px 40px -12px rgba(124, 111, 240, 0.15)",
                border: "1px solid #e7ebf5",
              }}
            >
              <div
                className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, #8ec5fc, #a5d8ff)" }}
              >
                <Mail size={18} style={{ color: "#fff" }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: "#1e2233" }}>
                {totalSent.toLocaleString("pt-BR")}
              </p>
              <p className="text-xs" style={{ color: "#8b93a7" }}>
                Enviados
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-white p-5 text-center"
              style={{
                boxShadow: "0 10px 40px -12px rgba(124, 111, 240, 0.15)",
                border: "1px solid #e7ebf5",
              }}
            >
              <div
                className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, #86efac, #4ade80)" }}
              >
                <MailOpen size={18} style={{ color: "#fff" }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: "#1e2233" }}>
                {totalOpened.toLocaleString("pt-BR")}
              </p>
              <p className="text-xs" style={{ color: "#8b93a7" }}>
                Abertos
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-2xl bg-white p-5 text-center"
              style={{
                boxShadow: "0 10px 40px -12px rgba(124, 111, 240, 0.15)",
                border: "1px solid #e7ebf5",
              }}
            >
              <div
                className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, #c4b5fd, #a78bfa)" }}
              >
                <BarChart3 size={18} style={{ color: "#fff" }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: "#1e2233" }}>
                {openRate}%
              </p>
              <p className="text-xs" style={{ color: "#8b93a7" }}>
                Taxa de abertura
              </p>
            </motion.div>
          </div>

          {/* Lista de campanhas */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="animate-spin" style={{ color: "#7c6ff0" }} />
            </div>
          ) : stats.length === 0 ? (
            <motion.div
              className="rounded-3xl bg-white p-12 text-center"
              style={{
                boxShadow: "0 10px 40px -12px rgba(124, 111, 240, 0.15)",
                border: "1px solid #e7ebf5",
              }}
            >
              <Mail size={48} style={{ color: "#e7ebf5" }} className="mx-auto mb-4" />
              <p className="text-lg font-semibold" style={{ color: "#1e2233" }}>
                Nenhuma campanha enviada
              </p>
              <p className="mt-1 text-sm" style={{ color: "#8b93a7" }}>
                Envie emails e acompanhe as estatisticas aqui
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              {stats.map((campaign) => {
                const rate =
                  campaign.total > 0 ? ((campaign.opened / campaign.total) * 100).toFixed(1) : "0";
                const date = new Date(campaign.sentAt).toLocaleString("pt-BR", {
                  timeZone: "America/Sao_Paulo",
                });

                return (
                  <motion.div
                    key={campaign.campaignId}
                    whileHover={{ y: -2 }}
                    className="rounded-3xl bg-white p-6"
                    style={{
                      boxShadow: "0 10px 40px -12px rgba(124, 111, 240, 0.15)",
                      border: "1px solid #e7ebf5",
                    }}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="text-[15px] font-semibold" style={{ color: "#1e2233" }}>
                          {campaign.subject}
                        </h3>
                        <div
                          className="mt-1 flex items-center gap-2 text-xs"
                          style={{ color: "#8b93a7" }}
                        >
                          <Clock size={12} />
                          {date}
                        </div>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          background: "linear-gradient(135deg, #e0e7ff, #ede9fe)",
                          color: "#7c6ff0",
                        }}
                      >
                        {rate}% abertos
                      </span>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ background: "#8ec5fc" }} />
                        <span className="text-xs" style={{ color: "#8b93a7" }}>
                          {campaign.total} enviados
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ background: "#86efac" }} />
                        <span className="text-xs" style={{ color: "#8b93a7" }}>
                          {campaign.opened} abertos
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ background: "#fca5a5" }} />
                        <span className="text-xs" style={{ color: "#8b93a7" }}>
                          {campaign.pending} pendentes
                        </span>
                      </div>
                    </div>

                    {/* Barra de progresso */}
                    <div
                      className="mt-3 h-2 w-full overflow-hidden rounded-full"
                      style={{ background: "#e7ebf5" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rate}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #8ec5fc, #86efac)" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
