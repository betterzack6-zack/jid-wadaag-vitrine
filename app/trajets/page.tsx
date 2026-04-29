"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

const VILLES = [
  "Djibouti", "Ali Sabieh", "Arta", "Dikhil", "Obock", "Tadjourah", "Wea",
  "Dire Dawa", "Jigjiga", "Babile", "Borama", "Gabiley", "Hargeisa", "Wajaleh",
];

const TZ = "Africa/Djibouti";

type Trip = {
  id: string;
  villeDepart: string;
  villeDestination: string;
  dateDepart: string;
  placesDisponibles: number;
  tarifParPlace: number;
  devise: string;
  climatise: boolean;
  conducteur: { prenom: string; nom: string; noteMoyenne: number; nombreAvis: number };
  vehicule: { marque: string; modele: string; couleur: string } | null;
};

export default function TrajetsPage() {
  const [allTrips, setAllTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterDepart, setFilterDepart] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    fetch(`${apiUrl}/api/trips/available`)
      .then((r) => r.json())
      .then((data) => setAllTrips(data.trips ?? []))
      .catch(() => setError("Impossible de charger les trajets. Réessayez plus tard."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return allTrips.filter((t) => {
      if (filterDepart && t.villeDepart !== filterDepart) return false;
      if (filterDestination && t.villeDestination !== filterDestination) return false;
      if (filterDate) {
        const tripDate = new Date(t.dateDepart).toLocaleDateString("fr-CA", { timeZone: TZ });
        if (tripDate !== filterDate) return false;
      }
      return true;
    });
  }, [allTrips, filterDepart, filterDestination, filterDate]);

  const hasFilters = filterDepart || filterDestination || filterDate;

  return (
    <div className="max-w-5xl mx-auto px-6 pt-36 pb-16">
      <div className="text-center mb-10">
        <h1 style={{ color: "#1B4F8A" }} className="text-4xl font-extrabold mb-3">
          Trajets disponibles
        </h1>
        <p style={{ color: "#7A8FA8" }}>
          Tous les trajets à venir, du plus proche au plus lointain.
        </p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8" style={{ borderColor: "#DDE6F0" }}>
        <p style={{ color: "#1A2B3C" }} className="text-sm font-semibold mb-4">
          Affiner la recherche
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
              Départ
            </label>
            <select
              value={filterDepart}
              onChange={(e) => {
                setFilterDepart(e.target.value);
                if (e.target.value === filterDestination) setFilterDestination("");
              }}
              className="w-full border rounded-xl px-4 py-3 text-sm"
              style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
            >
              <option value="">Toutes les villes</option>
              {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div>
            <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
              Destination
            </label>
            <select
              value={filterDestination}
              onChange={(e) => setFilterDestination(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm"
              style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
            >
              <option value="">Toutes les destinations</option>
              {VILLES.filter((v) => !filterDepart || v !== filterDepart).map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: "#7A8FA8" }} className="text-xs font-semibold block mb-1">
              Date
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 text-sm"
              style={{ borderColor: "#DDE6F0", color: "#1A2B3C" }}
            />
          </div>
        </div>

        {hasFilters && (
          <button
            onClick={() => { setFilterDepart(""); setFilterDestination(""); setFilterDate(""); }}
            style={{ color: "#7A8FA8" }}
            className="mt-3 text-xs underline hover:opacity-70 transition"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Contenu */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div
            style={{ borderColor: "#1B4F8A", borderTopColor: "transparent" }}
            className="w-10 h-10 rounded-full border-4 animate-spin"
          />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 text-sm py-12">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">{hasFilters ? "🔍" : "🗺️"}</div>
          <p style={{ color: "#1A2B3C" }} className="font-bold text-lg mb-2">
            {hasFilters ? "Aucun trajet pour ces critères" : "Aucun trajet disponible pour le moment"}
          </p>
          <p style={{ color: "#7A8FA8" }} className="text-sm">
            {hasFilters
              ? "Modifiez les filtres pour voir plus de résultats."
              : "De nouveaux trajets sont ajoutés régulièrement. Revenez bientôt !"}
          </p>
          {hasFilters && (
            <button
              onClick={() => { setFilterDepart(""); setFilterDestination(""); setFilterDate(""); }}
              style={{ backgroundColor: "#1B4F8A" }}
              className="mt-6 px-6 py-2 rounded-xl text-white text-sm font-bold hover:opacity-90 transition"
            >
              Voir tous les trajets
            </button>
          )}
        </div>
      ) : (
        <>
          <p style={{ color: "#7A8FA8" }} className="text-sm mb-4">
            {filtered.length} trajet{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
            {hasFilters && <span style={{ color: "#F5A623" }}> · Filtres actifs</span>}
          </p>

          <div className="space-y-4">
            {filtered.map((trip) => {
              const date = new Date(trip.dateDepart);
              const dateStr = date.toLocaleDateString("fr-FR", {
                weekday: "long", day: "numeric", month: "long", timeZone: TZ,
              });
              const timeStr = date.toLocaleTimeString("fr-FR", {
                hour: "2-digit", minute: "2-digit", timeZone: TZ,
              });
              const isFull = trip.placesDisponibles === 0;

              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition"
                  style={{ borderColor: "#DDE6F0" }}
                >
                  {/* Ligne 1 : trajet + tarif */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <span style={{ color: "#1A2B3C" }} className="font-extrabold text-xl">
                          {trip.villeDepart}
                        </span>
                        <span style={{ color: "#F5A623" }} className="font-bold text-xl">→</span>
                        <span style={{ color: "#1A2B3C" }} className="font-extrabold text-xl">
                          {trip.villeDestination}
                        </span>
                        {trip.climatise && (
                          <span
                            style={{ backgroundColor: "#E0F2FE", color: "#0369A1" }}
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                          >
                            ❄️ Climatisé
                          </span>
                        )}
                      </div>
                      <p style={{ color: "#7A8FA8" }} className="text-sm capitalize">
                        {dateStr} à {timeStr}
                      </p>
                      {trip.vehicule && (
                        <p style={{ color: "#7A8FA8" }} className="text-xs mt-0.5">
                          {trip.vehicule.marque} {trip.vehicule.modele} · {trip.vehicule.couleur}
                        </p>
                      )}
                    </div>
                    <div className="sm:text-right flex-shrink-0">
                      <p style={{ color: "#1B4F8A" }} className="text-2xl font-extrabold">
                        {trip.tarifParPlace.toLocaleString()} {trip.devise}
                      </p>
                      <p style={{ color: "#7A8FA8" }} className="text-xs">par place</p>
                    </div>
                  </div>

                  {/* Ligne 2 : conducteur + places + bouton */}
                  <div
                    className="flex items-center justify-between pt-4 border-t"
                    style={{ borderColor: "#DDE6F0" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{ backgroundColor: "#E8F0FA", color: "#1B4F8A" }}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
                      >
                        {trip.conducteur.prenom[0]}{trip.conducteur.nom[0]}
                      </div>
                      <div>
                        <p style={{ color: "#1A2B3C" }} className="text-sm font-semibold">
                          {trip.conducteur.prenom} {trip.conducteur.nom}
                        </p>
                        <div className="flex items-center gap-2">
                          <span style={{ color: "#F5A623" }} className="text-xs font-semibold">
                            ★ {trip.conducteur.noteMoyenne > 0 ? trip.conducteur.noteMoyenne.toFixed(1) : "—"}
                          </span>
                          <span
                            style={{
                              backgroundColor: isFull ? "#F3F4F6" : "#DCFCE7",
                              color: isFull ? "#6B7280" : "#16A34A",
                            }}
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                          >
                            {isFull ? "Complet" : `${trip.placesDisponibles} place${trip.placesDisponibles > 1 ? "s" : ""}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/trajets/${trip.id}`}
                      style={{ backgroundColor: "#1B4F8A" }}
                      className="px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition flex-shrink-0"
                    >
                      Voir détails →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
