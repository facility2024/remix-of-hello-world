import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ChatBot } from "@/components/ChatBot";

import { TestimonialCard } from "@/components/ui/testimonial-cards";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import slide1Asset from "@/assets/slide-1.png.asset.json";
import slide2Asset from "@/assets/slide-2.png.asset.json";
import slide3Asset from "@/assets/slide-3.png.asset.json";
import slide4Asset from "@/assets/slide-4.png.asset.json";
import slide5Asset from "@/assets/slide-5.png.asset.json";
import logoMoncocAsset from "@/assets/logo-moncoc.png.asset.json";
import logoSindicondAsset from "@/assets/logo-sindicond.png.asset.json";
import logoSimbaAsset from "@/assets/logo-simba.png.asset.json";
import logoCemAsset from "@/assets/logo-cem.png.asset.json";
import logoInovaAsset from "@/assets/logo-inova.png.asset.json";
import logoVivoAsset from "@/assets/logo-vivo.png.asset.json";
import logoClaroAsset from "@/assets/logo-claro.png.asset.json";
import logoOiAsset from "@/assets/logo-oi.png.asset.json";
import logoFacilityAsset from "@/assets/logo-facility.png.asset.json";
import logoEhsAsset from "@/assets/logo-ehs.png.asset.json";
const slide1 = slide1Asset.url;
const slide2 = slide2Asset.url;
const slide3 = slide3Asset.url;
const slide4 = slide4Asset.url;
const slide5 = slide5Asset.url;
const logoMoncoc = logoMoncocAsset.url;
const logoSindicond = logoSindicondAsset.url;
const logoSimba = logoSimbaAsset.url;
const logoCem = logoCemAsset.url;
const logoInova = logoInovaAsset.url;
const logoVivo = logoVivoAsset.url;
const logoClaro = logoClaroAsset.url;
const logoOi = logoOiAsset.url;
const logoFacility = logoFacilityAsset.url;
const logoEhs = logoEhsAsset.url;
import equipeMarcosAsset from "@/assets/equipe-marcos.png.asset.json";
import equipeLeandroAsset from "@/assets/equipe-leandro.png.asset.json";
import equipePedroAsset from "@/assets/equipe-pedro.png.asset.json";
import equipeHiuryAsset from "@/assets/equipe-hiury.png.asset.json";
import portraitAsset from "@/assets/facility-portrait.png.asset.json";
const equipeMarcos = equipeMarcosAsset.url;
const equipeLeandro = equipeLeandroAsset.url;
const equipePedro = equipePedroAsset.url;
const equipeHiury = equipeHiuryAsset.url;



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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="font-heading text-2xl tracking-tight text-foreground">
          <span className="italic text-primary">Facility</span> Software Brasil
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
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03]"
          >
            Solicitar Apresentação
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-foreground"
          aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={open}
        >

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
            className="mt-2 block rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Solicitar Apresentação
          </a>
        </motion.div>
      )}
    </header>
  );
}

/* ─────────── HERO (BENTO) ─────────── */
function Hero() {
  return (
    <section className="px-4 pt-28 pb-6 md:px-8 lg:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-12">
        {/* Bloco principal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl border border-border/30 bg-card p-8 md:col-span-8 md:p-14"
        >
          <span className="absolute left-8 top-8 text-xs font-medium uppercase italic tracking-[0.25em] text-primary md:left-14 md:top-12">
            Desde 2008 · Agência &amp; Software House
          </span>
          <h1 className="font-heading mt-16 text-5xl italic leading-[0.92] tracking-tight text-foreground sm:text-6xl md:text-8xl">
            Engenharia <br />
            <span className="text-primary">Criativa</span> de <br />
            Softwares.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Mais de 16 anos criando marketing, software, automações, sistemas e aplicativos para
            empresas que querem crescer com estratégia, tecnologia e performance.
          </p>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
        </motion.div>

        {/* Bloco CTA ember */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="flex flex-col justify-between gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:col-span-4"
        >
          <div className="flex justify-end">
            <ArrowRight size={44} strokeWidth={1.5} />
          </div>
          <div>
            <p className="mb-6 text-xl font-medium leading-tight">
              Pronto para escalar sua operação digital com precisão técnica e design de elite?
            </p>
            <a
              href="#contato"
              className="inline-flex rounded-full bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-card"
            >
              Fale Conosco
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


/* ─────────── CARD STACK SHOWCASE ─────────── */
const showcaseItems: CardStackItem[] = [
  {
    id: 1,
    title: "App de Academias e Saúde",
    description: "Plataforma completa com treinos funcionais e análise nutricional inteligente",
    imageSrc: slide1,
  },
  {
    id: 2,
    title: "Sistema para Agricultura Inteligente",
    description: "Tecnologia de ponta para o agronegócio com gestão eficiente e sustentável",
    imageSrc: slide2,
  },
  {
    id: 3,
    title: "Aplicativo de Busca de Ofertas",
    description: "Busca inteligente de ofertas e promoções com tecnologia avançada",
    imageSrc: slide3,
  },
  {
    id: 4,
    title: "Sistema de Notícias Inteligente",
    description: "Portal de notícias completo com transmissões ao vivo e categorias diversas",
    imageSrc: slide4,
  },
  {
    id: 5,
    title: "Avaliação de Riscos Psicossociais",
    description: "Plataforma para identificar e gerenciar riscos psicossociais no trabalho conforme NR-01",
    imageSrc: slide5,
  },
];

function ShowcaseCarousel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="py-8 lg:py-16 bg-foreground/[0.03]">
      <div className="mx-auto w-full max-w-6xl px-2 sm:px-4">
        <CardStack
          items={showcaseItems}
          initialIndex={0}
          autoAdvance
          intervalMs={3000}
          pauseOnHover
          showDots
          cardWidth={isMobile ? 300 : 480}
          cardHeight={isMobile ? 200 : 280}
          maxVisible={isMobile ? 3 : 7}
          overlap={isMobile ? 0.55 : 0.48}
          spreadDeg={isMobile ? 30 : 48}
          depthPx={isMobile ? 80 : 140}
        />
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
            <h2 className="font-heading text-4xl italic tracking-tight text-foreground sm:text-5xl">
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
                  className="group rounded-3xl border border-border/40 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
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
            <h2 className="font-heading text-4xl italic tracking-tight text-foreground sm:text-5xl">
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
              <div className="group h-full rounded-3xl border border-border/40 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
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
            <h2 className="font-heading text-4xl italic tracking-tight text-foreground sm:text-5xl">
              Por que escolher a Facility Software Brasil?
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((d, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.06}>
              <div className="group flex items-center gap-4 rounded-3xl border border-border/40 bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
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

/* ─────────── LOGO CAROUSEL ─────────── */
const clientLogos = [
  { src: logoMoncoc, alt: "Moncoc" },
  { src: logoSindicond, alt: "Sindicond" },
  { src: logoSimba, alt: "Simba Safari" },
  { src: logoCem, alt: "Lojas CEM" },
  { src: logoInova, alt: "Rede Inova Drogarias" },
  { src: logoVivo, alt: "Vivo" },
  { src: logoClaro, alt: "Claro" },
  { src: logoOi, alt: "Oi" },
  { src: logoEhs, alt: "EHS Universidade" },
];

function LogoCarousel() {
  // Duplicate logos for seamless infinite scroll
  const logos = [...clientLogos, ...clientLogos, ...clientLogos];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Purple blur glow effect */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center mb-12">
        <ScrollReveal>
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Apresentação
          </span>
          <h2 className="font-heading text-4xl italic tracking-tight text-foreground sm:text-5xl">
            Conheça nossa apresentação
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Assista ao vídeo e entenda como a Facility Software Brasil pode estruturar sua presença
            digital, sua operação e suas soluções tecnológicas.
          </p>
        </ScrollReveal>
      </div>

      {/* Infinite scrolling logo strip — right to left */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-16 w-32 sm:h-20 sm:w-40 flex items-center justify-center rounded-2xl bg-white/90 p-3 shadow-sm grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second strip — left to right */}
      <div className="relative w-full overflow-hidden mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex items-center gap-16 w-max"
          animate={{ x: ["-33.33%", "0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-16 w-32 sm:h-20 sm:w-40 flex items-center justify-center rounded-2xl bg-white/90 p-3 shadow-sm grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────── VÍDEO ─────────── */
function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal direction="up" delay={0.1}>
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-foreground/5 shadow-xl aspect-video"
          >
            {inView && (
              <iframe
                src="https://iframe.mediadelivery.net/embed/504378/deb891a1-455d-467f-97a1-877411b9febe?autoplay=true&muted=true&preload=true"
                loading="lazy"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
              />
            )}
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
    avatar: "https://s2.glbimg.com/_Ps5nilp1W4GKW990cqZ9a-ETKo=/940x523/e.glbimg.com/og/ed/f/original/2017/01/10/marissa_mayer_2011_interview.jpg",
  },
  {
    id: 2,
    testimonial:
      "Meu chefe acha que eu sei o que estou fazendo. Honestamente, foi a Facility que estruturou tudo pra gente.",
    author: "Carlos R. - Gerente de Produto @ StartupX",
    avatar: "https://img.freepik.com/fotos-gratis/homem-sorridente-posando-para-cv-vista-frontal_23-2149927616.jpg",
  },
  {
    id: 3,
    testimonial:
      "Não acredito que conseguimos tanto em tão pouco tempo. O sistema que a Facility criou mudou nossa operação por completo.",
    author: "Amanda F. - CEO @ NovaSoluções",
    avatar: "https://static.stealthelook.com.br/wp-content/uploads/2022/07/mulheres-negras-latino-americanas-e-caribenhas-que-voce-precisa-conhecer-negra-li-20220722201812.jpg",
  },
];

function Depoimentos() {
  const [positions, setPositions] = useState(["front", "middle", "back"]);

  const handleShuffle = useCallback(() => {
    setPositions((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(handleShuffle, 3000);
    return () => clearInterval(interval);
  }, [handleShuffle]);

  return (
    <section className="py-16 lg:py-24 bg-card overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              Depoimentos
            </span>
            <h2 className="font-heading text-4xl italic tracking-tight text-foreground sm:text-5xl">
              O que nossos clientes dizem
            </h2>
            <p className="mt-4 text-muted-foreground">
              Arraste o card ou aguarde a troca automática.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex justify-center px-4 py-8">
          <div className="relative h-[400px] w-[min(300px,80vw)] sm:h-[450px] sm:w-[350px]">
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
            <h2 className="font-heading text-4xl italic tracking-tight text-foreground sm:text-5xl">
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
            <h2 className="font-heading text-4xl italic tracking-tight text-foreground sm:text-5xl">
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
                    <label htmlFor="contato-nome" className="text-sm font-medium text-foreground mb-1.5 block">
                      Nome *
                    </label>
                    <input
                      id="contato-nome"
                      name="nome"
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
                    <label htmlFor="contato-email" className="text-sm font-medium text-foreground mb-1.5 block">
                      E-mail *
                    </label>
                    <input
                      id="contato-email"
                      name="email"
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
                    <label htmlFor="contato-whatsapp" className="text-sm font-medium text-foreground mb-1.5 block">
                      WhatsApp *
                    </label>
                    <input
                      id="contato-whatsapp"
                      name="whatsapp"
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
                    <label htmlFor="contato-empresa" className="text-sm font-medium text-foreground mb-1.5 block">
                      Empresa
                    </label>
                    <input
                      id="contato-empresa"
                      name="empresa"
                      value={form.empresa}
                      onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                      className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contato-mensagem" className="text-sm font-medium text-foreground mb-1.5 block">
                    Mensagem
                  </label>
                  <textarea
                    id="contato-mensagem"
                    name="mensagem"
                    rows={4}
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Descreva brevemente o que precisa..."
                  />

                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 sm:w-auto"
                >
                  Enviar Solicitação
                </button>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="space-y-6 rounded-3xl border border-border/40 bg-card p-8">
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
          Desde 2008 · © 2026 Facility Software Brasil. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

/* ─────────── EQUIPE FACILITY ─────────── */
function EquipeFacility() {
  const team = [
    { name: "Otavio", role: "CEO & Desenvolvedor", img: portraitAsset.url },
    { name: "Marcos", role: "Comercial", img: equipeMarcos },
    { name: "Leandro Alves", role: "Desenvolvedor", img: equipeLeandro },
    
    
  ];


  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
          Equipe Facility
        </span>
        <h2 className="font-heading text-4xl italic tracking-tight text-foreground sm:text-5xl lg:text-5xl">
          Pessoas que fazem acontecer
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Conheça quem está por trás dos projetos que entregamos todos os dias.
        </p>

        <div
          className="mt-12 relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="flex w-max gap-10 animate-[equipe-marquee_28s_linear_infinite] mx-auto">
            {Array.from({ length: 6 }).flatMap((_, r) =>
              team.map((p, i) => (
                <div key={`${p.name}-${r}-${i}`} className="flex flex-col items-center shrink-0 w-40">
                  <div className="h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden ring-2 ring-primary/20 shadow-lg">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-foreground">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.role}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <style>{`
          @keyframes equipe-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}


/* ─────────── CTA BAND ─────────── */
function CtaBand() {
  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-3xl bg-primary p-10 text-center text-primary-foreground md:flex-row md:p-14 md:text-left">
        <div className="space-y-2">
          <h2 className="font-heading text-4xl italic leading-none md:text-6xl">
            Vamos construir algo extraordinário?
          </h2>
          <p className="font-medium text-primary-foreground/70">
            Entre em contato e inicie seu projeto hoje mesmo.
          </p>
        </div>
        <a
          href="#contato"
          className="inline-block shrink-0 rounded-full bg-background px-10 py-5 text-lg font-medium text-foreground transition-transform hover:scale-105"
        >
          Iniciar Projeto
        </a>
      </div>
    </section>
  );
}


function LandingPage() {

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <ShowcaseCarousel />
      <QuemSomos />
      <Servicos />
      <Diferenciais />
      <LogoCarousel />
      <VideoSection />
      <Depoimentos />
      <Processo />
      <EquipeFacility />
      <CtaBand />
      <Contato />
      <Footer />
      <ChatBot />
    </div>
  );

}

const SITE_URL = "https://agenciafacility.lovable.app";
const SITE_TITLE = "Facility Software Brasil — Software House e Agência Digital";
const SITE_DESC =
  "Há 16 anos criando sistemas, aplicativos, automações e marketing de performance para empresas que querem escalar com tecnologia de alto padrão.";
const SITE_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/C3m9qC4JI7d4LBRG8QCRDGqpqhV2/social-images/social-1777501791875-WhatsApp_Image_2026-04-29_at_19.21.08.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESC },
      { name: "keywords", content: "software house, agência digital, desenvolvimento de sistemas, aplicativos, automação, gestão de tráfego, marketing digital, Facility Software Brasil" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: "Facility Software Brasil" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: SITE_IMAGE },
      { property: "og:image:alt", content: "Facility Software Brasil — soluções digitais" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESC },
      { name: "twitter:image", content: SITE_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "Facility Software Brasil",
              alternateName: "Agência Facility",
              url: `${SITE_URL}/`,
              logo: `${SITE_URL}/assets/logo-facility.png`,
              image: SITE_IMAGE,
              description: SITE_DESC,
              foundingDate: "2008",
              areaServed: "BR",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "atendimento comercial",
                  telephone: "+5519988697308",
                  availableLanguage: ["Portuguese"],
                },
                {
                  "@type": "ContactPoint",
                  contactType: "suporte técnico",
                  telephone: "+5511982969676",
                  availableLanguage: ["Portuguese"],
                },
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: "Facility Software Brasil",
              inLanguage: "pt-BR",
              description: SITE_DESC,
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}/#service`,
              name: "Facility Software Brasil",
              url: `${SITE_URL}/`,
              image: SITE_IMAGE,
              priceRange: "$$",
              areaServed: "Brasil",
              parentOrganization: { "@id": `${SITE_URL}/#organization` },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Serviços",
                itemListElement: [
                  "Desenvolvimento de sistemas web",
                  "Desenvolvimento de aplicativos",
                  "Automação de processos",
                  "Marketing digital e gestão de tráfego",
                  "Criação de sites e landing pages",
                ].map((s) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: s },
                })),
              },
            },
          ],
        }),
      },
    ],
  }),
  component: LandingPage,
});

