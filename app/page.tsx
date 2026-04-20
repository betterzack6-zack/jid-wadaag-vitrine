import Link from "next/link";

const avantages = [
  {
    icon: "⚡",
    titre: "Trouvez un trajet en secondes",
    desc: "Plus besoin d'attendre au bord de la route. Les trajets disponibles s'affichent instantanément.",
  },
  {
    icon: "🤝",
    titre: "Conducteurs, remplissez vos places",
    desc: "Trouvez des passagers avant même de partir. Rentabilisez chaque trajet facilement.",
  },
  {
    icon: "😌",
    titre: "Voyage confortable et organisé",
    desc: "Horaires clairs, places confirmées, contact direct via WhatsApp. Tout est simplifié.",
  },
];

const steps = [
  { num: "01", text: "Recherchez un trajet par ville de départ et destination" },
  { num: "02", text: "Choisissez le trajet qui vous convient et consultez les détails" },
  { num: "03", text: "Réservez votre place en entrant juste votre prénom et numéro" },
];

const corridors = [
  "Djibouti → Dire Dawa",
  "Djibouti → Borama",
  "Djibouti → Ali Sabieh",
  "Djibouti → Arta",
  "Djibouti → Tadjourah",
  "Djibouti → Obock",
  "Djibouti → Jigjiga",
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{ background: "linear-gradient(135deg, #1B4F8A 0%, #162F5A 100%)" }}
        className="px-6 py-24 text-center text-white"
      >
        <div className="max-w-3xl mx-auto">
          <div
            style={{ backgroundColor: "#FEF3DC", color: "#F5A623" }}
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-6"
          >
            🇩🇯 Fait pour les Djiboutiens
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Voyagez plus<br />
            <span style={{ color: "#F5A623" }}>vite, plus simple,</span><br />
            plus confortable.
          </h1>

          <p className="text-white/75 text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Jid Wadaag met en relation conducteurs et passagers pour les trajets
            inter-cités au départ de Djibouti. Réservez votre place en quelques
            secondes depuis votre téléphone.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trajets"
              style={{ backgroundColor: "#F5A623" }}
              className="px-8 py-4 rounded-full font-bold text-white text-lg hover:opacity-90 transition shadow-lg"
            >
              Je cherche un trajet
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full font-bold text-white text-lg border-2 border-white/40 hover:border-white transition"
            >
              Je suis conducteur
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section style={{ backgroundColor: "#E8F0FA" }} className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <h2
            style={{ color: "#1B4F8A" }}
            className="text-3xl font-extrabold text-center mb-4"
          >
            Pourquoi Jid Wadaag ?
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-center mb-12">
            On ne fait pas le trajet à votre place — on vous facilite la tâche.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {avantages.map((a) => (
              <div
                key={a.titre}
                className="bg-white rounded-2xl p-8 shadow-sm border"
                style={{ borderColor: "#DDE6F0" }}
              >
                <div className="text-4xl mb-4">{a.icon}</div>
                <h3 style={{ color: "#1A2B3C" }} className="text-xl font-bold mb-2">
                  {a.titre}
                </h3>
                <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plateforme de mise en relation */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "#1B4F8A" }} className="text-3xl font-extrabold mb-4">
            On fait le lien, vous faites le trajet.
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-lg leading-relaxed mb-10">
            Jid Wadaag est une plateforme de mise en relation. Nous connectons
            les conducteurs qui ont de la place avec les passagers qui cherchent
            un trajet. Simple, rapide, et depuis votre téléphone.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "📢", label: "Le conducteur publie son trajet" },
              { icon: "🔗", label: "Jid Wadaag fait le lien" },
              { icon: "✅", label: "Le passager réserve sa place" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ backgroundColor: "#E8F0FA", borderColor: "#DDE6F0" }}
                className="rounded-2xl p-6 border"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p style={{ color: "#1A2B3C" }} className="font-semibold text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche — aperçu */}
      <section style={{ backgroundColor: "#E8F0FA" }} className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 style={{ color: "#1B4F8A" }} className="text-3xl font-extrabold mb-4">
            Aussi simple que 1, 2, 3
          </h2>
          <p style={{ color: "#7A8FA8" }} className="mb-12 text-base">
            Pas de compte compliqué, pas de mot de passe.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-4">
                <div
                  style={{ backgroundColor: "#1B4F8A", color: "#F5A623" }}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-extrabold"
                >
                  {s.num}
                </div>
                <p style={{ color: "#1A2B3C" }} className="font-medium text-sm leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/comment"
            style={{ color: "#1B4F8A", borderColor: "#1B4F8A" }}
            className="inline-block border-2 px-8 py-3 rounded-full font-semibold hover:opacity-80 transition"
          >
            Voir le guide complet →
          </Link>
        </div>
      </section>

      {/* Corridors aperçu */}
      <section style={{ backgroundColor: "#FEF3DC" }} className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ color: "#1B4F8A" }} className="text-3xl font-extrabold mb-4">
            Les trajets disponibles
          </h2>
          <p style={{ color: "#7A8FA8" }} className="mb-10">
            Au départ de Djibouti et entre les villes de la région.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {corridors.map((c) => (
              <span
                key={c}
                style={{ backgroundColor: "#1B4F8A", color: "white" }}
                className="px-5 py-2 rounded-full text-sm font-semibold"
              >
                {c}
              </span>
            ))}
          </div>
          <Link
            href="/villes"
            style={{ backgroundColor: "#F5A623" }}
            className="inline-block px-8 py-3 rounded-full text-white font-bold hover:opacity-90 transition"
          >
            Voir toutes les villes →
          </Link>
        </div>
      </section>

      {/* CTA final */}
      <section
        style={{ background: "linear-gradient(135deg, #1B4F8A 0%, #162F5A 100%)" }}
        className="px-6 py-20 text-center text-white"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">
            Votre prochain trajet commence ici.
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Téléchargez Jid Wadaag et trouvez ou proposez un trajet en quelques secondes.
          </p>
          <Link
            href="/contact"
            style={{ backgroundColor: "#F5A623" }}
            className="inline-block px-10 py-4 rounded-full text-white font-bold text-lg hover:opacity-90 transition shadow-xl"
          >
            Télécharger l&apos;application
          </Link>
        </div>
      </section>
    </>
  );
}
