import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import chatAvatar from "@/assets/chatbot-avatar.png";
import waAvatar from "@/assets/whatsapp-avatar.png";

type Msg =
  | { id: string; from: "bot"; type: "text"; text: string }
  | { id: string; from: "bot"; type: "wa-button" }
  | { id: string; from: "user"; type: "text"; text: string };

type Step = "greet" | "awaitFirst" | "awaitName" | "done";

const WA_NUMBER = "5511982969676";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Facility Software Brasil e gostaria de falar com um atendente.",
)}`;

const uid = () => Math.random().toString(36).slice(2, 9);

export function ChatBot() {
  const [showBubble, setShowBubble] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("greet");
  const [userName, setUserName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Aparece após 10s
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(true), 10000);
    return () => clearTimeout(t);
  }, []);

  // Autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  type BotPayload = { type: "text"; text: string } | { type: "wa-button" };
  const sendBot = async (msgs: BotPayload[], delay = 1200) => {
    for (const m of msgs) {
      setTyping(true);
      await new Promise((r) => setTimeout(r, delay));
      setTyping(false);
      setMessages((prev) => [...prev, { ...m, id: uid(), from: "bot" } as Msg]);
    }
  };

  const openChat = async () => {
    setOpen(true);
    setShowBubble(false);
    if (messages.length === 0) {
      setStep("awaitFirst");
      await sendBot([{ type: "text", text: "Olá! Posso ajudar? 😊" }], 600);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || step === "done") return;
    setInput("");
    setMessages((prev) => [...prev, { id: uid(), from: "user", type: "text", text }]);

    if (step === "awaitFirst") {
      setStep("awaitName");
      await sendBot([
        {
          type: "text",
          text: "Prazer! Sou a Aluna, uma IA de atendimento para sites e sistemas. Bom, vamos lá! Antes, qual é o seu nome?",
        },
      ]);
    } else if (step === "awaitName") {
      const name = text.split(" ")[0];
      setUserName(name);
      setStep("done");
      await sendBot([
        { type: "text", text: `Prazer, ${name}! 💜` },
        {
          type: "text",
          text: "Vou enviar aqui o botão e é só você clicar que já será direcionado para um dos nossos atendentes.",
        },
        { type: "wa-button" },
        { type: "text", text: "Obrigada e tenha um dia maravilhoso! ✨" },
      ]);
    }
  };

  return (
    <>
      {/* Avatar flutuante + bolha */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed bottom-6 right-6 z-[60] flex items-end gap-2"
          >
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  className="mb-2 max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm font-medium text-foreground shadow-xl"
                >
                  Olá! Posso ajudar com uma mãozinha? 💜
                  <button
                    onClick={() => setShowBubble(false)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/80 text-white shadow"
                    aria-label="Fechar"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChat}
              className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-primary shadow-2xl ring-4 ring-primary/30"
              aria-label="Abrir chat"
            >
              <img src={chatAvatar} alt="Aluna - Atendente IA" className="h-full w-full object-cover" />
              <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat aberto */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[60] flex h-[520px] w-[340px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80 p-3 text-white">
              <img src={chatAvatar} alt="Aluna" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold">Aluna</p>
                <p className="text-xs opacity-90">Atendente IA • online</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 hover:bg-white/20"
                aria-label="Fechar chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mensagens */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-3">
              {messages.map((m) => {
                if (m.from === "bot" && m.type === "wa-button") {
                  return (
                    <a
                      key={m.id}
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-2xl bg-green-500 p-3 text-white shadow-lg transition hover:bg-green-600"
                    >
                      <img
                        src={waAvatar}
                        alt="Atendente WhatsApp"
                        className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-bold">Falar com atendente</p>
                        <p className="text-xs opacity-90">Abrir WhatsApp</p>
                      </div>
                    </a>
                  );
                }
                return (
                  <div
                    key={m.id}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                        m.from === "user"
                          ? "rounded-br-sm bg-primary text-white"
                          : "rounded-bl-sm bg-white text-foreground shadow-sm"
                      }`}
                    >
                      {m.type === "text" && m.text}
                    </div>
                  </div>
                );
              })}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 border-t border-border bg-background p-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={step === "done" ? "Conversa encerrada" : "Digite sua mensagem..."}
                disabled={step === "done" || typing}
                className="flex-1 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm outline-none focus:border-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || step === "done" || typing}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary/90 disabled:opacity-50"
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
