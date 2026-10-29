import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { LanguageProvider } from "@/lib/i18n";
import { CustomCursor } from "@/components/ui/custom-cursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
});

// Display face for headings. Chosen over a generic geometric sans because the
// headings are set large with tight leading and are full of stacked Vietnamese
// tone marks — this family draws them properly instead of falling back per glyph.
const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

// Pull quotes need a serif with real Vietnamese glyphs and a drawn italic —
// the system serif stack has neither.
const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Hung Nguyen | Software Consultant at SID CORP",
  description:
    "Premium portfolio and personal branding website for Hung Nguyen, Software Consultant at SID CORP. Specializing in AI Solutions, ERP, CRM, and Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${beVietnamPro.variable} ${lora.variable} ${jetbrainsMono.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        <CustomCursor />
        <LanguageProvider>
          <LenisProvider>{children}</LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
