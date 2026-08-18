"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Fala! 👋 Sou o assistente do Leilão Legends. Tira suas dúvidas sobre como funciona o leilão, lances, pagamento e mais!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const reply = data.reply || "Erro ao conectar. Tente novamente.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Erro ao conectar. Tente novamente." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-[9998] w-14 h-14 rounded-full bg-gradient-to-br from-green-light to-green shadow-[0_4px_20px_rgba(20,107,57,0.5)] hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Abrir chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-cream" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-[9998] w-[340px] max-w-[calc(100vw-40px)] bg-[#0e2e1c] rounded-2xl border border-gold-500/30 shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col" style={{ height: "480px", maxHeight: "calc(100vh - 120px)" }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green to-green-light px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold-300 flex items-center justify-center text-ink font-anton text-[14px]">
              LL
            </div>
            <div className="flex-1">
              <p className="text-cream font-bold text-[13px]">Leilão Legends</p>
              <p className="text-cream/70 text-[11px]">Online agora</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-light animate-pulse" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-green-light text-cream rounded-br-sm"
                      : "bg-white/10 text-cream/90 rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 px-3 py-2 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gold-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gold-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gold-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 px-3 py-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Pergunte algo..."
              className="flex-1 bg-white/10 text-cream text-[13px] placeholder-cream/40 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-gold-500/50"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-9 h-9 rounded-full bg-green-light hover:bg-green flex items-center justify-center transition-colors disabled:opacity-40"
            >
              <svg className="w-4 h-4 text-cream" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
