import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const font = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Hardvanta",
    template: "%s | Hardvanta",
  },
  description: "Industrial electronics marketplace for engineers",

  keywords: [
    "industrial electronics",
    "electronics components",
    "engineering marketplace",
    "buy electronic parts",
    "Hardvanta",
  ],

  metadataBase: new URL("https://hardvanta.com"),

  openGraph: {
    title: "Hardvanta",
    description: "Industrial electronics marketplace for engineers",
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
    <html lang="en" className={font.variable}>
      <body
        className="
          bg-[#f1f3f6] text-gray-900 antialiased
        "
      >
        {/* MAIN WRAPPER */}
        <div className="min-h-screen flex flex-col">

          {/* PAGE CONTENT */}
          <main className="flex-1">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}