"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const TZ = "Africa/Djibouti";

type Trip = {
  id: string;
  villeDepart: string;
  villeDestination: string;
  dateDepart: string;
  placesDisponibles: number;
  placesTotales: number;
  tarifParPlace: number;
  devise: string;
  pointRdv: string | null;
  commentaires: string | null;
  climatise: boolean;
  conducteur: {
    prenom: string;
    nom: string;
    noteMoyenne: number;
    nombreAvis: number;
    photoProfile: string | null;
  };
  vehicule: {
    marque: string;
    modele: string;
    couleur: string;
    plaque: string;
  } | null;
};

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    fetch(`${apiUrl}/api/trips/${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => setTrip(data.trip))
      .catch(() => setError("Trajet introuvable ou non disponible."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div
          style={{ borderColor: "#1B4F8A", borderTopColor: "transparent" }}
          className="w-10 h-10 rounded-full border-4 animate-spin"
        />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="text-center py-32">
        <p style={{ color: "#1A2B3C" }} className="font-bold text-xl mb-4">😕 {error}</p>
        <button onClick={() => router.back()} style={{ color: "#1B4F8A" }} className="underline text-sm">
          ← Retour aux trajets
        </button>
      </div>
    );
  }

  const dateDepart = new Date(trip.dateDepart);
  const dateStr = dateDepart.toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ,
  });
  const timeStr = dateDepart.toLocaleTimeString("fr-FR", {
    hour: "2-digit", minute: "2-digit", timeZone: TZ,
  });
  const isFull = trip.placesDisponibles === 0;
  const initials = `${trip.conducteur.prenom[0] ?? ""}${trip.conducteur.nom?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-6 py-28">
      <button
        onClick={() => router.back()}
        style={{ color: "#1B4F8A" }}
        className="text-sm mb-8 hover:underline flex items-center gap-1"
      >
        ← Retour aux trajets
      </button>

      {/* Header trajet */}
      <div
        style={{ background: "linear-gradient(135deg, #1B4F8A 0%, #162F5A 100%)" }}
        className="rounded-2xl p-8 text-white mb-6"
      >
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-2xl font-extrabold">{trip.villeDepart}</span>
          <span style={{ color: "#F5A623" }} className="text-2xl font-extrabold">→</span>
          <span className="text-2xl font-extrabold">{trip.villeDestination}</span>
        </div>
        <p className="text-white/70 text-sm capitalize">{dateStr} à {timeStr}</p>

        <div className="mt-4 flex gap-3 flex-wrap">
          <span style={{ backgroundColor: "rgba(255,255,255,0.15)" }} className="px-3 py-1.5 rounded-full text-sm font-semibold">
            💺 {isFull ? "Complet" : `${trip.placesDisponibles} place${trip.placesDisponibles > 1 ? "s" : ""} dispo`}
          </span>
          {trip.climatise && (
            <span style={{ backgroundColor: "rgba(255,255,255,0.15)" }} className="px-3 py-1.5 rounded-full text-sm font-semibold">
              ❄️ Climatisé
            </span>
          )}
          <span style={{ backgroundColor: "#F5A623" }} className="px-3 py-1.5 rounded-full text-sm font-bold">
            {trip.tarifParPlace.toLocaleString()} {trip.devise} / place
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        {/* Conducteur */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: "#DDE6F0" }}>
          <h3 style={{ color: "#7A8FA8" }} className="text-xs font-semibold uppercase mb-3">Conducteur</h3>
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: "#E8F0FA", color: "#1B4F8A" }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-extrabold flex-shrink-0"
            >
              {initials}
            </div>
            <div>
              <p style={{ color: "#1A2B3C" }} className="font-bold">
                {trip.conducteur.prenom} {trip.conducteur.nom}
              </p>
              <p style={{ color: "#F5A623" }} className="text-sm">
                ★ {trip.conducteur.noteMoyenne > 0 ? trip.conducteur.noteMoyenne.toFixed(1) : "—"}
                <span style={{ color: "#7A8FA8" }}> · {trip.conducteur.nombreAvis} avis</span>
              </p>
            </div>
          </div>
        </div>

        {/* Véhicule */}
        {trip.vehicule && (
          <div className="bg-white rounded-2xl p-6 border shadow-sm" style={{ borderColor: "#DDE6F0" }}>
            <h3 style={{ color: "#7A8FA8" }} className="text-xs font-semibold uppercase mb-3">Véhicule</h3>
            <p style={{ color: "#1A2B3C" }} className="font-bold">
              {trip.vehicule.marque} {trip.vehicule.modele}
            </p>
            <p style={{ color: "#7A8FA8" }} className="text-sm">{trip.vehicule.couleur}</p>
            <p style={{ color: "#7A8FA8" }} className="text-sm">{trip.vehicule.plaque}</p>
          </div>
        )}
      </div>

      {/* Point de RDV + commentaires */}
      {(trip.pointRdv || trip.commentaires) && (
        <div className="bg-white rounded-2xl p-6 border shadow-sm mb-6" style={{ borderColor: "#DDE6F0" }}>
          {trip.pointRdv && (
            <div className="mb-4">
              <p style={{ color: "#7A8FA8" }} className="text-xs font-semibold uppercase mb-1">
                Point de rendez-vous
              </p>
              <p style={{ color: "#1A2B3C" }} className="font-medium">📍 {trip.pointRdv}</p>
            </div>
          )}
          {trip.commentaires && (
            <div>
              <p style={{ color: "#7A8FA8" }} className="text-xs font-semibold uppercase mb-1">
                Commentaires du conducteur
              </p>
              <p style={{ color: "#1A2B3C" }} className="text-sm leading-relaxed">
                {trip.commentaires}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bloc réservation → télécharger l'app */}
      <div
        style={{ background: "linear-gradient(135deg, #FEF3DC 0%, #FFF8ED 100%)", borderColor: "#F5A623" }}
        className="rounded-2xl p-6 border-2 text-center"
      >
        <div className="text-4xl mb-3">📱</div>
        <h3 style={{ color: "#1A2B3C" }} className="text-xl font-extrabold mb-2">
          {isFull ? "Ce trajet est complet" : "Réservez depuis l'application"}
        </h3>
        <p style={{ color: "#7A8FA8" }} className="text-sm mb-5 leading-relaxed">
          {isFull
            ? "Ce trajet n'a plus de places disponibles. Consultez les autres trajets ou téléchargez l'application pour être alerté."
            : "La réservation se fait exclusivement via l'application JID WADAAG. Téléchargez-la gratuitement pour réserver votre place en quelques secondes."}
        </p>
        <a
          href="https://wa.me/25377037305?text=Bonjour%2C%20je%20veux%20t%C3%A9l%C3%A9charger%20l%27application%20JID%20WADAAG"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#F5A623" }}
          className="inline-block px-8 py-3.5 rounded-xl text-white font-bold text-base hover:opacity-90 transition shadow-md"
        >
          📲 Obtenir l&apos;application
        </a>
        <p style={{ color: "#7A8FA8" }} className="text-xs mt-3">
          Disponible sur Android · Gratuit
        </p>
      </div>
    </div>
  );
}
