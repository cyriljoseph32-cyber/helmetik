/**
 * Machine locations — SINGLE SOURCE OF TRUTH for the Locations page, the map
 * markers and the schema.org `Place` entries.
 *
 * The old site's "Our Locations" page had NO real addresses — unacceptable for
 * the core of this business. We ship a typed structure that is ready to fill,
 * with ONE clearly-marked demo entry and an elegant empty state. We NEVER
 * invent an address, and demo entries are excluded from schema.org.
 *
 * To go live: replace the demo entry with real machines (set isDemo: false and
 * fill lat/lng from Google Maps), then link each to its Google Business Profile.
 */

export const areas = [
  "chaweng",
  "lamai",
  "bophut",
  "maenam",
  "nathon",
  "choengmon",
  "lipanoi",
] as const;

export type Area = (typeof areas)[number];

export interface MachineLocation {
  id: string;
  /** Host venue name (hotel, resort, petrol station, café…). */
  hostName: string;
  area: Area;
  /** Short human landmark to help riders find it. */
  landmark: string;
  lat: number;
  lng: number;
  /** e.g. "Self-service — follows venue hours" (kept honest, no fake 24/7). */
  availability: "host-hours" | "24-7";
  /** Optional Google Maps place link for turn-by-turn "Get directions". */
  mapsPlaceUrl?: string;
  /** Optional Google Business Profile link (SEO lever). */
  googleBusinessUrl?: string;
  /**
   * TRUE = editorial placeholder to be replaced with a real machine.
   * Demo entries are visually flagged and excluded from schema.org.
   */
  isDemo: boolean;
}

/**
 * Directions link builder. If a specific Maps place URL is provided we use it
 * (most accurate); otherwise we fall back to a coordinate-based directions URL
 * that opens the native Maps app on iOS/Android and Google Maps on desktop.
 */
export function directionsUrl(loc: MachineLocation): string {
  if (loc.mapsPlaceUrl) return loc.mapsPlaceUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
}

export const locations: MachineLocation[] = [
  {
    id: "demo-chaweng-1",
    hostName: "Sample host venue — replace with a real machine",
    area: "chaweng",
    landmark: "Chaweng Beach Road (approx. area centre)",
    // Approximate Chaweng area centre — a public geographic reference, NOT a
    // claimed machine address. Replace with the real coordinates.
    lat: 9.5357,
    lng: 100.0629,
    availability: "host-hours",
    isDemo: true,
  },
];

/** Real (non-demo) locations, used for schema.org and the live count. */
export const liveLocations = locations.filter((l) => !l.isDemo);

export const hasLiveLocations = liveLocations.length > 0;
