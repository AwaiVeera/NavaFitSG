import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://navafit.sg"),
  title: "NavaFit | Rise of Dawn - Hindu Warrior Fitness",
  description: "Train like the warriors of ancient India. Master Gada, Kalari, and Pranayama with NavaFit Singapore. Join our exclusive Rise of Dawn program.",
  keywords: ["fitness", "gada", "kalari", "pranayama", "indian martial arts", "singapore fitness", "warrior training", "ancient fitness"],
  authors: [{ name: "Awai Veera", url: "https://navafit.sg" }],
  creator: "NavaFit",
  publisher: "NavaFit",
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://navafit.sg",
    siteName: "NavaFit",
    title: "NavaFit | Rise of Dawn - Hindu Warrior Fitness",
    description: "Train like the warriors of ancient India. Master Gada, Kalari, and Pranayama with NavaFit Singapore.",
    images: [
      {
        url: "/images/nfl.png",
        width: 1200,
        height: 630,
        alt: "NavaFit - Rise of Dawn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NavaFit | Rise of Dawn - Hindu Warrior Fitness",
    description: "Train like the warriors of ancient India. Master Gada, Kalari, and Pranayama.",
    images: ["/images/nfl.png"],
  },
  icons: {
    icon: "/images/nfl.png",
    apple: "/images/nfl.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030806",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
