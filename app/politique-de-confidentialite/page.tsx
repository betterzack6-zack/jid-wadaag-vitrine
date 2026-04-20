export default function PolitiqueConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 style={{ color: "#1B4F8A" }} className="text-4xl font-extrabold mb-2">
        Politique de confidentialité
      </h1>
      <p style={{ color: "#7A8FA8" }} className="text-sm mb-12">
        Dernière mise à jour : avril 2026
      </p>

      <div className="space-y-10">

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            1. Qui sommes-nous ?
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed">
            Jid Wadaag est une plateforme de mise en relation entre conducteurs
            et passagers pour les trajets inter-cités au départ de Djibouti.
            Nous ne sommes pas une compagnie de transport. Nous facilitons la
            connexion entre les parties, sans intervenir dans le déroulement
            des trajets.
          </p>
        </section>

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            2. Données collectées
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed mb-4">
            Nous collectons uniquement les données nécessaires au fonctionnement
            de la plateforme :
          </p>
          <div className="space-y-3">
            {[
              {
                titre: "Passagers",
                items: [
                  "Prénom",
                  "Numéro de téléphone (pour l'authentification par SMS et le contact avec le conducteur)",
                  "Historique des réservations",
                ],
              },
              {
                titre: "Conducteurs",
                items: [
                  "Prénom et nom",
                  "Numéro de téléphone",
                  "Email (optionnel)",
                  "Ville de résidence",
                  "Informations sur le véhicule (marque, modèle, couleur)",
                  "Photo de profil (optionnelle)",
                  "Trajets publiés et réservations reçues",
                  "Note moyenne et avis",
                ],
              },
            ].map((cat) => (
              <div
                key={cat.titre}
                className="bg-white rounded-2xl p-5 border"
                style={{ borderColor: "#DDE6F0" }}
              >
                <p style={{ color: "#1A2B3C" }} className="font-bold text-sm mb-2">
                  {cat.titre}
                </p>
                <ul className="space-y-1">
                  {cat.items.map((item) => (
                    <li key={item} style={{ color: "#7A8FA8" }} className="text-sm flex gap-2">
                      <span style={{ color: "#F5A623" }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            3. Comment nous utilisons vos données
          </h2>
          <ul className="space-y-2">
            {[
              "Authentifier les utilisateurs via un code SMS (OTP) — aucun mot de passe stocké",
              "Mettre en relation conducteurs et passagers pour un trajet donné",
              "Notifier le conducteur lors d'une nouvelle réservation",
              "Permettre aux passagers de noter leur expérience après le trajet",
              "Améliorer le fonctionnement de la plateforme",
            ].map((item) => (
              <li key={item} style={{ color: "#7A8FA8" }} className="text-sm flex gap-2">
                <span style={{ color: "#1B4F8A" }}>✅</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            4. Partage des données
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed">
            Nous ne vendons jamais vos données à des tiers. Vos informations
            sont partagées uniquement dans les cas suivants :
          </p>
          <ul className="mt-3 space-y-2">
            {[
              "Le prénom du passager est visible par le conducteur lors d'une réservation",
              "Le numéro du conducteur est partagé avec le passager une fois la réservation acceptée (via WhatsApp)",
              "Les notes et avis sont affichés publiquement sur le profil du conducteur",
            ].map((item) => (
              <li key={item} style={{ color: "#7A8FA8" }} className="text-sm flex gap-2">
                <span style={{ color: "#F5A623" }}>•</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            5. Paiements
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed">
            Jid Wadaag ne collecte et ne stocke aucune donnée bancaire ou de
            paiement. Les transactions financières se font directement entre le
            conducteur et le passager, en dehors de la plateforme.
          </p>
        </section>

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            6. Conservation des données
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed">
            Vos données sont conservées aussi longtemps que votre compte est
            actif sur la plateforme. Vous pouvez demander la suppression de
            votre compte et de vos données à tout moment en nous contactant
            via WhatsApp ou par email.
          </p>
        </section>

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            7. Sécurité
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed">
            Nous mettons en place des mesures techniques pour protéger vos
            données : authentification par SMS sans mot de passe, connexions
            chiffrées (HTTPS), base de données sécurisée. Cependant, aucun
            système n&apos;est infaillible — nous vous encourageons à nous signaler
            tout problème de sécurité.
          </p>
        </section>

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            8. Vos droits
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed mb-3">
            Vous avez le droit de :
          </p>
          <ul className="space-y-2">
            {[
              "Accéder à vos données personnelles",
              "Corriger des informations inexactes",
              "Demander la suppression de votre compte",
              "Vous opposer au traitement de vos données",
            ].map((item) => (
              <li key={item} style={{ color: "#7A8FA8" }} className="text-sm flex gap-2">
                <span style={{ color: "#1B4F8A" }}>•</span> {item}
              </li>
            ))}
          </ul>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed mt-3">
            Pour exercer ces droits, contactez-nous via WhatsApp au{" "}
            <a
              href="https://wa.me/25377037305"
              style={{ color: "#1B4F8A" }}
              className="font-semibold underline"
            >
              +253 77 03 73 05
            </a>{" "}
            ou par email à{" "}
            <a
              href="mailto:contact@jidwadaag.com"
              style={{ color: "#1B4F8A" }}
              className="font-semibold underline"
            >
              contact@jidwadaag.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold mb-3">
            9. Modifications
          </h2>
          <p style={{ color: "#7A8FA8" }} className="text-sm leading-relaxed">
            Nous pouvons mettre à jour cette politique à tout moment. La date
            de dernière mise à jour est indiquée en haut de cette page. En
            continuant à utiliser Jid Wadaag après une mise à jour, vous
            acceptez la nouvelle politique.
          </p>
        </section>

      </div>
    </div>
  );
}
