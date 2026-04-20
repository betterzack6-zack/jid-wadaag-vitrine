export default function ContactPage() {
  const whatsappUrl =
    "https://wa.me/25377037305?text=" +
    encodeURIComponent(
      "Bonjour, je souhaite en savoir plus sur l'application Jid Wadaag."
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 style={{ color: "#1B4F8A" }} className="text-4xl font-extrabold mb-4">
          Contactez-nous
        </h1>
        <p style={{ color: "#7A8FA8" }} className="text-lg">
          Une question ? On vous répond rapidement sur WhatsApp.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-4 bg-white rounded-2xl p-8 border shadow-sm hover:shadow-md transition text-center"
          style={{ borderColor: "#DDE6F0" }}
        >
          <div className="text-5xl">💬</div>
          <div>
            <h3 style={{ color: "#1A2B3C" }} className="font-extrabold text-lg mb-1">
              WhatsApp
            </h3>
            <p style={{ color: "#7A8FA8" }} className="text-sm mb-3">
              La façon la plus rapide de nous joindre.
            </p>
            <span
              style={{ backgroundColor: "#25D366", color: "white" }}
              className="inline-block px-5 py-2 rounded-full text-sm font-bold"
            >
              +253 77 03 73 05
            </span>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:contact@jidwadaag.com"
          className="flex flex-col items-center gap-4 bg-white rounded-2xl p-8 border shadow-sm hover:shadow-md transition text-center"
          style={{ borderColor: "#DDE6F0" }}
        >
          <div className="text-5xl">✉️</div>
          <div>
            <h3 style={{ color: "#1A2B3C" }} className="font-extrabold text-lg mb-1">
              Email
            </h3>
            <p style={{ color: "#7A8FA8" }} className="text-sm mb-3">
              Pour les demandes partenariats ou conducteurs.
            </p>
            <span
              style={{ backgroundColor: "#E8F0FA", color: "#1B4F8A" }}
              className="inline-block px-5 py-2 rounded-full text-sm font-bold"
            >
              contact@jidwadaag.com
            </span>
          </div>
        </a>
      </div>

      {/* Télécharger l'app */}
      <div
        style={{ background: "linear-gradient(135deg, #1B4F8A 0%, #162F5A 100%)" }}
        className="rounded-2xl p-10 text-center text-white"
      >
        <h2 className="text-2xl font-extrabold mb-3">📱 Télécharger l&apos;application</h2>
        <p className="text-white/70 mb-8 text-sm">
          Contactez-nous sur WhatsApp pour obtenir le lien de téléchargement.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#F5A623" }}
          className="inline-block px-10 py-4 rounded-full text-white font-bold text-lg hover:opacity-90 transition shadow-xl"
        >
          Obtenir le lien →
        </a>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 style={{ color: "#1B4F8A" }} className="text-2xl font-extrabold mb-6">
          Questions fréquentes
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Jid Wadaag est-il une compagnie de transport ?",
              r: "Non. Jid Wadaag est une plateforme de mise en relation. Nous connectons les conducteurs qui ont de la place avec les passagers qui cherchent un trajet. Nous ne sommes pas responsables du déroulement des trajets.",
            },
            {
              q: "L'application est-elle gratuite ?",
              r: "Oui, totalement gratuite pour les passagers. Les conducteurs paient une commission de 5% sur leurs revenus via la plateforme.",
            },
            {
              q: "Comment fonctionne l'authentification ?",
              r: "Par SMS uniquement — pas de mot de passe. Vous recevez un code à 6 chiffres à chaque connexion. Simple et rapide.",
            },
            {
              q: "Comment payer le trajet ?",
              r: "Le paiement se règle directement entre le conducteur et le passager. Jid Wadaag ne gère pas les transactions financières.",
            },
            {
              q: "L'app fonctionne-t-elle hors de Djibouti ?",
              r: "L'application est conçue pour les trajets au départ ou à destination de Djibouti. Elle couvre aussi les villes voisines comme Dire Dawa, Hargeisa et Jigjiga.",
            },
          ].map((faq) => (
            <div
              key={faq.q}
              className="bg-white rounded-2xl p-6 border shadow-sm"
              style={{ borderColor: "#DDE6F0" }}
            >
              <h4 style={{ color: "#1A2B3C" }} className="font-bold mb-2">
                {faq.q}
              </h4>
              <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed">
                {faq.r}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
