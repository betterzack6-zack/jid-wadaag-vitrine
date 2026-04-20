import Link from "next/link";

const pays = [
  {
    drapeau: "🇩🇯",
    nom: "Djibouti",
    villes: ["Djibouti (capitale)", "Ali Sabieh", "Arta", "Dikhil", "Obock", "Tadjourah", "Wea"],
  },
  {
    drapeau: "🇪🇹",
    nom: "Éthiopie",
    villes: ["Dire Dawa", "Jigjiga", "Babile"],
  },
  {
    drapeau: "🌍",
    nom: "Somaliland",
    villes: ["Hargeisa", "Borama", "Gabiley", "Wajaleh"],
  },
];

const corridors = [
  { de: "Djibouti", vers: "Dire Dawa", duree: "~5h", pays: "DJ → ET" },
  { de: "Djibouti", vers: "Borama", duree: "~7h", pays: "DJ → SL" },
  { de: "Djibouti", vers: "Ali Sabieh", duree: "~1h", pays: "DJ → DJ" },
  { de: "Djibouti", vers: "Arta", duree: "~45min", pays: "DJ → DJ" },
  { de: "Djibouti", vers: "Tadjourah", duree: "~2h30", pays: "DJ → DJ" },
  { de: "Djibouti", vers: "Obock", duree: "~3h", pays: "DJ → DJ" },
  { de: "Djibouti", vers: "Jigjiga", duree: "~8h", pays: "DJ → ET" },
];

export default function VillesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 style={{ color: "#1B4F8A" }} className="text-4xl font-extrabold mb-4">
          Villes desservies
        </h1>
        <p style={{ color: "#7A8FA8" }} className="text-lg max-w-xl mx-auto">
          Jid Wadaag couvre les principales villes de Djibouti, d&apos;Éthiopie
          et du Somaliland.
        </p>
      </div>

      {/* Corridors */}
      <section className="mb-16">
        <h2 style={{ color: "#1B4F8A" }} className="text-2xl font-extrabold mb-8 text-center">
          🗺️ Corridors principaux
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {corridors.map((c) => (
            <div
              key={`${c.de}-${c.vers}`}
              className="bg-white rounded-2xl p-5 shadow-sm border flex flex-col gap-2"
              style={{ borderColor: "#DDE6F0" }}
            >
              <div className="flex items-center justify-between">
                <span
                  style={{ backgroundColor: "#E8F0FA", color: "#1B4F8A" }}
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                >
                  {c.pays}
                </span>
                <span style={{ color: "#7A8FA8" }} className="text-xs">
                  ⏱ {c.duree}
                </span>
              </div>
              <div style={{ color: "#1A2B3C" }} className="font-bold text-base">
                {c.de}
                <span style={{ color: "#F5A623" }} className="mx-2">→</span>
                {c.vers}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Par pays */}
      <section className="mb-16">
        <h2 style={{ color: "#1B4F8A" }} className="text-2xl font-extrabold mb-8 text-center">
          📍 Toutes les villes par pays
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pays.map((p) => (
            <div
              key={p.nom}
              className="bg-white rounded-2xl p-6 shadow-sm border"
              style={{ borderColor: "#DDE6F0" }}
            >
              <div className="text-2xl mb-2">{p.drapeau}</div>
              <h3 style={{ color: "#1B4F8A" }} className="font-extrabold text-lg mb-4">
                {p.nom}
              </h3>
              <ul className="space-y-2">
                {p.villes.map((v) => (
                  <li key={v} className="flex items-center gap-2">
                    <span style={{ color: "#F5A623" }}>•</span>
                    <span style={{ color: "#1A2B3C" }} className="text-sm">
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Nouvelle ville */}
      <div
        style={{ background: "linear-gradient(135deg, #1B4F8A 0%, #162F5A 100%)" }}
        className="rounded-2xl p-8 text-center text-white"
      >
        <h3 className="text-xl font-extrabold mb-2">Votre ville n&apos;est pas listée ?</h3>
        <p className="text-white/70 mb-6 text-sm">
          Contactez-nous sur WhatsApp — nous ajoutons régulièrement de nouveaux corridors.
        </p>
        <Link
          href="/contact"
          style={{ backgroundColor: "#F5A623" }}
          className="inline-block px-8 py-3 rounded-full text-white font-bold hover:opacity-90 transition"
        >
          Nous contacter
        </Link>
      </div>
    </div>
  );
}
