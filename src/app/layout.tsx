import type { Metadata } from "next";
import { FacebookPixel } from "@/components/FacebookPixel";
import "./globals.css";

const PIXEL_ID = "1074294225103386";

export const metadata: Metadata = {
  title: "Leilão Legends da Copa — Antes de entrar, assista",
  description:
    "1 minuto de vídeo pra você entender os lances, o pagamento e o envio antes de participar do Leilão Legends.",
  openGraph: {
    title: "Leilão Legends da Copa",
    description: "Entenda como funciona o Leilão Legends antes de participar.",
    images: [
      {
        url: "/seo.jpeg",
        width: 1200,
        height: 630,
        alt: "Leilão Legends da Copa",
      },
    ],
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leilão Legends da Copa",
    description: "Entenda como funciona o Leilão Legends antes de participar.",
    images: ["/seo.jpeg"],
  },
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
