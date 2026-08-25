"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Arremate {
  id: string;
  titulo: string;
  lance_vencedor: number;
  status: string;
  vencedor_nome: string;
  vencedor_telefone: string;
  vencedor_endereco: string;
  session_titulo: string;
  session_data: string;
  payment_status: string;
}

export default function ArrematesPage() {
  const { profile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [arremates, setArremates] = useState<Arremate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !profile) router.push("/login");
    if (!authLoading && profile && !profile.is_admin) router.push("/");
  }, [profile, authLoading, router]);

  useEffect(() => {
    if (profile?.is_admin) loadArremates();
  }, [profile]);

  async function loadArremates() {
    const { data: lots } = await supabase
      .from("lots")
      .select(`
        id, titulo, lance_vencedor, status,
        vencedor_id,
        auction_sessions (titulo, data)
      `)
      .not("vencedor_id", "is", null)
      .order("criado_em", { ascending: false });

    if (lots) {
      const enriched = await Promise.all(
        lots.map(async (lot: any) => {
          const { data: user } = await supabase
            .from("users")
            .select("nome, telefone, endereco_rua, endereco_numero, endereco_bairro, endereco_cidade, endereco_estado, endereco_cep")
            .eq("id", lot.vencedor_id)
            .single();

          const { data: payment } = await supabase
            .from("payments")
            .select("status")
            .eq("lot_id", lot.id)
            .single();

          const addr = user
            ? [user.endereco_rua, user.endereco_numero, user.endereco_bairro, user.endereco_cidade, user.endereco_estado, user.endereco_cep]
                .filter(Boolean)
                .join(", ")
            : "—";

          return {
            id: lot.id,
            titulo: lot.titulo,
            lance_vencedor: lot.lance_vencedor,
            status: lot.status,
            vencedor_nome: user?.nome || "—",
            vencedor_telefone: user?.telefone || "—",
            vencedor_endereco: addr,
            session_titulo: lot.auction_sessions?.titulo || "—",
            session_data: lot.auction_sessions?.data || "",
            payment_status: payment?.status || "pendente",
          };
        })
      );
      setArremates(enriched);
    }
    setLoading(false);
  }

  async function updatePaymentStatus(lotId: string, status: string) {
    const existing = await supabase
      .from("payments")
      .select("id")
      .eq("lot_id", lotId)
      .single();

    if (existing.data) {
      await supabase
        .from("payments")
        .update({ status })
        .eq("lot_id", lotId);
    } else {
      await supabase.from("payments").insert({
        lot_id: lotId,
        user_id: "", // will be filled by RLS or trigger
        valor: 0,
        status,
      });
    }
    loadArremates();
  }

  if (authLoading || !profile || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    pendente: { label: "Pendente", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
    confirmado: { label: "Pago", color: "bg-green-500/20 text-green-300 border-green-500/30" },
    cancelado: { label: "Cancelado", color: "bg-red-500/20 text-red-300 border-red-500/30" },
    enviado: { label: "Enviado", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:py-10">
      <div className="max-w-[700px] mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/admin"
            className="text-[#7d9c88] hover:text-cream transition-colors"
          >
            ← Voltar
          </Link>
          <h1 className="font-fifa text-[22px] text-gold-300">
            Arremates
          </h1>
        </div>

        {arremates.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#7d9c88]">Nenhum arremate ainda</p>
          </div>
        ) : (
          <div className="space-y-3">
            {arremates.map((a) => (
              <div
                key={a.id}
                className="bg-panel/60 border border-white/[0.08] rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[14px] text-cream font-bold">
                      {a.titulo}
                    </h3>
                    <p className="text-[11px] text-[#7d9c88]">
                      {a.session_titulo} ·{" "}
                      {a.session_data
                        ? new Date(a.session_data).toLocaleDateString("pt-BR")
                        : ""}
                    </p>
                  </div>
                  <span className="text-[16px] text-gold-300 font-bold font-mono">
                    R${a.lance_vencedor}
                  </span>
                </div>

                <div className="bg-deep/60 rounded-lg p-3 mb-3 text-[12px] space-y-1">
                  <p className="text-cream">
                    <span className="text-[#7d9c88]">Vencedor:</span>{" "}
                    {a.vencedor_nome}
                  </p>
                  <p className="text-cream">
                    <span className="text-[#7d9c88]">Telefone:</span>{" "}
                    {a.vencedor_telefone}
                  </p>
                  <p className="text-cream">
                    <span className="text-[#7d9c88]">Endereço:</span>{" "}
                    {a.vencedor_endereco}
                  </p>
                </div>

                <div className="flex gap-2">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => updatePaymentStatus(a.id, key)}
                      className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                        a.payment_status === key
                          ? config.color
                          : "border-white/[0.06] text-[#7d9c88] hover:text-cream"
                      }`}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
