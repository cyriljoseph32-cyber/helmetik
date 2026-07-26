"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { directionsUrl, type MachineLocation } from "@/content/locations";
import type { Dictionary } from "@/i18n/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

let loaderPromise: Promise<void> | null = null;
function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if ((window as any).google?.maps) return Promise.resolve();
  if (!loaderPromise) {
    loaderPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=weekly`;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return loaderPromise;
}

// Dark map style tuned to the site palette.
const DARK_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0c1c2b" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a97a6" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#08131f" }] },
  { featureType: "water", stylers: [{ color: "#08131f" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#12293d" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

function pinIcon(active: boolean) {
  const fill = active ? "#f68b46" : "#35e0ff";
  return {
    url:
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40"><path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0Z" fill="${fill}"/><circle cx="15" cy="15" r="6" fill="#08131f"/></svg>`,
      ),
    scaledSize: { width: 30, height: 40 } as any,
    anchor: { x: 15, y: 40 } as any,
  };
}

export default function LocationsMap({
  locations,
  selectedId,
  onSelect,
  flyTo,
  dict,
}: {
  locations: MachineLocation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  flyTo: { lat: number; lng: number } | null;
  dict: Dictionary;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markers = useRef<Record<string, any>>({});

  useEffect(() => {
    let cancelled = false;
    if (!KEY) return;
    loadGoogleMaps()
      .then(() => {
        if (cancelled || !ref.current) return;
        const g = (window as any).google;
        const c = site.mapDefaultCenter;
        const map = new g.maps.Map(ref.current, {
          center: { lat: c.lat, lng: c.lng },
          zoom: c.zoom,
          styles: DARK_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
        });
        mapRef.current = map;
        for (const loc of locations) {
          const m = new g.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map,
            title: loc.hostName,
            icon: pinIcon(loc.id === selectedId),
          });
          const info = new g.maps.InfoWindow({
            content: `<div style="color:#08131f;font:14px sans-serif"><strong>${loc.hostName}</strong><br>${dict.areas[loc.area]}<br><a href="${directionsUrl(loc)}" target="_blank" rel="noopener">${dict.common.getDirections} →</a></div>`,
          });
          m.addListener("click", () => {
            onSelect(loc.id);
            info.open({ map, anchor: m });
          });
          markers.current[loc.id] = m;
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Highlight the selected marker.
  useEffect(() => {
    const g = (window as any).google;
    if (!g) return;
    for (const [id, m] of Object.entries(markers.current)) {
      (m as any).setIcon(pinIcon(id === selectedId));
    }
  }, [selectedId]);

  // Pan to the focused location.
  useEffect(() => {
    if (flyTo && mapRef.current) {
      mapRef.current.panTo(flyTo);
      mapRef.current.setZoom(14);
    }
  }, [flyTo]);

  if (!KEY) {
    return (
      <div className="grid h-full w-full place-items-center bg-marine/40 p-6 text-center text-sm text-cement">
        {dict.locations.mapLabel}
        <br />
        Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable the map.
      </div>
    );
  }

  return <div ref={ref} className="h-full w-full" aria-label={dict.locations.mapLabel} />;
}
