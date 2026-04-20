"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
    telephone: string;
    rating: number | null;
    reviewCount: number;
    photo: string | null;
  };
  vehicule: {
    marque: string;
    modele: string;
    couleur: string;
    photo: string | null;
  } | null;
};

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Formulaire réservation
  const [showForm, setShowForm] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nombrePlaces, setNombrePlaces] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${apiUrl}/api/trips/${id}`);
        if (!res.ok) throw new Error("Trajet introuvable");
        const data = await res.json();
        setTrip(data.trip);
      } catch {
        setError("Trajet introuvable ou non disponible.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);

  const handleReserver = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const localNumber = telephone.trim().replace(/^\+253/, "").replace(/\s/g, "");
    if (!/^77\d{6}$/.test(localNumber)) {
      setFormError("Le numéro doit être au format 77 XX XX XX (8 chiffres commençant par 77).");
      return;
    }

    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const res = await fetch(`${apiUrl}/api/bookings/web`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trajetId: id,
          telephone: telephone.trim(),
          prenom: prenom.trim(),
          nombrePlaces,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.message ?? "Une erreur est survenue.");
        return;
      }

      setSuccess(true);
      setShowForm(false);
    } catch {
      setFormError("Impossible de contacter le serveur. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

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
        <button
          onClick={() => router.back()}
          style={{ color: "#1B4F8A" }}
          className="underline text-sm"
        >
          ← Retour aux trajets
        </button>
      </div>
    );
  }

  const dateDepart = new Date(trip.dateDepart);
  const totalPrix = trip.tarifParPlace * nombrePlaces;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <button
        onClick={() => router.back()}
        style={{ color: "#1B4F8A" }}
        className="text-sm mb-8 hover:underline"
      >
        ← Retour aux trajets
      </button>

      {/* Alerte succès */}
      {success && (
        <div
          style={{ backgroundColor: "#E8F0FA", borderColor: "#1B4F8A" }}
          className="border-l-4 rounded-xl p-6 mb-8"
        >
          <h3 style={{ color: "#1B4F8A" }} className="font-extrabold text-lg mb-2">
            ✅ Réservation envoyée !
          </h3>
          <p style={{ color: "#1A2B3C" }} className="text-sm leading-relaxed">
            Votre demande a bien été transmise au conducteur. Il va examiner
            votre demande et vous recontactera prochainement.
          </p>
        </div>
      )}

      {/* Header trajet */}
      <div
        style={{ background: "linear-gradient(135deg, #1B4F8A 0%, #162F5A 100%)" }}
        className="rounded-2xl p-8 text-white mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl font-extrabold">{trip.villeDepart}</span>
          <span style={{ color: "#F5A623" }} className="text-2xl font-extrabold">→</span>
          <span className="text-2xl font-extrabold">{trip.villeDestination}</span>
        </div>
        <p className="text-white/70 text-sm">
          {dateDepart.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          à{" "}
          {dateDepart.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
        </p>
        <div className="mt-4 flex gap-4 flex-wrap">
          <span style={{ backgroundColor: "rgba(255,255,255,0.15)" }} className="px-3 py-1 rounded-full text-sm">
            💺 {trip.placesDisponibles} place{trip.placesDisponibles > 1 ? "s" : ""} dispo
          </span>
          {trip.climatise && (
            <span style={{ backgroundColor: "rgba(255,255,255,0.15)" }} className="px-3 py-1 rounded-full text-sm">
              ❄️ Climatisé
            </span>
          )}
          <span style={{ backgroundColor: "#F5A623" }} className="px-3 py-1 rounded-full text-sm font-bold">
            {trip.tarifParPlace.toLocaleString()} {trip.devise} / place
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {/* Conducteur */}
        <div
          className="bg-white rounded-2xl p-6 border shadow-sm"
          style={{ borderColor: "#DDE6F0" }}
        >
          <h3 style={{ color: "#7A8FA8" }} className="text-xs font-semibold uppercase mb-3">
            Conducteur
          </h3>
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: "#E8F0FA", color: "#1B4F8A" }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-extrabold"
            >
              {trip.conducteur.prenom.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ color: "#1A2B3C" }} className="font-bold">
                {trip.conducteur.prenom}
              </p>
              {trip.conducteur.rating ? (
                <p style={{ color: "#7A8FA8" }} className="text-sm">
                  ⭐ {trip.conducteur.rating.toFixed(1)} ({trip.conducteur.reviewCount} avis)
                </p>
              ) : (
                <p style={{ color: "#7A8FA8" }} className="text-sm">Pas encore d&apos;avis</p>
              )}
            </div>
          </div>
        </div>

        {/* Véhicule */}
        {trip.vehicule && (
          <div
            className="bg-white rounded-2xl p-6 border shadow-sm"
            style={{ borderColor: "#DDE6F0" }}
          >
            <h3 style={{ color: "#7A8FA8" }} className="text-xs font-semibold uppercase mb-3">
              Véhicule
            </h3>
            <p style={{ color: "#1A2B3C" }} className="font-bold">
              {trip.vehicule.marque} {trip.vehicule.modele}
            </p>
            <p style={{ color: "#7A8FA8" }} className="text-sm">{trip.vehicule.couleur}</p>
          </div>
        )}
      </div>

      {/* Infos supplémentaires */}
      {(trip.pointRdv || trip.commentaires) && (
        <div
          className="bg-white rounded-2xl p-6 border shadow-sm mb-8"
          style={{ borderColor: "#DDE6F0" }}
        >
          {trip.pointRdv && (
            <div className="mb-3">
              <span style={{ color: "#7A8FA8" }} className="text-xs font-semibold uppercase">
                Point de rendez-vous
              </span>
              <p style={{ color: "#1A2B3C" }} className="font-medium mt-1">{trip.pointRdv}</p>
            </div>
          )}
          {trip.commentaires && (
            <div>
              <span style={{ color: "#7A8FA8" }} className="text-xs font-semibold uppercase">
                Commentaires
              </span>
              <p style={{ color: "#1A2B3C" }} className="text-sm mt-1 leading-relaxed">
                {trip.commentaires}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bouton réserver */}
      {!success && trip.placesDisponibles > 0 && (
        <button
          onClick={() => setShowForm(true)}
          style={{ backgroundColor: "#F5A623" }}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition shadow-lg"
        >
          Réserver ma place
        </button>
      )}

      {trip.placesDisponibles === 0 && (
        <div
          style={{ backgroundColor: "#FEF3DC", color: "#F5A623" }}
          className="text-center rounded-2xl py-4 font-bold"
        >
          Complet — Plus de places disponibles
        </div>
      )}

      {/* Modal formulaire réservation */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ color: "#1B4F8A" }} className="text-xl font-extrabold">
                Réserver une place
              </h2>
              <button
                onClick={() => { setShowForm(false); setFormError(""); }}
                style={{ color: "#7A8FA8" }}
                className="text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div
              style={{ backgroundColor: "#E8F0FA" }}
              className="rounded-xl px-4 py-3 text-sm mb-6"
            >
              <span style={{ color: "#1B4F8A" }} className="font-semibold">
                {trip.villeDepart} → {trip.villeDestination}
              </span>
              <span style={{ color: "#7A8FA8" }} className="ml-2">
                · {dateDepart.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
              </span>
            </div>

            <form onSubmit={handleReserver} className="space-y-4">
              <div>
                <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Ex: Ahmed"
                  required
                  className="w-full border rounded-xl px-4 py-3 text-sm"
                  style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
                />
              </div>

              <div>
                <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="77 XX XX XX"
                  maxLength={8}
                  required
                  className="w-full border rounded-xl px-4 py-3 text-sm"
                  style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
                />
                <p style={{ color: "#7A8FA8" }} className="text-xs mt-1">
                  Format : 77 XX XX XX — 8 chiffres
                </p>
              </div>

              <div>
                <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
                  Nombre de places
                </label>
                <select
                  value={nombrePlaces}
                  onChange={(e) => setNombrePlaces(parseInt(e.target.value))}
                  className="w-full border rounded-xl px-4 py-3 text-sm"
                  style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
                >
                  {Array.from({ length: trip.placesDisponibles }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n} place{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              {/* Récap prix */}
              <div
                style={{ backgroundColor: "#FEF3DC" }}
                className="rounded-xl px-4 py-3 flex justify-between items-center"
              >
                <span style={{ color: "#7A8FA8" }} className="text-sm">Total estimé</span>
                <span style={{ color: "#F5A623" }} className="font-extrabold text-lg">
                  {totalPrix.toLocaleString()} {trip.devise}
                </span>
              </div>

              {formError && (
                <p className="text-red-500 text-sm">{formError}</p>
              )}

              <button
                type="submit"
                disabled={submitting || !prenom || !telephone}
                style={{
                  backgroundColor: submitting || !prenom || !telephone ? "#DDE6F0" : "#1B4F8A",
                }}
                className="w-full py-4 rounded-xl text-white font-bold text-sm transition"
              >
                {submitting ? "Envoi en cours..." : "Confirmer la réservation"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
