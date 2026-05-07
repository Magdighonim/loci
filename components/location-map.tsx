"use client";

import L from "leaflet";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { LocationRecord } from "@/lib/types";
import Link from "next/link";

const icon = L.divIcon({
  className: "map-marker",
  html: "•",
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

export function LocationMap({
  locations,
  selected,
  showTradeArea = true
}: {
  locations: LocationRecord[];
  selected?: LocationRecord;
  showTradeArea?: boolean;
}) {
  const center = selected
    ? [selected.latitude, selected.longitude]
    : [locations[0]?.latitude ?? 30.0739, locations[0]?.longitude ?? 31.3469];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={selected ? 13 : 11}
      scrollWheelZoom
      className="min-h-[440px]"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((location) => (
        <Marker
          key={location.location_id}
          position={[location.latitude, location.longitude]}
          icon={icon}
        >
          <Popup>
            <div className="space-y-2">
              <p className="font-semibold">{location.business_name}</p>
              <p className="text-xs">{location.category}</p>
              <Link href={`/locations/${location.location_id}`}>View profile</Link>
            </div>
          </Popup>
        </Marker>
      ))}

      {selected && showTradeArea && (
        <Circle
          center={[selected.latitude, selected.longitude]}
          radius={selected.trade_area_radius_km * 1000}
          pathOptions={{
            color: "#4F46E5",
            fillColor: "#615FFF",
            fillOpacity: 0.12,
            weight: 2
          }}
        />
      )}

      {selected?.visitor_home_zip_codes.map((origin) => (
        <Circle
          key={origin.zip}
          center={[origin.lat, origin.lng]}
          radius={Math.max(origin.visits / 3, 600)}
          pathOptions={{
            color: "#10B981",
            fillColor: "#10B981",
            fillOpacity: 0.12,
            weight: 1
          }}
        />
      ))}
    </MapContainer>
  );
}
