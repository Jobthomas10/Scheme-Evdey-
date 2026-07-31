import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "JanMitra AI – Kerala & Central Government Benefit Discovery Engine",
  description:
    "AI-powered statutory benefit reasoning platform. Describe your life situation in natural language and discover pensions, scholarships, healthcare, and housing schemes with clause-level citations.",
  keywords: [
    "Kerala Government Schemes",
    "JanMitra AI",
    "Sevana Pension Kerala",
    "e-Grantz Scholarship",
    "Karunya Health Insurance KASP",
    "LIFE Housing Mission",
    "Widow Pension Kerala",
  ],
  authors: [{ name: "JanMitra AI Team" }],
  openGraph: {
    title: "JanMitra AI – AI-Powered Government Benefit Discovery",
    description:
      "Get your personalized Family Benefit Report with Benefit Potential Score, estimated annual rupees, and step-by-step application roadmap.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
