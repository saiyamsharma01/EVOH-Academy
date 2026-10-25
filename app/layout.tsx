import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBrandSettings, getNavItems } from "@/lib/settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandSettings();
  return {
    title: {
      default: `${brand.brandName} | Physics, Chemistry & Mathematics for Class 11 & 12`,
      template: `%s | ${brand.brandName}`,
    },
    description: brand.tagline,
    keywords: [
      "Class 11 Physics Notes",
      "Class 12 Chemistry Notes",
      "Class 12 Maths Formula Sheets",
      "NCERT Derivations",
      "CBSE Science Notes",
      "EVOH Academy",
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brand = await getBrandSettings();
  const navItems = await getNavItems("HEADER");

  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface-base text-ink-primary font-sans antialiased">
        <Navbar brandName={brand.brandName} items={navItems} />
        <main className="flex-1">{children}</main>
        <Footer
          brandName={brand.brandName}
          tagline={brand.tagline}
          contactEmail={brand.contactEmail}
          contactPhone={brand.contactPhone}
        />
      </body>
    </html>
  );
}
