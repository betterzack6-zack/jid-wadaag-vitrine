import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Jid Wadaag — Trouvez ou proposez un trajet à Djibouti",
  description:
    "Jid Wadaag met en relation conducteurs et passagers pour les trajets inter-cités au départ de Djibouti. Rapide, simple, depuis votre téléphone.",
  keywords: ["trajet", "Djibouti", "Dire Dawa", "Hargeisa", "transport inter-cités", "mise en relation"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="pt-20 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
