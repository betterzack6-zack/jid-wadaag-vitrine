"use client";

import { useState } from "react";
import Link from "next/link";

const VILLES = [
  "Djibouti",
  "Ali Sabieh",
  "Arta",
  "Dikhil",
  "Obock",
  "Tadjourah",
  "Wea",
  "Dire Dawa",
  "Jigjiga",
  "Babile",
  "Borama",
  "Gabiley",
  "Hargeisa",
  "Wajaleh",
];

type Trip = {
  id: string;
  villeDepart: string;
  villeDestination: string;
  dateDepart: string;
  placesDisponibles: number;
  tarifParPlace: number;
  devise: string;
  conducteur: { prenom: string; rating: number | null; reviewCount: number };
  vehicule: { marque: string; modele: string; couleur: string } | null;
};

export default function TrajetsPage() {
  const [villeDepart, setVilleDepart] = useState("Djibouti");
  const [villeDestination, setVilleDestination] = useState("");
  const [date, setDate] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!villeDestination) return;

    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const params = new URLSearchParams({
        villeDepart,
        villeDestination,
        ...(date && { date }),
      });
      const res = await fetch(`${apiUrl}/api/trips/search?${params}`);
      if (!res.ok) {
        setError(`Erreur serveur (${res.status}). Vérifiez que le backend est démarré.`);
        return;
      }
      const data = await res.json();
      setTrips(data.trips ?? []);
      setSearched(true);
    } catch {
      setError("Impossible de contacter le serveur. Vérifiez que le backend tourne sur le port 3000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-36 pb-16">
      <div className="text-center mb-12">
        <h1 style={{ color: "#1B4F8A" }} className="text-4xl font-extrabold mb-4">
          Trouver un trajet
        </h1>
        <p style={{ color: "#7A8FA8" }}>
          Recherchez parmi les trajets disponibles et réservez votre place.
        </p>
      </div>

      {/* Formulaire de recherche */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl p-6 shadow-sm border mb-10"
        style={{ borderColor: "#DDE6F0" }}
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
              Départ
            </label>
            <select
              value={villeDepart}
              onChange={(e) => setVilleDepart(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm"
              style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
            >
              {VILLES.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
              Destination
            </label>
            <select
              value={villeDestination}
              onChange={(e) => setVilleDestination(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm"
              style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
              required
            >
              <option value="">Choisir une ville</option>
              {VILLES.filter((v) => v !== villeDepart).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
              Date (optionnel)
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm"
              style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!villeDestination || loading}
          style={{ backgroundColor: !villeDestination || loading ? "#DDE6F0" : "#1B4F8A" }}
          className="mt-4 w-full py-3 rounded-xl text-white font-bold text-sm transition"
        >
          {loading ? "Recherche en cours..." : "Rechercher"}
        </button>
      </form>

      {error && (
        <p className="text-center text-red-500 text-sm mb-6">{error}</p>
      )}

      {/* Résultats */}
      {searched && (
        <>
          {trips.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">😕</div>
              <p style={{ color: "#1A2B3C" }} className="font-bold text-lg mb-2">
                Aucun trajet disponible
              </p>
              <p style={{ color: "#7A8FA8" }} className="text-sm">
                Essayez une autre date ou destination.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p style={{ color: "#7A8FA8" }} className="text-sm mb-4">
                {trips.length} trajet{trips.length > 1 ? "s" : ""} trouvé{trips.length > 1 ? "s" : ""}
              </p>
              {trips.map((trip) => (
                <Link
                  key={trip.id}
                  href={`/trajets/${trip.id}`}
                  className="block bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition"
                  style={{ borderColor: "#DDE6F0" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ color: "#1A2B3C" }} className="font-extrabold text-lg">
                          {trip.villeDepart}
                        </span>
                        <span style={{ color: "#F5A623" }} className="font-bold">→</span>
                        <span style={{ color: "#1A2B3C" }} className="font-extrabold text-lg">
                          {trip.villeDestination}
                        </span>
                      </div>
                      <p style={{ color: "#7A8FA8" }} className="text-sm">
                        {new Date(trip.dateDepart).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p style={{ color: "#7A8FA8" }} className="text-sm mt-1">
                        Conducteur : <span style={{ color: "#1A2B3C" }} className="font-semibold">{trip.conducteur.prenom}</span>
                        {trip.conducteur.rating && (
                          <span className="ml-2">⭐ {trip.conducteur.rating.toFixed(1)}</span>
                        )}
                      </p>
                      {trip.vehicule && (
                        <p style={{ color: "#7A8FA8" }} className="text-xs mt-0.5">
                          {trip.vehicule.marque} {trip.vehicule.modele} · {trip.vehicule.couleur}
                        </p>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1">
                      <div style={{ color: "#1B4F8A" }} className="text-2xl font-extrabold">
                        {trip.tarifParPlace.toLocaleString()} {trip.devise}
                      </div>
                      <div
                        style={{ backgroundColor: "#E8F0FA", color: "#1B4F8A" }}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {trip.placesDisponibles} place{trip.placesDisponibles > 1 ? "s" : ""}
                      </div>
                      <div
                        style={{ backgroundColor: "#F5A623" }}
                        className="px-4 py-2 rounded-full text-white text-sm font-bold"
                      >
                        Voir le trajet →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
