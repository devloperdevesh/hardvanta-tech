import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const font = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Hardvanta",
    template: "%s | Hardvanta",
  },

  description:
    "Hardvanta is a modern industrial electronics marketplace for engineers, startups, and hardware innovators.",

  keywords: [
    "industrial electronics",
    "electronics components",
    "engineering marketplace",
    "buy electronic parts",
    "ICs",
    "sensors",
    "hardware startup",
    "Hardvanta",
  ],

  metadataBase: new URL("https://hardvanta.com"),

  themeColor: "#1b6ca8",

  viewport: {
    width: "device-width",
    initialScale: 1,
  },

  openGraph: {
    title: "Hardvanta",
    description:
      "Industrial electronics marketplace for engineers and innovators.",
    url: "https://hardvanta.com",
    siteName: "Hardvanta",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Hardvanta Logo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hardvanta",
    description:
      "Industrial electronics marketplace for engineers and innovators.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${font.variable} scroll-smooth`}>
      <body className="bg-[#f8fafc] text-gray-900 antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
