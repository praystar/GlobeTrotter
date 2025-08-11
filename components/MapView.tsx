import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue (important for proper marker display)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

type SearchResult = {
  display_name: string;
  lat: string;
  lon: string;
};

interface MapViewProps {
  center: [number, number];
}

function MapUpdater({ center, zoom = 13 }: { center: [number, number]; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);

  return null;
}

// Crosshair SVG icon component for "Locate Me" button
const TargetIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="2" fill="#6B7280" />
    <circle
      cx="12"
      cy="12"
      r="8"
      stroke="#6B7280"
      strokeWidth="1.5"
      fill="none"
    />
    <line x1="12" y1="4" x2="12" y2="6" stroke="#6B7280" strokeWidth="1.5" />
    <line
      x1="12"
      y1="18"
      x2="12"
      y2="20"
      stroke="#6B7280"
      strokeWidth="1.5"
    />
    <line x1="4" y1="12" x2="6" y2="12" stroke="#6B7280" strokeWidth="1.5" />
    <line
      x1="18"
      y1="12"
      x2="20"
      y2="12"
      stroke="#6B7280"
      strokeWidth="1.5"
    />
  </svg>
);

// City data with numbers and coordinates
const cities = [
  { name: 'Mumbai', coordinates: [19.076, 72.8777] as [number, number], number: 1 },
  { name: 'Delhi', coordinates: [28.7041, 77.1025] as [number, number], number: 7 },
  { name: 'Bangalore', coordinates: [12.9716, 77.5946] as [number, number], number: 13 },
  { name: 'Chennai', coordinates: [13.0827, 80.2707] as [number, number], number: 19 },
  { name: 'Kolkata', coordinates: [22.5726, 88.3639] as [number, number], number: 25 },
];

export default function MapView({ center }: MapViewProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchTimer = useRef<number | null>(null);

  // Update map center if parent center changes
  useEffect(() => {
    setMapCenter(center);
  }, [center]);

  // Handle input changes and fetch search suggestions with debounce
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setShowDropdown(true);

    if (searchTimer.current) clearTimeout(searchTimer.current);

    searchTimer.current = window.setTimeout(async () => {
      if (!value.trim()) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            value,
          )}&format=json&limit=6`,
        );
        const data: SearchResult[] = await res.json();
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      }
    }, 400);
  };

  // When user selects a search result
  const handleSelect = (r: SearchResult) => {
    const lat = parseFloat(r.lat);
    const lon = parseFloat(r.lon);
    const point: [number, number] = [lat, lon];
    setSelectedLocation(point);
    setMapCenter(point);
    setShowDropdown(false);
    setQuery(r.display_name);
  };

  // Locate user using Geolocation API
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const point: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(point);
        setMapCenter(point);
      },
      (err) => {
        console.error('Geolocation error:', err);
        alert('Unable to fetch your location');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={mapCenter} zoom={13} />

        {/* City markers with numbers */}
        {cities.map((city) => (
          <Marker
            key={city.name}
            position={city.coordinates}
            icon={L.divIcon({
              className: 'custom-city-marker',
              html: `
                <div style="
                  background: #8E9C78;
                  color: white;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  border: 3px solid white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  font-size: 14px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                  cursor: pointer;
                ">
                  ${city.number}
                </div>
              `,
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            })}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <strong>{city.name}</strong>
                <br />
                City #{city.number}
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {selectedLocation && (
          <Marker position={selectedLocation}>
            <Popup>Selected location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Search input and Locate Me button overlay */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 50,
          right: 16,
          padding: 12,
          background: '#FFFFFF',
          borderRadius: 12,
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
          zIndex: 1000,
          pointerEvents: 'auto',
        }}
      >
        <input
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for a place"
          style={{
            flex: 1,
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            background: '#FFFFFF',
          }}
        />
        <button
          onClick={handleLocateMe}
          title="Locate me"
          style={{
            background: '#FFFFFF',
            color: '#6B7280',
            padding: '10px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
            height: '40px',
          }}
          type="button"
        >
          <TargetIcon />
        </button>

        {showDropdown && results.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 6,
              background: '#FFFFFF',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              maxHeight: 220,
              overflowY: 'auto',
              zIndex: 1100,
            }}
          >
            {results.map((r, idx) => (
              <div
                key={`${r.display_name}-${idx}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(r)}
                style={{
                  padding: '10px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f1f5f9',
                  fontSize: 14,
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  background: '#FFFFFF',
                }}
              >
                {r.display_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
