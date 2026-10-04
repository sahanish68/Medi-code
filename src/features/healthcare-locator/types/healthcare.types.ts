export type FacilityType = "pharmacy" | "hospital" | "clinic" | "medical_centre";
export type OwnershipType = "government" | "private" | "unknown";

export interface HealthcareFacility {
  id: string;
  name: string;
  facilityType: FacilityType;
  ownershipType: OwnershipType;
  address: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  distance?: string;
  distanceKm?: number;
  isOpen?: boolean;
  source?: string;
  externalPlaceId?: string;
  isJanAushadhi?: boolean;
}

export interface HealthcareSearchParams {
  location?: string;
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  type?: FacilityType | "all";
  ownership?: OwnershipType | "all";
}
