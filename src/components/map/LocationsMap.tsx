"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { site } from "@/content/site";
import { directionsUrl, type MachineLocation } from "@/content/locations";
import type { Dictionary } from "@/i18n/types";

/** On-brand marker built from an inline SVG (no external image assets). */
function markerIcon(active: boolean): L.DivIcon {
  const fill = active ? "#c8f24a" : "#35e0ff";
  const scale = active ? 1.15 : 1;
  return L.divIcon({
    className: "helmetik-marker",
    html: `<div style="transform:scale(${scale});transform-origin:bottom center">
      <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0Z" fill="${fill}"/>
        <circle cx="15" cy="15" r="6" fill="#08131f"/>
      </svg></div>`,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -38],
  });
}

function MapController({
  center,
}: {
  center: { lat: number; lng: number } | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo([center.lat, center.lng], 14, { duration: 0.8 });
  }, [center, map]);
  return null;
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
  const center = site.mapDefaultCenter;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={center.zoom}
      scrollWheelZoom={false}
      className="h-full w-full"
      aria-label={dict.locations.mapLabel}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={flyTo} />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={markerIcon(loc.id === selectedId)}
          eventHandlers={{ click: () => onSelect(loc.id) }}
        >
          <Popup>
            <strong>{loc.hostName}</strong>
            <br />
            {dict.areas[loc.area]}
            <br />
            <a
              href={directionsUrl(loc)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.common.getDirections} →
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
