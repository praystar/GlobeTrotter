"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

type Trip = {
  title: string;
  destination: string;
  startDate: string;
  endDate?: string;
  imageSrc?: string;
};

const tripsUpcoming: Trip[] = [
  { title: "Tokyo Cherry Blossom", destination: "Tokyo, Kyoto, Osaka", startDate: "Mar 20, 2025", endDate: "Mar 29, 2025" },
  { title: "Beach Escape", destination: "Phuket, Thailand", startDate: "Jun 5, 2025", endDate: "Jun 12, 2025" },
];

const tripsCompleted: Trip[] = [
  { title: "Bali Retreat", destination: "Ubud, Seminyak", startDate: "Jan 10, 2024", endDate: "Jan 17, 2024" },
  { title: "Iceland Northern Lights", destination: "Reykjavik", startDate: "Dec 15, 2024", endDate: "Dec 19, 2024" },
];

function TripCard({ trip, showEdit }: { trip: Trip; showEdit?: boolean }) {
  return (
    <Card className="border-[#000000] bg-[#FFFFFF]">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="h-20 w-28 rounded-lg bg-[#DFECC6]" />
          <div className="flex-1">
            <div className="text-base font-semibold text-[#000000]">{trip.title}</div>
            <div className="mt-1 flex items-center gap-2 text-sm text-[#485C11]">
              <MapPin className="h-4 w-4" />
              <span>{trip.destination}</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-[#485C11]">
              <Calendar className="h-4 w-4" />
              <span>{trip.startDate}{trip.endDate ? ` - ${trip.endDate}` : ""}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="rounded-full bg-[#485C11] text-[#FFFFFF] hover:bg-[#8E9C78]">View</Button>
            {showEdit && (
              <Button variant="outline" className="rounded-full border-[#000000] text-[#485C11] hover:bg-[#DFECC6]">Edit</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function UserTripListingPage() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#000000]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Your Trips</h1>

        <div className="mt-8 space-y-6">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Ongoing</h2>
            <Card className="border-dashed border-2 border-[#000000] bg-[#FFFFFF]">
              <CardContent className="py-10 text-center">
                <p className="text-[#929292]">No ongoing trips right now!</p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Upcoming</h2>
            <div className="grid grid-cols-1 gap-4">
              {tripsUpcoming.map((t, i) => <TripCard key={i} trip={t} showEdit />)}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Completed</h2>
            <div className="grid grid-cols-1 gap-4">
              {tripsCompleted.map((t, i) => <TripCard key={i} trip={t} />)}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
 
