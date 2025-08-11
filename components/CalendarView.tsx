import { useState } from 'react';
import { Calendar } from './ui/calendar';

interface City {
  name: string;
  coordinates: [number, number];
  number: number;
}

const cities: City[] = [
  {
    name: 'Mumbai',
    coordinates: [19.0760, 72.8777],
    number: 1
  },
  {
    name: 'Delhi',
    coordinates: [28.7041, 77.1025],
    number: 7
  },
  {
    name: 'Bangalore',
    coordinates: [12.9716, 77.5946],
    number: 13
  },
  {
    name: 'Chennai',
    coordinates: [13.0827, 80.2707],
    number: 19
  },
  {
    name: 'Kolkata',
    coordinates: [22.5726, 88.3639],
    number: 25
  }
];

interface CalendarViewProps {
  onCitySelect?: (coordinates: [number, number]) => void;
}

export default function CalendarView({ onCitySelect }: CalendarViewProps) {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  const handleCityClick = (city: City) => {
    if (onCitySelect) {
      onCitySelect(city.coordinates);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const day = date.getDate();
      const city = cities.find(c => c.number === day);
      if (city && onCitySelect) {
        onCitySelect(city.coordinates);
        setSelected(date);
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 16,
          padding: 32,
          background: '#FFFFFF',
          marginBottom: 24,
          minHeight: '450px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: '600px' }}>
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleDateSelect}
            weekStartsOn={0}
            showOutsideDays
            className="w-full h-full"
          />
        </div>
      </div>

      {/* City Cards Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cities.map((city, ) => (
          <div
            key={city.name}
            onClick={() => handleCityClick(city)}
            style={{
              background: '#FFFFFF',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: 20,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, color: '#000000', fontSize: '18px', fontWeight: 600 }}>
                {city.name}
              </h4>
              <div
                style={{
                  background: '#8E9C78',
                  color: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: 10,
                  fontSize: '16px',
                  fontWeight: 600,
                  minWidth: '36px',
                  textAlign: 'center',
                }}
              >
                {city.number}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 