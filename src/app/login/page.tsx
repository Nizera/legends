"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "login" | "cadastro";

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  // Login
  const [loginTel, setLoginTel] = useState("");
  const [loginSenha, setLoginSenha] = useState("");

  // Cadastro
  const [cadNome, setCadNome] = useState("");
  const [cadTel, setCadTel] = useState("");
  const [cadSenha, setCadSenha] = useState("");
  const [cadCpf, setCadCpf] = useState("");
  const [cadEmail, setCadEmail] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    const result = await signIn(loginTel, loginSenha);
    if (result.error) {
      setErro(result.error);
      setLoading(false);
    } else {
      router.push("/");
    }
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    const result = await signUp({
      nome: cadNome,
      telefone: cadTel,
      senha: cadSenha,
      cpf: cadCpf || undefined,
      email: cadEmail || undefined,
    });
    if (result.error) {
      setErro(result.error);
      setLoading(false);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[var(--bg-deep)]">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <img
            src="/logo.png"
            alt="Leilão Legends"
            className="w-[200px] mx-auto mb-4 drop-shadow-[0_0_30px_rgba(228,185,78,0.2)]"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-[var(--bg-panel)]/60 rounded-xl p-1 mb-6 border border-white/[0.06]">
          <button
            onClick={() => { setTab("login"); setErro(""); }}
            className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-300 ${
              tab === "login"
                ? "bg-gradient-to-br from-gold-300 to-gold-700 text-ink shadow-md"
                : "text-[#7d9c88] hover:text-cream"
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => { setTab("cadastro"); setErro(""); }}
            className={`flex-1 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-300 ${
              tab === "cadastro"
                ? "bg-gradient-to-br from-gold-300 to-gold-700 text-ink shadow-md"
                : "text-[#7d9c88] hover:text-cream"
            }`}
          >
            Cadastrar
          </button>
        </div>

        {/* Erro */}
        {erro && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-[13px] text-center">
            {erro}
          </div>
        )}

        {/* Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] text-[#7d9c88] mb-2 uppercase tracking-[0.15em] font-bold">
                Telefone
              </label>
              <input
                type="text"
                value={loginTel}
                onChange={(e) => setLoginTel(e.target.value)}
                placeholder="11999998888"
                required
                className="w-full bg-[var(--bg-panel)]/80 border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-cream placeholder-[#6a9078] outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#7d9c88] mb-2 uppercase tracking-[0.15em] font-bold">
                Senha
              </label>
              <input
                type="password"
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
                placeholder="Sua senha"
                required
                className="w-full bg-[var(--bg-panel)]/80 border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-cream placeholder-[#6a9078] outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-green-light to-green text-cream font-anton text-[16px] tracking-[0.03em] uppercase py-4 rounded-xl border border-gold-500/30 shadow-[0_8px_25px_rgba(20,107,57,0.35)] hover:shadow-[0_8px_35px_rgba(20,107,57,0.5)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        )}

        {/* Cadastro Form */}
        {tab === "cadastro" && (
          <form onSubmit={handleCadastro} className="space-y-3">
            <div>
              <label className="block text-[11px] text-[#7d9c88] mb-2 uppercase tracking-[0.15em] font-bold">
                Nome completo *
              </label>
              <input
                type="text"
                value={cadNome}
                onChange={(e) => setCadNome(e.target.value)}
                placeholder="Seu nome"
                required
                className="w-full bg-[var(--bg-panel)]/80 border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-cream placeholder-[#6a9078] outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#7d9c88] mb-2 uppercase tracking-[0.15em] font-bold">
                Telefone *
              </label>
              <input
                type="text"
                value={cadTel}
                onChange={(e) => setCadTel(e.target.value)}
                placeholder="11999998888"
                required
                className="w-full bg-[var(--bg-panel)]/80 border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-cream placeholder-[#6a9078] outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#7d9c88] mb-2 uppercase tracking-[0.15em] font-bold">
                Senha *
              </label>
              <input
                type="password"
                value={cadSenha}
                onChange={(e) => setCadSenha(e.target.value)}
                placeholder="Crie uma senha"
                required
                minLength={6}
                className="w-full bg-[var(--bg-panel)]/80 border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-cream placeholder-[#6a9078] outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#7d9c88] mb-2 uppercase tracking-[0.15em] font-bold">
                CPF <span className="text-[#4a6b55]">(opcional)</span>
              </label>
              <input
                type="text"
                value={cadCpf}
                onChange={(e) => setCadCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full bg-[var(--bg-panel)]/80 border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-cream placeholder-[#6a9078] outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#7d9c88] mb-2 uppercase tracking-[0.15em] font-bold">
                Email <span className="text-[#4a6b55]">(opcional)</span>
              </label>
              <input
                type="email"
                value={cadEmail}
                onChange={(e) => setCadEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-[var(--bg-panel)]/80 border border-white/[0.08] rounded-xl px-4 py-3.5 text-[14px] text-cream placeholder-[#6a9078] outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-green-light to-green text-cream font-anton text-[16px] tracking-[0.03em] uppercase py-4 rounded-xl border border-gold-500/30 shadow-[0_8px_25px_rgba(20,107,57,0.35)] hover:shadow-[0_8px_35px_rgba(20,107,57,0.5)] hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
