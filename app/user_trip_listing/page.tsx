"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Loader2 } from "lucide-react";

type Trip = {
  trip_id: number;
  description: string;
  start_date: string;
  end_date: string;
  stops: Array<{
    city: {
      city: string;
      country: string;
    };
  }>;
};

type TripData = {
  upcoming: Trip[];
  completed: Trip[];
  ongoing: Trip[];
};

function TripCard({ trip }: { trip: Trip }) {
  const destination = trip.stops.length > 0 
    ? `${trip.stops[0].city.city}, ${trip.stops[0].city.country}`
    : "Unknown destination";
    
  const startDate = new Date(trip.start_date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
  
  const endDate = new Date(trip.end_date).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <Card className="border-[#000000] bg-[#FFFFFF]">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="h-20 w-28 rounded-lg bg-[#DFECC6]" />
          <div className="flex-1">
            <div className="text-base font-semibold text-[#000000]">{trip.description}</div>
            <div className="mt-1 flex items-center gap-2 text-sm text-[#485C11]">
              <MapPin className="h-4 w-4" />
              <span>{destination}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-[#485C11]">
              <Calendar className="h-4 w-4" />
              <span>{startDate} - {endDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UserTripListingPage() {
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserTrips();
  }, []);

  const fetchUserTrips = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/trips');
      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }
      const data = await response.json();
      setTripData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FFFFFF] text-[#000000] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#485C11]" />
          <p>Loading your trips...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#FFFFFF] text-[#000000] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchUserTrips}
            className="px-4 py-2 bg-[#485C11] text-white rounded-md hover:bg-[#8E9C78]"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Your Trips</h1>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Ongoing</h2>
            {tripData?.ongoing && tripData.ongoing.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {tripData.ongoing.map((trip) => <TripCard key={trip.trip_id} trip={trip} />)}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-[#000000] bg-[#FFFFFF]">
                <CardContent className="py-10 text-center">
                  <p className="text-[#929292]">No ongoing trips right now!</p>
                </CardContent>
              </Card>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Upcoming</h2>
            {tripData?.upcoming && tripData.upcoming.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {tripData.upcoming.map((trip) => <TripCard key={trip.trip_id} trip={trip} />)}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-[#000000] bg-[#FFFFFF]">
                <CardContent className="py-10 text-center">
                  <p className="text-[#929292]">No upcoming trips planned!</p>
                </CardContent>
              </Card>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Completed</h2>
            {tripData?.completed && tripData.completed.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {tripData.completed.map((trip) => <TripCard key={trip.trip_id} trip={trip} />)}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-[#000000] bg-[#FFFFFF]">
                <CardContent className="py-10 text-center">
                  <p className="text-[#929292]">No completed trips yet!</p>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
 
