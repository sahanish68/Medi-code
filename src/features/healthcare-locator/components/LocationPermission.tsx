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
    <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-600 text-white">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-teal-900">Find centers near you</h4>
            <p className="text-xs text-teal-700">
              Use your device location for exact distance or search manually below.
            </p>
          </div>
        </div>

        <Button
          onClick={requestLocation}
          disabled={requesting}
          className="shrink-0 bg-teal-700 hover:bg-teal-800 text-white"
        >
          <Navigation size={16} className={requesting ? "animate-spin" : ""} />
          {requesting ? "Detecting..." : "Use My Location"}
        </Button>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs text-red-700 border border-red-200">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
