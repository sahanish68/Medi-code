"use client";

import { useEffect, useState } from "react";
import { Hospital, MapPin, Search } from "lucide-react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/Button";
import { HealthcareList } from "./HealthcareList";
import { HealthcareMap } from "./HealthcareMap";
import { LocationPermission } from "./LocationPermission";
import { searchNearbyHealthcare } from "../services/healthcareLocatorService";
import type { HealthcareFacility } from "@/types/healthcare";

export function HealthcarePage() {
  const [location, setLocation] = useState("");
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 28.6139, lng: 77.2090 });
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>();

  async function performSearch(queryStr?: string, lat?: number, lng?: number) {
    setLoading(true);
    try {
      const targetQuery = queryStr !== undefined ? queryStr : location;
      const res = await searchNearbyHealthcare({
        location: targetQuery,
        latitude: lat ?? (targetQuery ? undefined : coords.lat),
        longitude: lng ?? (targetQuery ? undefined : coords.lng)
      });

      setFacilities(res.facilities);
      setCoords({ lat: res.centerLat, lng: res.centerLng });

      if (res.facilities.length > 0) {
        setSelectedFacilityId(res.facilities[0].id);
      }
    } catch (err) {
      console.error("Failed to search healthcare facilities:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    performSearch("", 28.6139, 77.2090);
  }, []);

  function handleLocationDetected(lat: number, lng: number) {
    setCoords({ lat, lng });
    performSearch(location, lat, lng);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PageTitle
        title="Nearby Healthcare & Pharmacies"
        description="Locate Jan Aushadhi Kendras, 24/7 pharmacies, hospitals, and emergency clinics in any city."
        icon={Hospital}
      />

      {/* Geolocation permission prompt */}
      <LocationPermission onLocationDetected={handleLocationDetected} />

      {/* Search Input Box */}
      <section className="rounded-3xl border border-slate-200 dark:border-cyan-500/20 bg-white dark:bg-slate-950/80 p-6 backdrop-blur-2xl shadow-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            performSearch();
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400" size={18} />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter any Indian city, area name, or PIN code (e.g. Mumbai, Bangalore, Jaipur, 400001)..."
              className="w-full rounded-xl border border-slate-300 dark:border-cyan-500/30 bg-slate-50 dark:bg-slate-900/80 py-3 pl-10 pr-4 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none backdrop-blur-md"
            />
          </div>
          <Button type="submit" disabled={loading} variant="glow">
            <Search size={17} /> {loading ? "Searching..." : "Search Facilities"}
          </Button>
        </form>
      </section>

      {/* Interactive Map view centered on geocoded location */}
      {facilities.length > 0 && (
        <HealthcareMap
          facilities={facilities}
          selectedId={selectedFacilityId}
          userLat={coords.lat}
          userLng={coords.lng}
        />
      )}

      {/* Facility List with filtering */}
      <HealthcareList
        facilities={facilities}
        selectedId={selectedFacilityId}
        onSelectFacility={setSelectedFacilityId}
      />
    </div>
  );
}
