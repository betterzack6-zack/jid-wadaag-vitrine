import Link from "next/link";

const stepsWeb = [
  {
    num: "01",
    titre: "Recherchez un trajet",
    desc: "Choisissez votre ville de départ, votre destination et une date optionnelle.",
  },
  {
    num: "02",
    titre: "Consultez les détails",
    desc: "Cliquez sur un trajet pour voir le conducteur, le véhicule, l'heure et le prix.",
  },
  {
    num: "03",
    titre: "Réservez votre place",
    desc: "Entrez simplement votre prénom et votre numéro — pas de mot de passe, pas de code SMS.",
  },
  {
    num: "04",
    titre: "Attendez la confirmation",
    desc: "Le conducteur reçoit votre demande et vous recontacte directement via WhatsApp.",
  },
];

const stepsApp = [
  {
    num: "01",
    titre: "Téléchargez l'application",
    desc: "Disponible sur Android et iOS. Contactez-nous sur WhatsApp pour obtenir le lien.",
  },
  {
    num: "02",
    titre: "Entrez votre numéro",
    desc: "Saisissez votre numéro djiboutien (format 77 XX XX XX) et votre prénom.",
  },
  {
    num: "03",
    titre: "Validez le code SMS",
    desc: "Recevez un code à 6 chiffres par SMS et entrez-le pour accéder à l'app.",
  },
  {
    num: "04",
    titre: "Réservez et suivez",
    desc: "Trouvez un trajet, réservez votre place et suivez l'état de votre réservation en temps réel.",
  },
];

const stepsConducteur = [
  {
    num: "01",
    titre: "Créez votre compte",
    desc: "Téléchargez l'app, entrez votre numéro, validez le SMS, puis renseignez vos infos et votre véhicule.",
  },
  {
    num: "02",
    titre: "Publiez un trajet",
    desc: "Indiquez la ville de départ, la destination, la date, l'heure et le nombre de places disponibles.",
  },
  {
    num: "03",
    titre: "Activation du trajet",
    desc: "Contactez l'admin via WhatsApp (+253 77 03 73 05) pour activer votre trajet — il devient visible par les passagers.",
  },
  {
    num: "04",
    titre: "Gérez vos réservations",
    desc: "Acceptez ou refusez les demandes depuis l'app. Vous êtes notifié instantanément à chaque nouvelle réservation.",
  },
  {
    num: "05",
    titre: "Partez le véhicule plein",
    desc: "Contactez vos passagers confirmés via WhatsApp et partez sereinement.",
  },
];

export default function CommentPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-36 pb-16">
      <div className="text-center mb-16">
        <h1 style={{ color: "#1B4F8A" }} className="text-4xl font-extrabold mb-4">
          Comment ça marche ?
        </h1>
        <p style={{ color: "#7A8FA8" }} className="text-lg max-w-2xl mx-auto">
          Jid Wadaag met en relation conducteurs et passagers.
          Réservez depuis le site ou depuis l&apos;application mobile.
        </p>
      </div>

      {/* Passager — Via le site web */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div
            style={{ backgroundColor: "#E8F0FA", color: "#1B4F8A" }}
            className="px-4 py-1 rounded-full text-sm font-bold"
          >
            🌐 Réserver depuis le site web
          </div>
          <span style={{ color: "#7A8FA8" }} className="text-xs">— le plus rapide</span>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stepsWeb.map((s) => (
            <div
              key={s.num}
              className="bg-white rounded-2xl p-5 border shadow-sm"
              style={{ borderColor: "#DDE6F0" }}
            >
              <div
                style={{ backgroundColor: "#1B4F8A", color: "#F5A623" }}
                className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm mb-3"
              >
                {s.num}
              </div>
              <h3 style={{ color: "#1A2B3C" }} className="font-bold text-sm mb-1">{s.titre}</h3>
              <p style={{ color: "#7A8FA8" }} className="text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Link
            href="/trajets"
            style={{ backgroundColor: "#F5A623" }}
            className="inline-block px-6 py-3 rounded-full text-white font-bold text-sm hover:opacity-90 transition"
          >
            Rechercher un trajet →
          </Link>
        </div>
      </section>

      {/* Passager — Via l'app */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div
            style={{ backgroundColor: "#E8F0FA", color: "#1B4F8A" }}
            className="px-4 py-1 rounded-full text-sm font-bold"
          >
            📱 Réserver depuis l&apos;application
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stepsApp.map((s) => (
            <div
              key={s.num}
              className="bg-white rounded-2xl p-5 border shadow-sm"
              style={{ borderColor: "#DDE6F0" }}
            >
              <div
                style={{ backgroundColor: "#1B4F8A", color: "#F5A623" }}
                className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm mb-3"
              >
                {s.num}
              </div>
              <h3 style={{ color: "#1A2B3C" }} className="font-bold text-sm mb-1">{s.titre}</h3>
              <p style={{ color: "#7A8FA8" }} className="text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conducteur */}
      <section className="mb-14">
        <div className="mb-6">
          <div
            style={{ backgroundColor: "#FEF3DC", color: "#F5A623" }}
            className="inline-block px-4 py-1 rounded-full text-sm font-bold"
          >
            🚗 Je propose un trajet
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stepsConducteur.map((s) => (
            <div
              key={s.num}
              className="bg-white rounded-2xl p-5 border shadow-sm"
              style={{ borderColor: "#DDE6F0" }}
            >
              <div
                style={{ backgroundColor: "#F5A623", color: "white" }}
                className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm mb-3"
              >
                {s.num}
              </div>
              <h3 style={{ color: "#1A2B3C" }} className="font-bold text-sm mb-1">{s.titre}</h3>
              <p style={{ color: "#7A8FA8" }} className="text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rôle de la plateforme */}
      <div
        style={{ backgroundColor: "#E8F0FA", borderColor: "#DDE6F0" }}
        className="rounded-2xl p-8 border mb-10"
      >
        <h2 style={{ color: "#1B4F8A" }} className="text-2xl font-extrabold mb-4">
          🔗 Notre rôle : faire le lien
        </h2>
        <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed mb-4">
          Jid Wadaag est une plateforme de mise en relation. Nous ne sommes pas
          une compagnie de transport et ne sommes pas responsables du déroulement des trajets.
        </p>
        <ul style={{ color: "#7A8FA8" }} className="space-y-2 text-sm">
          <li>✅ Trajets disponibles visibles en temps réel sur le site et l&apos;app</li>
          <li>✅ Réservation en quelques secondes — depuis le site ou l&apos;application</li>
          <li>✅ Conducteur notifié instantanément à chaque réservation</li>
          <li>✅ Contact direct entre conducteur et passager via WhatsApp</li>
          <li>✅ Passagers peuvent noter leur expérience après le trajet</li>
        </ul>
      </div>

      <div className="text-center">
        <Link
          href="/contact"
          style={{ backgroundColor: "#F5A623" }}
          className="inline-block px-10 py-4 rounded-full text-white font-bold text-lg hover:opacity-90 transition"
        >
          Télécharger l&apos;application
        </Link>
      </div>
    </div>
  );
}
