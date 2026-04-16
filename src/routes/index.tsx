import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CubeLoader } from "@/components/ui/cube-loader";
import { SplineHero } from "@/components/ui/spline";
import { TestimonialCard } from "@/components/ui/testimonial-cards";
import {
  Megaphone,
  Globe,
  Settings,
  Smartphone,
  Bot,
  Palette,
  Mail,
  Puzzle,
  CheckCircle,
  Play,
  ArrowRight,
  Menu,
  X,
  MapPin,
  MailIcon,
  Phone,
  ChevronRight,
  Lightbulb,
  Target,
  Code2,
  Rocket,
  Users,
  Award,
  Zap,
  Shield,
  BarChart3,
  Layers,
  Clock,
  Star,
} from "lucide-react";

/* Landing page components below, Route at bottom */

/* ─────────── HEADER ─────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Quem Somos", href: "#quem-somos" },
    { label: "Soluções", href: "#solucoes" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Processo", href: "#processo" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold tracking-tight text-foreground">
          <span className="text-primary">Facility</span> Software Brasil
        </a>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Solicitar Apresentação
          </a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-background border-b border-border px-6 pb-6"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-foreground hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Solicitar Apresentação
          </a>
        </motion.div>
      )}
    </header>
  );
}

/* ─────────── HERO ─────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* BG decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-20 h-80 w-80 rounded-full bg-primary/8 blur-2xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-0 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
            Agência &amp; Software House
          </span>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Transformamos ideias em{" "}
            <span className="text-primary">soluções digitais</span> de alto impacto
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Mais de 16 anos criando soluções em marketing, software, automações, sistemas e
            aplicativos para empresas que desejam crescer com estratégia, tecnologia e performance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Falar com Especialista <ArrowRight size={16} />
            </a>
            <a
              href="#solucoes"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-foreground/15 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
            >
              Conhecer Soluções
            </a>
          </div>
        </motion.div>

        {/* Visual composition */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg aspect-square">
            {/* Floating cards */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-8 rounded-2xl bg-card p-5 shadow-xl border border-border/50"
            >
              <Code2 className="text-primary mb-2" size={28} />
              <p className="text-xs font-semibold text-foreground">Software</p>
              <p className="text-xs text-muted-foreground">Sob medida</p>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 right-4 rounded-2xl bg-primary p-5 shadow-xl shadow-primary/30"
            >
              <BarChart3 className="text-primary-foreground mb-2" size={28} />
              <p className="text-xs font-semibold text-primary-foreground">Performance</p>
              <p className="text-xs text-primary-foreground/70">Digital</p>
            </motion.div>

            <motion.div
              animate={{ y: [-5, 10, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 left-12 rounded-2xl bg-card p-5 shadow-xl border border-border/50"
            >
              <Zap className="text-primary mb-2" size={28} />
              <p className="text-xs font-semibold text-foreground">Automação</p>
              <p className="text-xs text-muted-foreground">Inteligente</p>
            </motion.div>

            <motion.div
              animate={{ y: [10, -5, 10] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 right-16 rounded-2xl bg-foreground p-5 shadow-xl"
            >
              <Megaphone className="text-background mb-2" size={28} />
              <p className="text-xs font-semibold text-background">Marketing</p>
              <p className="text-xs text-background/60">Estratégico</p>
            </motion.div>

            {/* Central glow */}
            <div className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute inset-0 m-auto h-32 w-32 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 m-auto h-52 w-52 rounded-full border border-primary/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── QUEM SOMOS ─────────── */
function QuemSomos() {
  const stats = [
    { icon: Clock, label: "+16 anos", desc: "de mercado" },
    { icon: Layers, label: "Sob medida", desc: "Projetos personalizados" },
    { icon: Users, label: "Consultivo", desc: "Atendimento estratégico" },
    { icon: Rocket, label: "Escalável", desc: "Soluções que crescem" },
  ];

  return (
    <section id="quem-somos" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-start">
          <ScrollReveal direction="left">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Sobre nós
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Quem Somos
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A Facility Software Brasil é uma agência e software house com mais de 16 anos de
                atuação no mercado, entregando soluções em marketing, tecnologia, desenvolvimento de
                sistemas, automações inteligentes, aplicativos e presença digital para empresas de
                diversos segmentos.
              </p>
              <p>
                Fundada com o propósito de unir criatividade, estratégia e tecnologia, a Facility
                Software Brasil atende clientes em diferentes regiões do Brasil e também no exterior,
                sempre com foco em agilidade, pontualidade, inovação e resultado.
              </p>
              <p>
                Nossa missão é desenvolver projetos modernos, funcionais e escaláveis, ajudando
                empresas a fortalecerem sua marca, automatizarem processos, venderem mais e criarem
                uma presença digital sólida e profissional.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
                >
                  <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon size={22} />
                  </div>
                  <p className="font-bold text-foreground">{s.label}</p>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────── SERVIÇOS ─────────── */
const services = [
  {
    icon: Megaphone,
    title: "Marketing Digital e Posicionamento",
    desc: "Estratégias para fortalecer marcas, atrair clientes, aumentar autoridade e transformar presença digital em resultado real.",
  },
  {
    icon: Globe,
    title: "Criação de Sites e Landing Pages",
    desc: "Desenvolvimento de páginas profissionais, persuasivas, responsivas e preparadas para conversão.",
  },
  {
    icon: Settings,
    title: "Sistemas Personalizados",
    desc: "Criamos sistemas sob medida para empresas, restaurantes, clínicas, prestadores de serviço e diversos segmentos.",
  },
  {
    icon: Smartphone,
    title: "Aplicativos PWA",
    desc: "Desenvolvemos aplicativos modernos com tecnologia PWA, com acesso rápido, excelente performance e menor custo operacional.",
  },
  {
    icon: Bot,
    title: "Chatbots e Automações com IA",
    desc: "Soluções inteligentes para atendimento automático, captação de leads, organização de processos e escala comercial.",
  },
  {
    icon: Palette,
    title: "Mídias Sociais e Conteúdo",
    desc: "Criação de artes, vídeos, identidade visual, campanhas e materiais para Instagram, Facebook, LinkedIn, YouTube, TikTok e outras plataformas.",
  },
  {
    icon: Mail,
    title: "E-mail Marketing e Campanhas no WhatsApp",
    desc: "Estratégias de comunicação direta para relacionamento, ativação de base e geração de vendas.",
  },
  {
    icon: Puzzle,
    title: "Soluções sob medida",
    desc: "Entendemos sua necessidade, desenhamos a estratégia e entregamos a estrutura ideal para o seu projeto.",
  },
];

function Servicos() {
  return (
    <section id="solucoes" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Serviços
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Nossas Soluções
            </h2>
            <p className="mt-4 text-muted-foreground">
              Serviços completos para empresas que desejam crescer com estrutura, tecnologia e
              presença digital.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon size={24} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── DIFERENCIAIS ─────────── */
const differentials = [
  { icon: Users, label: "Atendimento consultivo" },
  { icon: Puzzle, label: "Projetos personalizados" },
  { icon: Award, label: "Visual profissional de alto padrão" },
  { icon: Zap, label: "Tecnologia aplicada ao crescimento" },
  { icon: Smartphone, label: "Estrutura responsiva e moderna" },
  { icon: BarChart3, label: "Foco em performance e resultado" },
  { icon: Clock, label: "Entrega com agilidade e organização" },
  { icon: Star, label: "Experiência em múltiplos segmentos" },
];

function Diferenciais() {
  return (
    <section id="diferenciais" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Diferenciais
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Por que escolher a Facility Software Brasil?
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((d, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.06}>
              <div className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <d.icon size={20} />
                </div>
                <span className="font-semibold text-sm text-foreground">{d.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── VÍDEO ─────────── */
function VideoSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Apresentação
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Conheça nossa apresentação
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Assista ao vídeo e entenda como a Facility Software Brasil pode estruturar sua presença
              digital, sua operação e suas soluções tecnológicas.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-foreground/5 shadow-xl aspect-video flex items-center justify-center group cursor-pointer">
            {/* ═══════ SUBSTITUIR AQUI O LINK DO VÍDEO ═══════
                 Para incorporar um vídeo do YouTube, substitua o conteúdo abaixo por:
                 <iframe
                   src="https://www.youtube.com/embed/SEU_VIDEO_ID"
                   className="absolute inset-0 w-full h-full"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                 />
                 ═══════════════════════════════════════════════ */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
                <Play size={32} className="ml-1" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Clique para assistir</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─────────── DEPOIMENTOS ─────────── */
const testimonials = [
  {
    id: 1,
    testimonial:
      "A Facility transformou completamente nossa presença digital. O resultado superou todas as expectativas. Recomendo de olhos fechados.",
    author: "Juliana M. - Diretora de Marketing @ TechBR",
  },
  {
    id: 2,
    testimonial:
      "Meu chefe acha que eu sei o que estou fazendo. Honestamente, foi a Facility que estruturou tudo pra gente.",
    author: "Carlos R. - Gerente de Produto @ StartupX",
  },
  {
    id: 3,
    testimonial:
      "Não acredito que conseguimos tanto em tão pouco tempo. O sistema que a Facility criou mudou nossa operação por completo.",
    author: "Amanda F. - CEO @ NovaSoluções",
  },
];

function Depoimentos() {
  const [positions, setPositions] = useState(["front", "middle", "back"]);

  const handleShuffle = () => {
    const newPositions = [...positions];
    newPositions.unshift(newPositions.pop()!);
    setPositions(newPositions);
  };

  return (
    <section className="py-24 lg:py-32 bg-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Depoimentos
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              O que nossos clientes dizem
            </h2>
            <p className="mt-4 text-slate-400">
              Arraste o card para ver mais depoimentos.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid place-content-center px-8 py-8">
          <div className="relative -ml-[100px] h-[450px] w-[350px] md:-ml-[175px]">
            {testimonials.map((t, index) => (
              <TestimonialCard
                key={t.id}
                {...t}
                handleShuffle={handleShuffle}
                position={positions[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── PROCESSO ─────────── */
const steps = [
  {
    icon: Lightbulb,
    title: "Entendimento da necessidade",
    desc: "Ouvimos sua demanda, entendemos o cenário e mapeamos oportunidades para o projeto.",
  },
  {
    icon: Target,
    title: "Planejamento estratégico",
    desc: "Definimos escopo, cronograma, tecnologias e a melhor abordagem para o resultado desejado.",
  },
  {
    icon: Code2,
    title: "Criação e desenvolvimento",
    desc: "Nossa equipe projeta, desenvolve e refina cada detalhe com foco em qualidade e usabilidade.",
  },
  {
    icon: Rocket,
    title: "Entrega, ajustes e evolução",
    desc: "Entregamos o projeto, realizamos ajustes finais e acompanhamos a evolução do produto.",
  },
];

function Processo() {
  return (
    <section id="processo" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Processo
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Como funciona nosso processo
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1}>
              <div className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <s.icon size={28} />
                </div>
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                  {i + 1}
                </span>
                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── FORMULÁRIO ─────────── */
function Contato() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    mensagem: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "E-mail inválido";
    if (!form.whatsapp.trim()) e.whatsapp = "WhatsApp é obrigatório";
    return e;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <section id="contato" className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Contato
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Solicite uma apresentação
            </h2>
            <p className="mt-4 text-muted-foreground">
              Preencha os dados abaixo e nossa equipe entrará em contato.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-5">
          <ScrollReveal direction="left" className="lg:col-span-3">
            {sent ? (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-12 text-center">
                <CheckCircle className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold text-foreground">Solicitação enviada!</h3>
                <p className="mt-2 text-muted-foreground">
                  Entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Nome *
                    </label>
                    <input
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Seu nome completo"
                    />
                    {errors.nome && (
                      <p className="mt-1 text-xs text-destructive">{errors.nome}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      WhatsApp *
                    </label>
                    <input
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="(00) 00000-0000"
                    />
                    {errors.whatsapp && (
                      <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Empresa
                    </label>
                    <input
                      value={form.empresa}
                      onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Descreva brevemente o que precisa..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 sm:w-auto"
                >
                  Enviar Solicitação
                </button>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="space-y-6 rounded-2xl border border-border/60 bg-card p-8">
              <h3 className="font-bold text-foreground text-lg">Informações de contato</h3>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 shrink-0 text-primary" size={18} />
                <span className="text-muted-foreground">
                  AV Paulista 1080, São Paulo, 9ª sala 907
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MailIcon className="mt-0.5 shrink-0 text-primary" size={18} />
                <span className="text-muted-foreground">otaviogcasartelli@gmail.com</span>
              </div>
              <div className="mt-8 rounded-xl bg-primary/5 p-5 border border-primary/10">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Horário de atendimento:</strong>
                  <br />
                  Segunda a Sexta, 9h às 18h
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────── FOOTER ─────────── */
function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-background">
              <span className="text-primary">Facility</span> Software Brasil
            </p>
            <p className="mt-3 text-sm leading-relaxed text-background/60">
              Soluções em marketing, software, automação, sistemas e aplicativos com estrutura
              profissional e visão de crescimento.
            </p>
          </div>
          <div>
            <p className="font-semibold text-background mb-3">Links rápidos</p>
            <div className="space-y-2">
              {[
                { label: "Quem Somos", href: "#quem-somos" },
                { label: "Soluções", href: "#solucoes" },
                { label: "Diferenciais", href: "#diferenciais" },
                { label: "Processo", href: "#processo" },
                { label: "Contato", href: "#contato" },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="block text-sm text-background/50 transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-background mb-3">Contato</p>
            <div className="space-y-2 text-sm text-background/50">
              <p>AV Paulista 1080, São Paulo, 9ª sala 907</p>
              <p>otaviogcasartelli@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-background/10 pt-6 text-center text-xs text-background/40">
          © {new Date().getFullYear()} Facility Software Brasil. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

/* ─────────── PAGE ─────────── */
function LandingPage() {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  if (loading) {
    return <CubeLoader duration={4000} onComplete={handleComplete} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <SplineHero />
      <Header />
      <Hero />
      <QuemSomos />
      <Servicos />
      <Diferenciais />
      <VideoSection />
      <Depoimentos />
      <Processo />
      <Contato />
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Facility Software Brasil — Soluções Digitais de Alto Impacto" },
      {
        name: "description",
        content:
          "Mais de 16 anos criando soluções em marketing, software, automações, sistemas e aplicativos. Agência e software house de alto padrão.",
      },
      { property: "og:title", content: "Facility Software Brasil — Soluções Digitais de Alto Impacto" },
      {
        property: "og:description",
        content:
          "Mais de 16 anos criando soluções em marketing, software, automações, sistemas e aplicativos.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});
