"use client";

import { useState } from "react";
import { MapPin, Navigation, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LocationPermissionProps {
  onLocationDetected: (lat: number, lng: number) => void;
  onError?: (errMessage: string) => void;
}

export function LocationPermission({ onLocationDetected, onError }: LocationPermissionProps) {
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function requestLocation() {
    if (!navigator.geolocation) {
      const msg = "Geolocation is not supported by your browser. Please search using your city or PIN code.";
      setError(msg);
      onError?.(msg);
      return;
    }

    setRequesting(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRequesting(false);
        onLocationDetected(position.coords.latitude, position.coords.longitude);
      },
      (err) => {
        setRequesting(false);
        let msg = "Could not access location.";
        if (err.code === err.PERMISSION_DENIED) {
          msg = "Location permission was denied. Search using your city, area, or PIN code instead.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = "Location information unavailable. Search using your city or PIN code.";
        } else if (err.code === err.TIMEOUT) {
          msg = "Location request timed out. Please try again or search manually.";
        }
        setError(msg);
        onError?.(msg);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  return (
    <div className="rounded-2xl border border-cyan-200 dark:border-cyan-500/30 bg-cyan-50/60 dark:bg-cyan-950/40 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-600 text-white">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-cyan-200">Find centers near you</h4>
            <p className="text-xs text-slate-600 dark:text-cyan-400">
              Use your device location for exact distance or search manually below.
            </p>
          </div>
        </div>

        <Button
          onClick={requestLocation}
          disabled={requesting}
          className="shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Navigation size={16} className={requesting ? "animate-spin" : ""} />
          {requesting ? "Detecting..." : "Use My Location"}
        </Button>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-2.5 text-xs text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
