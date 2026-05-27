import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mypdftools — Free Online PDF Tools | No Upload Required",
  description:
    "Merge, split, compress, convert, rotate, watermark, sign, and more — all in your browser. 100% free, 100% private. Every tool you need to work with PDFs at mypdftools.in.",
  keywords: [
    "PDF", "merge PDF", "split PDF", "compress PDF", "PDF to Word",
    "PDF to Excel", "JPG to PDF", "PDF to JPG", "sign PDF", "watermark PDF",
    "HTML to PDF", "text to PDF", "free PDF tools", "online PDF editor",
    "PDF converter", "protect PDF", "unlock PDF", "mypdftools",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://mypdftools.in"),
  openGraph: {
    title: "mypdftools — Free Online PDF Tools",
    description: "Every tool you need to work with PDFs — all in one place. 100% free, 100% private, no upload required.",
    url: "https://mypdftools.in",
    siteName: "mypdftools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mypdftools — Free Online PDF Tools",
    description: "Every tool you need to work with PDFs — all in one place. 100% free, 100% private.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster richColors position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
