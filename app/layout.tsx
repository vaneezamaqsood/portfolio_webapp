import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeProvider } from "@/components/theme-provider"
import NeonBackground from "@/components/NeonBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "Vaneeza M";
const siteDescription =
  "UI/UX Designer and Front‑End Developer crafting motion-first, accessible interfaces. Selected work, case studies, and prototypes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} — Designer & Front‑End Developer`,
    template: "%s | Vaneeza M",
  },
  description: siteDescription,
  keywords: [
    "Vaneeza",
    "UI/UX Designer",
    "Front-End Developer",
    "Portfolio",
    "Next.js",
    "React",
    "Figma",
    "Tailwind CSS",
    "Framer Motion",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} — Designer & Front‑End Developer`,
    description: siteDescription,
    images: [
      {
        url: "/Vaneeza-Profile%20Picture.png",
        width: 1200,
        height: 630,
        alt: `${siteName} profile image`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@",
    title: `${siteName} — Designer & Front‑End Developer`,
    description: siteDescription,
    images: ["/Vaneeza-Profile%20Picture.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
  category: "Portfolio",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Providers>
          <NeonBackground />
          {/* ensure overlay UI can receive pointer events above other content */}
          <Navbar />
          <ScrollProgress />
          <main className="relative z-0">{children}</main>
          <Footer />
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
