"use client";

import { Suspense } from "react";
import { trackWhatsAppClick } from "@/components/FacebookPixel";

function PageContent() {
  const handleCTAClick = () => {
    trackWhatsAppClick();
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-[480px]">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-5 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="relative animate-float">
            <div className="w-2 h-2 rounded-full bg-gold-300 animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-gold-300 animate-ping opacity-75" />
          </div>
          <span className="text-[11px] tracking-[0.2em] uppercase text-gold-300 font-bold">
            Grupo ativo agora
          </span>
        </div>

        {/* Hero */}
        <h1 className="font-anton text-[36px] sm:text-[42px] leading-[1.02] text-center uppercase text-cream mb-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Como funciona o<br />
          <span className="text-gold-300 drop-shadow-[0_0_20px_rgba(246,217,118,0.3)]">
            Leilão Legends
          </span>
          <br />
          <span className="text-[28px] sm:text-[32px]">da Copa</span>
        </h1>
        <p className="text-center text-[14px] text-[#bcd6c5] max-w-[340px] mx-auto mb-7 font-medium leading-relaxed animate-fade-up" style={{ animationDelay: "0.3s" }}>
          3 minutos de vídeo pra você entender os lances, o pagamento e o envio
          antes de participar.
        </p>

        {/* Video */}
        <div className="relative mb-8 animate-scale-in" style={{ animationDelay: "0.4s" }}>
          <div className="relative aspect-[9/16] max-h-[440px] mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[#12432a] via-[#0a2417] to-[#071a10] flex items-center justify-center border border-gold-500/30 shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(246,217,118,0.08)_50%,transparent_60%)]" />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-[64px] h-[64px] rounded-full bg-[radial-gradient(circle_at_32%_30%,var(--gold-300),var(--gold-700))] flex items-center justify-center animate-glow hover:scale-110 transition-transform cursor-pointer">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[17px] border-l-ink ml-1.5" />
              </div>
              <div className="text-center">
                <p className="text-[13px] text-gold-300 font-bold mb-1">
                  ▸ Assista antes de entrar
                </p>
                <p className="text-[11px] text-[#7d9c88]">2:47 de duração</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/30" />
          <span className="text-[11px] tracking-[0.15em] uppercase text-gold-300 font-bold">
            Regras do jogo
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/30" />
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3 mb-8">
          {[
            { num: 1, title: "Os lances acontecem ao vivo no grupo", desc: "Cada figurinha tem lance inicial e horário de início/fim. Se alguém dá lance no último minuto, o tempo estende 3min.", icon: "⚡" },
            { num: 2, title: "Pagamento é só via Pix, com comprovante", desc: "Quem arrematou paga via Pix direto e envia o comprovante no grupo.", icon: "💸" },
            { num: 3, title: "Envio combinado após confirmação", desc: "Com o pagamento confirmado, o envio é combinado até a entrega ser concluída.", icon: "📦" },
          ].map((step, i) => (
            <div
              key={step.num}
              className="flex gap-3.5 items-start bg-panel/60 backdrop-blur-sm border border-white/[0.06] rounded-xl p-4 hover:border-gold-500/30 hover:bg-panel/80 transition-all duration-300 animate-fade-up group"
              style={{ animationDelay: `${0.55 + i * 0.12}s` }}
            >
              <div className="flex-none w-[32px] h-[32px] rounded-lg bg-gradient-to-br from-gold-300 to-gold-700 text-ink font-anton text-[14px] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(228,185,78,0.4)] transition-all duration-300">
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[14px] group-hover:scale-110 transition-transform duration-300">{step.icon}</span>
                  <h3 className="text-[14px] text-cream font-bold">{step.title}</h3>
                </div>
                <p className="text-[12.5px] text-[#9fc2ab] leading-[1.5]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-up" style={{ animationDelay: "0.9s" }}>
          <a
            href="https://chat.whatsapp.com/CNE7Z6OkG6EHOTVZDRDP0G?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCTAClick}
            className="group relative block w-full bg-gradient-to-br from-green-light to-green text-cream font-anton text-[18px] tracking-[0.02em] uppercase no-underline py-4 rounded-xl border border-gold-500/40 shadow-[0_10px_30px_rgba(20,107,57,0.4)] hover:shadow-[0_10px_50px_rgba(20,107,57,0.7)] hover:scale-[1.03] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Entrar no grupo agora</span>
          </a>
          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-[#7d9c88]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-light animate-pulse" />
              Grupo gratuito
            </span>
            <span>·</span>
            <span>Qualquer pessoa pode dar lance</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center animate-fade-in" style={{ animationDelay: "1s" }}>
          <p className="text-[11px] text-[#7d9c88] leading-[1.6] px-4">
            Leilão informal entre colecionadores.
            <br />
            Nunca faça pagamento antes de confirmar o arremate no grupo.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
            <span className="text-[10px] text-[#7d9c88] tracking-wider uppercase">Leilão Legends © 2026</span>
            <div className="w-1.5 h-1.5 rounded-full bg-gold-500/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PageContent />
    </Suspense>
  );
}
