import type { Metadata } from "next";
import { FacebookPixel } from "@/components/FacebookPixel";
import "./globals.css";

const PIXEL_ID = "SEU_PIXEL_ID_AQUI";

export const metadata: Metadata = {
  title: "Leilão Legends da Copa — Antes de entrar, assista",
  description:
    "3 minutos de vídeo pra você entender os lances, o pagamento e o envio antes de participar do Leilão Legends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-screen">
        <FacebookPixel pixelId={PIXEL_ID} />
        {children}
      </body>
    </html>
  );
}
