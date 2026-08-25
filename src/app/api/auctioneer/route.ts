import { NextRequest, NextResponse } from "next/server";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "";

const SYSTEM_PROMPT = `Você é o leiloeiro oficial do Leilão Legends da Copa do Mundo. Você é um leiloeiro animado, profissional, e carismático — como os leiloeiros de estádio. Fale português brasileiro.

REGRAS:
- Seja breve: máximo 1-2 frases por mensagem
- Use emojis moderadamente (🔥, ⚡, 🎯, 💰, ✅)
- Use linguagem informal e animada
- Sempre mencione o valor em reais (R$)
- Quando alguém dá lance, confirme com entusiasmo
- Quando o tempo está acabando, crie urgência
- Declare o vencedor com emphase
- Não invente informações — use apenas os dados fornecidos no contexto

ESTILO:
- Lance recebido: "🔥 R$XX recebido de [Nome]! Quem dá mais?"
- Tempo acabando: "⚡ FALTAM X SEGUNDOS! Última chance!"
- Vendedor declarado: "🏆 [Nome] venceu por R$XX! Parabéns!"
- Lote aberto: "🎯 NOVO LOTE: [Título] — Lance inicial: R$XX"
- Arremate imediato: "⚡ ARREMATE IMEDIATO! [Nome] levou por R$XX!"`;

interface AuctioneerRequest {
  event: "lot_start" | "bid_placed" | "timer_warning" | "lot_end" | "arremate" | "extend_timer";
  lotTitle?: string;
  lotInitialBid?: number;
  currentBid?: number;
  currentBidder?: string;
  timeLeft?: number;
  increment?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: AuctioneerRequest = await req.json();
    const { event, lotTitle, lotInitialBid, currentBid, currentBidder, timeLeft, increment } = body;

    if (!NVIDIA_API_KEY) {
      return NextResponse.json(
        { error: "API key não configurada" },
        { status: 500 }
      );
    }

    let userMessage = "";

    switch (event) {
      case "lot_start":
        userMessage = `O lote "${lotTitle}" acabou de abrir! Lance inicial de R$${lotInitialBid}. Gere uma mensagem de abertura animada.`;
        break;
      case "bid_placed":
        userMessage = `${currentBidder} acabou de dar lance de R$${currentBid} no lote "${lotTitle}". O lance anterior era R$${(currentBid || 0) - (increment || 10)}. Confirme o lance com entusiasmo e incentive outros a darem lance.`;
        break;
      case "timer_warning":
        userMessage = `Faltam apenas ${timeLeft} segundos para o lote "${lotTitle}" encerrar! Lance atual: R$${currentBid} de ${currentBidder}. Crie urgência!`;
        break;
      case "lot_end":
        userMessage = `O lote "${lotTitle}" encerrou! Vencedor: ${currentBidder} com R$${currentBid}. Declare o vencedor com emphase e parabéns!`;
        break;
      case "arremate":
        userMessage = `${currentBidder} acabou de fazer arremate imediato no lote "${lotTitle}" por R$${currentBid}! O leilão desse lote encerrou na hora! Celebre o arremate!`;
        break;
      case "extend_timer":
        userMessage = `Alguém deu lance nos últimos segundos! O tempo do lote "${lotTitle}" foi estendido em 1 minuto. Lance atual: R$${currentBid} de ${currentBidder}. Informe sobre a extensão.`;
        break;
    }

    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
        },
        body: JSON.stringify({
          model: "z-ai/glm-5.2",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userMessage },
          ],
          temperature: 0.8,
          max_tokens: 200,
          top_p: 0.9,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const reply = data.choices?.[0]?.message?.content || "🎯 Lance recebido!";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Erro ao gerar mensagem do leiloeiro" },
      { status: 500 }
    );
  }
}
