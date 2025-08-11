"use client";
import { useState } from 'react';
import MapView from '@/components/MapView';
import CalendarView from '@/components/CalendarView';

function App() {
  const [mapCenter, setMapCenter] = useState<[number, number]>([26.9124, 75.7873]);

  const handleCitySelect = (coordinates: [number, number]) => {
    setMapCenter(coordinates);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-4 gap-4 bg-[#DFECC6] box-border">
      {/* Left pane: MapView */}
      <div className="flex-1 min-w-0 rounded-2xl overflow-hidden bg-white shadow-lg h-[60vh] min-h-[300px] md:h-auto">
        <MapView center={mapCenter} />
      </div>

      {/* Right pane: CalendarView */}
      <div className="flex-1 min-w-0 rounded-2xl overflow-hidden bg-white shadow-lg p-6 flex items-start justify-center min-h-[400px]">
        <CalendarView onCitySelect={handleCitySelect} />
      </div>
    </div>
  );
}

export default App;
