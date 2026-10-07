"use client";

import { MapPin, Navigation, ExternalLink, ShieldCheck } from "lucide-react";
import type { HealthcareFacility } from "@/types/healthcare";
import { Button } from "@/components/ui/Button";

interface HealthcareMapProps {
  facilities: HealthcareFacility[];
  selectedId?: string;
  onSelectFacility?: (id: string) => void;
  userLat?: number;
  userLng?: number;
}

export function HealthcareMap({
  facilities,
  selectedId,
  onSelectFacility,
  userLat = 28.6139,
  userLng = 77.2090
}: HealthcareMapProps) {
  const selectedFacility = facilities.find((f) => f.id === selectedId) || facilities[0];

  const mapCenterLat = selectedFacility?.latitude || userLat;
  const mapCenterLng = selectedFacility?.longitude || userLng;

  // Generate OpenStreetMap embed iframe URL
  const bboxDelta = 0.03;
  const bbox = `${mapCenterLng - bboxDelta},${mapCenterLat - bboxDelta},${mapCenterLng + bboxDelta},${mapCenterLat + bboxDelta}`;
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${mapCenterLat},${mapCenterLng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
      <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800 sm:h-80">
        <iframe
          title="Healthcare Map View"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src={osmEmbedUrl}
          className="border-0 opacity-90"
        />

        {/* Map Overlay Header */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between rounded-xl bg-white/90 dark:bg-slate-900/90 p-2.5 backdrop-blur shadow-xs border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
            <MapPin size={16} className="text-cyan-600 dark:text-cyan-400" />
            <span>Showing {facilities.length} nearby medical facilities</span>
          </div>

          <a
            href={`https://www.google.com/maps/search/pharmacy+hospital/@${mapCenterLat},${mapCenterLng},14z`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-cyan-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-cyan-700"
          >
            Google Maps <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Selected Facility Details Panel */}
      {selectedFacility && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 dark:text-white">{selectedFacility.name}</h4>
                {selectedFacility.ownershipType === "government" && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                    <ShieldCheck size={12} /> Government
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {selectedFacility.address} {selectedFacility.distance ? `• ${selectedFacility.distance}` : ""}
              </p>
            </div>

            <Button
              size="sm"
              className="bg-cyan-600 text-white hover:bg-cyan-700"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${selectedFacility.latitude},${selectedFacility.longitude}`,
                  "_blank"
                )
              }
            >
              <Navigation size={14} /> Get Directions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
