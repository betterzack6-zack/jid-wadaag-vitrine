import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#162F5A" }} className="text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span
              style={{ backgroundColor: "#F5A623" }}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
            >
              JW
            </span>
            <span className="font-bold text-xl">Jid Wadaag</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Partageons le voyage.<br />
            Covoiturage inter-cités dans la Corne de l&apos;Afrique.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4 text-[#F5A623]">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/" className="hover:text-white transition">Accueil</Link></li>
            <li><Link href="/comment" className="hover:text-white transition">Comment ça marche</Link></li>
            <li><Link href="/villes" className="hover:text-white transition">Villes desservies</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            <li><Link href="/politique-de-confidentialite" className="hover:text-white transition">Politique de confidentialité</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-[#F5A623]">Contact</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a
                href="https://wa.me/25377037305"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                📱 WhatsApp : +253 77 03 73 05
              </a>
            </li>
            <li>
              <a href="mailto:contact@jidwadaag.com" className="hover:text-white transition">
                ✉️ contact@jidwadaag.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} Jid Wadaag — Tous droits réservés
      </div>
    </footer>
  );
}
