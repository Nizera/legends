"use client";

import { Suspense } from "react";
import { Camera, Shield, Truck, Users, Zap, CheckCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/components/FacebookPixel";
import Chatbot from "@/components/Chatbot";

function PageContent() {
  const handleCTAClick = () => {
    trackWhatsAppClick();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 md:px-6">
          <a href="/" className="flex items-center gap-2 font-heading font-bold text-lg">
            Leilão <span className="font-fifa text-primary">Legends</span>
          </a>
          <nav className="ml-auto flex items-center gap-2">
            <a
              href="https://www.instagram.com/oscarasdaslegends/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Camera className="size-4" />
              @oscarasdaslegends
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6 py-12 md:py-20">
        <section className="flex flex-col items-center gap-6 text-center animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium text-muted-foreground bg-card/50 shadow-sm">
            Entregamos para todo o Brasil · Leilão Diário
          </span>
          <h1 className="max-w-4xl text-balance font-heading font-bold tracking-tight text-3xl md:text-5xl lg:text-6xl leading-tight">
            Fazemos leilões de <span className="text-primary">legends, crumples, quadros, álbuns, cards e brindes</span> para clientes novos!
          </h1>
          <p className="max-w-2xl text-balance text-muted-foreground md:text-lg">
            Participe do nosso grupo oficial no WhatsApp, dê seus lances ao vivo e arremate peças exclusivas de colecionador com envio garantido.
          </p>
        </section>

        <section className="mt-8 text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <a
            href="https://chat.whatsapp.com/EYD5CmJ0Oer4aeM0zQ9mqu"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCTAClick}
            className="group relative inline-flex items-center justify-center gap-3 w-full max-w-lg bg-primary text-primary-foreground font-heading text-lg md:text-xl tracking-[0.02em] uppercase no-underline py-5 px-8 rounded-2xl border border-primary/40 shadow-[0_10px_30px_rgba(132,255,0,0.2)] hover:shadow-[0_15px_45px_rgba(132,255,0,0.35)] hover:scale-[1.02] hover:border-primary/60 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2.5 font-bold">
              <Zap className="size-6 text-primary-foreground animate-bounce" />
              ENTRAR NO GRUPO VIP AGORA!
            </span>
          </a>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Grupo 100% Gratuito
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5 text-foreground font-medium">
              <Truck className="size-4 text-primary" />
              Entrega para Todo o Brasil
            </span>
            <span className="text-border hidden sm:inline">|</span>
            <span>Vagas Abertas</span>
          </div>
        </section>

        <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-bold">
              Regras do jogo
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { num: 1, title: "Lances ao vivo no grupo", desc: "Cada figurinha tem lance inicial e horário de início/fim. Se alguém dá lance no último minuto, o tempo estende 3min.", icon: Zap },
              { num: 2, title: "Pagamento via Pix com comprovante", desc: "Quem arrematou paga via Pix e envia o comprovante ao suporte.", icon: Shield },
              { num: 3, title: "Envio combinado após confirmação", desc: "Com o pagamento confirmado, o envio é combinado até a entrega ser concluída.", icon: Truck },
            ].map((step, i) => (
              <div
                key={step.num}
                className="flex gap-3.5 items-start bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/30 hover:bg-card/80 transition-all duration-300 animate-fade-up group"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <div className="flex-none w-10 h-10 rounded-lg bg-primary/20 text-primary font-heading text-base flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-[0_0_12px_oklch(0.65_0.15_85_/0.3)] transition-all duration-300">
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="size-5 text-primary" />
                    </span>
                    <h3 className="font-heading text-sm text-foreground font-bold tracking-[0.05em]">{step.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <div className="rounded-2xl bg-card/60 border border-border p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-56 h-56 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-lg flex-none mx-auto">
              <img
                src="/expert_landingpage.png"
                alt="Especialista Leilão Legends"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <span className="inline-block text-xs uppercase tracking-wider text-primary font-bold mb-1">
                Especialista em Colecionáveis
              </span>
              <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight mb-2">
                Os Caras das Legends
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Especialistas em leilões diários de legends, crumples, quadros, álbuns, cards raros e brindes exclusivos. Garantimos total transparência nos lances ao vivo e envio seguro para todo o Brasil.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-bold">
              Recebidos e Feedbacks dos Clientes
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex gap-3 w-max animate-marquee">
              {[
                "/review 1.jpeg",
                "/review 2.jpeg",
                "/review 3.jpeg",
                "/review 4.jpeg",
                "/review 5.jpeg",
                "/review 6.jpeg",
                "/feedback_01_final.png",
                "/feedback_02_final.png",
                "/feedback_03_final.png",
              ].map((src, i) => (
                <div
                  key={`a-${i}`}
                  className="flex-none w-[280px] rounded-xl overflow-hidden bg-card"
                >
                  <img
                    src={src}
                    alt={`Recebido e Feedback ${i + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
              {[
                "/review 1.jpeg",
                "/review 2.jpeg",
                "/review 3.jpeg",
                "/review 4.jpeg",
                "/review 5.jpeg",
                "/review 6.jpeg",
                "/feedback_01_final.png",
                "/feedback_02_final.png",
                "/feedback_03_final.png",
              ].map((src, i) => (
                <div
                  key={`b-${i}`}
                  className="flex-none w-[280px] rounded-xl overflow-hidden bg-card"
                >
                  <img
                    src={src}
                    alt={`Recebido e Feedback ${i + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <div className="rounded-2xl bg-card/50 border border-border p-8 md:p-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-primary">
              <Users className="size-6" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
                Comunidade ativa no Instagram
              </h2>
            </div>
            <p className="max-w-xl mx-auto text-muted-foreground mb-6">
              Acompanhe o <strong className="text-foreground">@oscarasdaslegends</strong> no Instagram.
              Milhares de colecionadores já fazem parte — veja os arremates, bastidores e novidades em tempo real.
            </p>
            <a
              href="https://www.instagram.com/oscarasdaslegends/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-heading text-base tracking-[0.02em] uppercase rounded-xl hover:from-pink-600 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300"
            >
              <Camera className="size-4" />
              Seguir no Instagram
            </a>
          </div>
        </section>

        <section className="mt-10 text-center animate-fade-up" style={{ animationDelay: "0.7s" }}>
          <a
            href="https://chat.whatsapp.com/EYD5CmJ0Oer4aeM0zQ9mqu"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCTAClick}
            className="group relative inline-flex items-center justify-center gap-3 w-full max-w-lg bg-primary text-primary-foreground font-heading text-lg md:text-xl tracking-[0.02em] uppercase no-underline py-5 px-8 rounded-2xl border border-primary/40 shadow-[0_10px_30px_rgba(132,255,0,0.2)] hover:shadow-[0_15px_45px_rgba(132,255,0,0.35)] hover:scale-[1.02] hover:border-primary/60 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 flex items-center gap-2.5 font-bold">
              <Zap className="size-6 text-primary-foreground animate-bounce" />
              ENTRAR NO GRUPO VIP AGORA!
            </span>
          </a>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Grupo 100% Gratuito
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5 text-foreground font-medium">
              <Truck className="size-4 text-primary" />
              Entrega para Todo o Brasil
            </span>
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-border text-center animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <p className="text-xs text-muted-foreground leading-relaxed px-4 max-w-xl mx-auto">
            Leilão informal entre colecionadores.
            <br />
            Nunca faça pagamento antes de confirmar o arremate no grupo.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            <span className="text-xs text-muted-foreground tracking-wider uppercase">
              Leilão <span className="font-fifa text-primary">Legends</span> © 2026
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          </div>
        </footer>
      </main>

      <Chatbot />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PageContent />
    </Suspense>
  );
}