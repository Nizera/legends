import { NextRequest, NextResponse } from "next/server";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || "";
const SYSTEM_PROMPT = `Você é um assistente virtual do Leilão Legends da Copa. Responda de forma breve, amigável e em português brasileiro. Use no máximo 2-3 frases por resposta.

Base de conhecimento:
- O Leilão Legends é um leilão informal entre colecionadores de figurinhas da Copa do Mundo
- O grupo é gratuito e qualquer pessoa pode participar dando lances
- Os lances acontecem ao vivo no grupo. Cada figurinha tem lance inicial e horário de início/fim
- Se alguém dá lance no último minuto, o tempo estende 3 minutos
- Pagamento é via Pix, com comprovante enviado ao suporte
- Para dar lance mínimo, basta enviar o valor no grupo
- Se não quiser esperar, pode dar lance de arremate imediato — o leilão acaba na hora
- Após pagamento confirmado, o envio é combinado com o ganhador
- Nunca faça pagamento antes de confirmar o arremate no grupo
- Exemplo real: figurinha com lance inicial de R$200 foi arrematada por R$280, envio feito no mesmo dia

Se a pergunta for sobre como entrar no grupo, responda que é só clicar no botão "Entrar no grupo agora". Se não souber algo, diga que o suporte pode ajudar pelo grupo.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!NVIDIA_API_KEY) {
      return NextResponse.json(
        { error: "API key não configurada" },
        { status: 500 }
      );
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
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 300,
          top_p: 0.9,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const reply = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua mensagem.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar mensagem" },
      { status: 500 }
    );
  }
}
