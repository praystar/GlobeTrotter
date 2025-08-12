"use client";
import dynamic from "next/dynamic";
import { useState } from 'react';
const MapView = dynamic(()=> import("@/components/MapView"),{ssr: false});
const CalendarView = dynamic(()=> import("@/components/CalendarView"),{ssr: false});

function App() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([26.9124, 75.7873]);

  const handleCitySelect = (coordinates: [number, number]) => {
    setMapCenter(coordinates);
  };

  return (
    <main className="min-h-screen bg-[#DFECC6] pt-20">
      <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] p-4 gap-4 box-border">
        {/* Left pane: MapView */}
        <div className="flex-1 min-w-0 rounded-2xl overflow-hidden bg-white shadow-lg h-[60vh] min-h-[300px] md:h-auto">
          <MapView center={mapCenter} />
        </div>

        {/* Right pane: CalendarView */}
        <div className="flex-1 min-w-0 rounded-2xl overflow-hidden bg-white shadow-lg p-6 flex items-start justify-center min-h-[400px]">
          <CalendarView onCitySelect={handleCitySelect} />
        </div>
      </div>
    </main>
  );
}

export default App;
