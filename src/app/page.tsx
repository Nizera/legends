"use client";

import { Suspense } from "react";
import { Camera, Shield, Truck, Users, Zap, CheckCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/components/FacebookPixel";
import VideoPlayer from "@/components/VideoPlayer";
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
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-4" />
            </span>
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
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <Users className="size-3.5" />
            Leilão diário de figurinhas · Copa 2026
          </span>
          <h1 className="max-w-3xl text-balance font-heading font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl">
            Como funciona o <br />
            <span className="text-primary">
              Leilão <span className="font-fifa">Legends</span> da Copa
            </span>
          </h1>
          <p className="max-w-2xl text-balance text-muted-foreground md:text-lg">
            1 minuto de vídeo pra você entender os lances, o pagamento e o envio
            antes de participar.
          </p>
        </section>

        <section className="mt-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <VideoPlayer />
        </section>

        <section className="mt-8 text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="https://chat.whatsapp.com/EYD5CmJ0Oer4aeM0zQ9mqu"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCTAClick}
            className="group relative inline-flex items-center justify-center gap-2 w-full max-w-xs bg-primary text-primary-foreground font-heading text-base tracking-[0.02em] uppercase no-underline py-3.5 px-6 rounded-xl border border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Entrar no grupo agora</span>
            <Zap className="size-4 relative z-10" />
          </a>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Grupo gratuito
            </span>
            <span>·</span>
            <span>Qualquer pessoa pode dar lance</span>
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

        <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
            <span className="text-xs tracking-[0.15em] uppercase text-muted-foreground font-bold">
              Feedbacks do grupo
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex gap-3 w-max animate-marquee">
              {[1, 2, 3].map((num) => (
                <div
                  key={`a-${num}`}
                  className="flex-none w-[280px] rounded-xl overflow-hidden"
                >
                  <img
                    src={`/feedback_0${num}_final.png`}
                    alt={`Feedback ${num}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
              {[1, 2, 3].map((num) => (
                <div
                  key={`b-${num}`}
                  className="flex-none w-[280px] rounded-xl overflow-hidden"
                >
                  <img
                    src={`/feedback_0${num}_final.png`}
                    alt={`Feedback ${num}`}
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading text-sm tracking-[0.02em] uppercase rounded-xl hover:bg-primary/90 transition-colors"
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
            className="group relative inline-flex items-center justify-center gap-2 w-full max-w-xs bg-primary text-primary-foreground font-heading text-lg tracking-[0.02em] uppercase no-underline py-4 px-8 rounded-xl border border-primary/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_50px_rgba(0,0,0,0.5)] hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Entrar no grupo agora</span>
            <Zap className="size-5 relative z-10" />
          </a>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Grupo gratuito
            </span>
            <span>·</span>
            <span>Sem compromisso, só diversão</span>
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