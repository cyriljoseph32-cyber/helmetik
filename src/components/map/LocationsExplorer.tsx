"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Cta } from "@/components/ui/Cta";
import {
  locations,
  hasLiveLocations,
  directionsUrl,
  type MachineLocation,
} from "@/content/locations";
import { distanceKm, formatDistance } from "@/lib/geo";
import { site } from "@/content/site";
import { href } from "@/i18n/routes";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

// Leaflet touches `window`, so the map is client-only and lazy-loaded — it
// never ships in the initial payload (Core Web Vitals).
const LocationsMap = dynamic(() => import("./LocationsMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-marine/40 text-sm text-cement">
      …
    </div>
  ),
});

type GeoState = "idle" | "locating" | "denied" | "unsupported" | "ready";

export function LocationsExplorer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    locations[0]?.id ?? null,
  );
  const [flyTo, setFlyTo] = useState<{ lat: number; lng: number } | null>(null);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [geo, setGeo] = useState<GeoState>("idle");

  const sorted = useMemo(() => {
    if (!userPos) return locations;
    return [...locations].sort(
      (a, b) => distanceKm(userPos, a) - distanceKm(userPos, b),
    );
  }, [userPos]);

  function requestNearest() {
    if (!("geolocation" in navigator)) {
      setGeo("unsupported");
      return;
    }
    setGeo("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(p);
        setGeo("ready");
        // Focus the nearest machine.
        const nearest = [...locations].sort(
          (a, b) => distanceKm(p, a) - distanceKm(p, b),
        )[0];
        if (nearest) {
          setSelectedId(nearest.id);
          setFlyTo({ lat: nearest.lat, lng: nearest.lng });
        }
      },
      () => setGeo("denied"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function select(loc: MachineLocation) {
    setSelectedId(loc.id);
    setFlyTo({ lat: loc.lat, lng: loc.lng });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* List column */}
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-lg font-bold text-clinical">
            {dict.locations.listHeading}
          </h2>
          <button
            type="button"
            onClick={requestNearest}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-uv/40 bg-uv/10 px-4 text-sm font-semibold text-uv transition-colors hover:bg-uv/20"
          >
            <PinIcon />
            {geo === "locating" ? dict.locations.locating : dict.locations.nearestBtn}
          </button>
        </div>

        {(geo === "denied" || geo === "unsupported") && (
          <p className="mb-4 rounded-md border border-marine-line bg-ink-2 p-3 text-sm text-cement-2">
            {geo === "denied"
              ? dict.locations.geoDenied
              : dict.locations.geoUnsupported}
          </p>
        )}

        {!hasLiveLocations && <DemoNotice dict={dict} locale={locale} />}

        <ul className="space-y-3">
          {sorted.map((loc) => {
            const dist = userPos ? distanceKm(userPos, loc) : null;
            const active = loc.id === selectedId;
            return (
              <li key={loc.id}>
                <div
                  className={`rounded-lg border p-4 transition-colors ${
                    active
                      ? "border-uv/50 bg-marine/40"
                      : "border-marine-line bg-ink-2"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => select(loc)}
                      className="text-left"
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-clinical">
                          {loc.hostName}
                        </span>
                        {loc.isDemo && (
                          <span className="rounded-full border border-uv/40 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-uv">
                            {dict.locations.demoBadge}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-cement-2">
                        {dict.areas[loc.area]} · {loc.landmark}
                      </span>
                      <span className="mt-1 block text-xs text-cement">
                        {loc.availability === "24-7"
                          ? dict.locations.availability247
                          : dict.locations.availabilityHostHours}
                        {dist !== null && (
                          <span className="tnum ml-2 text-uv">
                            {formatDistance(dist)} {dict.locations.away}
                          </span>
                        )}
                      </span>
                    </button>
                  </div>
                  <a
                    href={directionsUrl(loc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 rounded-md bg-clinical px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-clinical-2"
                  >
                    <NavIcon />
                    {dict.common.getDirections}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 rounded-lg border border-dashed border-marine-line p-4 text-sm text-cement-2">
          {dict.locations.hostCta}{" "}
          <Cta
            href={href(locale, "partners")}
            variant="ghost"
            className="!min-h-0 !px-1 text-uv underline underline-offset-4"
          >
            {dict.nav.partners}
          </Cta>
        </div>
      </div>

      {/* Map column */}
      <div className="h-[420px] overflow-hidden rounded-lg border border-marine-line lg:sticky lg:top-20 lg:h-[560px]">
        <LocationsMap
          locations={locations}
          selectedId={selectedId}
          onSelect={(id) => {
            const loc = locations.find((l) => l.id === id);
            if (loc) select(loc);
          }}
          flyTo={flyTo}
          dict={dict}
        />
      </div>
    </div>
  );
}

function DemoNotice({
  dict,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <div className="mb-4 rounded-lg border border-uv/30 bg-uv/5 p-4">
      <p className="text-sm font-semibold text-clinical">
        {dict.locations.emptyTitle}
      </p>
      <p className="mt-1 text-sm text-cement-2">{dict.locations.emptyBody}</p>
      <a
        href={site.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-semibold text-uv underline underline-offset-4"
      >
        WhatsApp →
      </a>
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-6.3-7-11a7 7 0 1114 0c0 4.7-7 11-7 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function NavIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 11l18-8-8 18-2-8-8-2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
