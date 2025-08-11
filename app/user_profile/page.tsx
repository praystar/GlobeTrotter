"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Camera, Edit3, MapPin, Calendar, Globe } from "lucide-react";

// Color palette reference
// White: #FFFFFF
// Black: #000000
// Olive Green: #8E9C78
// Black: #000000
// Light Mint: #DFECC6
// Deep Olive: #485C11
// Gray: #929292

type UserProfile = {
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
  totalTrips: number;
  countriesVisited: number;
  favoriteDestinations: string[];
  travelStyle: string[];
  profileImage?: string;
};

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    bio: "Passionate traveler and adventure seeker. Love exploring hidden gems and experiencing local cultures. Always planning the next adventure!",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    totalTrips: 12,
    countriesVisited: 8,
    favoriteDestinations: ["Japan", "Iceland", "New Zealand", "Italy"],
    travelStyle: ["Adventure", "Cultural", "Photography", "Solo Travel"],
    profileImage: "/profile-avatar.jpg"
  });

  const handleInputChange = (field: keyof UserProfile, value: string | string[]) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="min-h-screen bg-[#fafafa] flex flex-col items-center">
      {/* Hero Section with Profile Header */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 w-full max-w-6xl mt-8">
        {/* Background world map */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/map.png"
            alt="World Map Background"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
        
        <div className="z-10 flex flex-col items-center">
          {/* Profile Avatar */}
          <div className="relative mb-6">
            <Avatar className="w-32 h-32 border-4 border-[#000000]/60 shadow-lg">
              <AvatarImage src={profile.profileImage} alt={profile.name} />
              <AvatarFallback className="bg-[#DFECC6] text-[#485C11] text-2xl font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#485C11] hover:bg-[#8E9C78] text-[#FFFFFF] p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-[#000000]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {profile.name}
          </h1>
          <div className="flex items-center gap-2 mb-4 text-[#929292]">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>
          <p className="text-lg mb-6 max-w-2xl text-[#929292]">
            {profile.bio}
          </p>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-8 py-3 text-base rounded-full shadow-lg bg-[#485C11] hover:bg-[#8E9C78] text-[#FFFFFF] transition-transform hover:scale-105"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </Button>
        </div>
      </section>

      {/* Member Since - simple text under CTA */}
      <section className="w-full max-w-6xl pb-10">
        <div className="flex justify-center">
          <p className="text-sm text-[#929292]">Member since {profile.joinDate}</p>
        </div>
        <div className="w-full h-px bg-[#DFECC6] mt-8" />
      </section>

      {/* Profile Details */}
      <section className="w-full max-w-6xl pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card className="border-[#000000]/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#000000] flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <Label htmlFor="name" className="text-[#485C11]">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-[#C7B697]/60 focus:border-[#485C11]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#485C11]">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border-[#C7B697]/60 focus:border-[#485C11]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-[#485C11]">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="border-[#C7B697]/60 focus:border-[#485C11]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-[#485C11]">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="border-[#C7B697]/60 focus:border-[#485C11] min-h-[100px]"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label className="text-[#485C11]">Full Name</Label>
                    <div className="text-[#000000] font-medium">{profile.name}</div>
                  </div>
                  <div>
                    <Label className="text-[#485C11]">Email</Label>
                    <div className="text-[#000000] font-medium">{profile.email}</div>
                  </div>
                  <div>
                    <Label className="text-[#485C11]">Location</Label>
                    <div className="text-[#000000] font-medium">{profile.location}</div>
                  </div>
                  <div>
                    <Label className="text-[#485C11]">Bio</Label>
                    <div className="text-[#929292] leading-relaxed">{profile.bio}</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Travel Preferences */}
          <Card className="border-[#C7B697]/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#000000]">Travel Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-[#485C11] mb-3 block">Favorite Destinations</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.favoriteDestinations.map((destination, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-[#DFECC6] text-[#485C11] hover:bg-[#C7B697]/60"
                    >
                      {destination}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-[#485C11] mb-3 block">Travel Style</Label>
                <div className="flex flex-wrap gap-2">
                  {profile.travelStyle.map((style, index) => (
                    <Badge 
                      key={index} 
                      className="bg-[#485C11] text-[#FFFFFF] hover:bg-[#8E9C78]"
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </section>

      {/* Previous Trips */}
      <section className="w-full max-w-6xl pb-20">
        <h2
          className="text-4xl font-bold text-[#000000] mb-8 text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Previous Trips
        </h2>
        {(() => {
          type TripData = {
            title: string;
            country: string;
            imageSrc?: string;
            imageAlt?: string;
          }

          const previousTrips: TripData[] = [
            { title: "Bali", country: "Indonesia", imageAlt: "Bali" },
            { title: "Malaysia", country: "Malaysia", imageAlt: "Malaysia" },
            { title: "Indonesia", country: "Southeast Asia", imageAlt: "Indonesia" },
            { title: "Thailand", country: "Thailand", imageAlt: "Thailand" },
          ]

          return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
              {previousTrips.map((trip, index) => (
                <Card
                  key={`prev-${index}`}
                  className="group w-full border-[#C7B697]/60 shadow-sm transition-transform duration-200 will-change-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="pt-6">
                    <div className="rounded-xl overflow-hidden mb-4 w-full h-40">
                      {trip.imageSrc ? (
                        <img
                          src={trip.imageSrc}
                          alt={trip.imageAlt ?? trip.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-[#DFECC6]/40"
                          aria-label={trip.imageAlt ?? trip.title}
                        />
                      )}
                    </div>
                    <div className="font-semibold text-[#000000]">{trip.title}</div>
                    <div className="text-xs text-[#929292] mb-4">{trip.country}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        })()}
      </section>

      {/* See Listings Button */}
      <section className="w-full max-w-6xl pb-24">
        <div className="flex justify-center">
          <Button asChild className="px-8 py-3 text-base rounded-full shadow-lg bg-[#485C11] hover:bg-[#8E9C78] text-[#FFFFFF] transition-transform hover:scale-105">
            <Link href="/user_trip_listing">See Listings</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
