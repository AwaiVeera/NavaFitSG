import type { Metadata, Viewport } from "next";
import { Hind, Rajdhani, Teko } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const fontBody = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const fontHeading = Teko({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const fontSubheading = Rajdhani({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-subheading",
  display: "swap",
});

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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
      </head>
      <body
        className={`${fontBody.variable} ${fontHeading.variable} ${fontSubheading.variable} antialiased font-body`}
      >
        {children}
      </body>
    </html>
  );
}
