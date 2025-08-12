"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  // 
  CardContent,
} from "@/components/ui/card";

// Color palette reference
// White: #FFFFFF
// Black: #000000
// Olive Green: #8E9C78
// Black: #000000
// Light Mint: #DFECC6
// Deep Olive: #485C11
// Gray: #929292

type TripData = {
  title: string;
  country: string;
  imageSrc?: string;
  imageAlt?: string;
};

const TripCard = ({ title, country, imageSrc, imageAlt, showButton = false }: TripData & { showButton?: boolean }) => {
  return (
    <Card className="group w-full border-[#000000]/60 shadow-sm transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="pt-6">
        <div className="rounded-xl overflow-hidden mb-4 w-full h-40">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt ?? title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-[#DFECC6]/40" aria-label={imageAlt ?? title} />
          )}
        </div>
        <div className="font-semibold text-[#000000]">{title}</div>
        <div className="text-xs text-[#929292] mb-4">{country}</div>
        {showButton && (
          <Button className="w-full px-4 py-2 text-sm rounded-full shadow-lg bg-[#485C11] hover:bg-[#8E9C78] text-[#FFFFFF] transition-transform hover:scale-105">
            Get Itinerary
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default function DashboardPage() {
  const trips: TripData[] = [
    {
      title: "Delhi",
      country: "India",
      imageSrc: "/delhi.jpg",
      imageAlt: "Delhi"
    },
    {
      title: "Paris",
      country: "France",
      imageSrc: "/paris.avif",
      imageAlt: "Paris"
    },
    {
      title: "Italy",
      country: "Europe",
      imageSrc: "/italy.jpeg",
      imageAlt: "Italy"
    }
  ];

  const previousTrips: TripData[] = [
    { title: "Bali", country: "Indonesia", imageAlt: "Bali" },
    { title: "Malaysia", country: "Malaysia", imageAlt: "Malaysia" },
    { title: "Indonesia", country: "Southeast Asia", imageAlt: "Indonesia" },
    { title: "Thailand", country: "Thailand", imageAlt: "Thailand" },
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 w-full max-w-6xl mt-8">
        {/* Background world map */}
        <div className="absolute inset-0 z-0 opacity-50">
          <img
            src="/map.png"
            alt="World Map Background"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        <div className="z-10">
          <h1 className="text-5xl md:text-6xl font-serif text-[clamp(40px,7vw,96px)] font-bold mb-4 text-[#000000]" >
            Discover
          </h1>
          <p className="text-lg mb-8 max-w-2xl text-[#929292]">
            the world 
          </p>
          <Button className="px-8 py-6 text-base rounded-full shadow-lg bg-[#485C11] hover:bg-[#8E9C78] text-[#FFFFFF] transition-transform hover:scale-105">
            Plan New Trip
          </Button>
        </div>
      </section>

      {/* Cards Section - Popular Destinations */}
      <section className="w-full max-w-6xl pb-10">
       <h2 className="mt-8 text-4xl font-bold text-[#000000] mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {trips.map((trip, index) => (
            <TripCard
              key={index}
              title={trip.title}
              country={trip.country}
              imageSrc={trip.imageSrc}
              imageAlt={trip.imageAlt}
              showButton={true}
            />
          ))}
        </div>
        <div className="w-full h-px bg-[#DFECC6] mt-8" />
      </section>

      {/* Previous Trips */}
      <section className="w-full max-w-6xl pb-20">
        <h2 className="text-4xl font-bold text-[#000000] mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Previous Trips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          {previousTrips.map((trip, index) => (
            <TripCard
              key={`prev-${index}`}
              title={trip.title}
              country={trip.country}
              imageAlt={trip.imageAlt}
              showButton={false}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
