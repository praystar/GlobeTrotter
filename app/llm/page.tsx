"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TravelDetails {
  destination: string;
  duration: number;
  budget: string;
  travel_style: string;
  interests: string[];
  accommodation: string;
  transportation: string;
  special_requests: string;
}

interface ItineraryDay {
  day: string;
  morning: string;
  afternoon: string;
  evening: string;
  accommodation: string;
  meals: string;
  estimated_cost: string;
}

interface TravelPlan {
  itinerary: ItineraryDay[];
  total_estimated_cost: string;
  travel_tips: string[];
  packing_list: string[];
  emergency_contacts: {
    local_emergency: string;
    embassy: string;
    hotel: string;
  };
}

interface ApiResponse {
  plan: TravelPlan;
  summary: string;
}

const budgetOptions = [
  "Backpacker",
  "Shoestring",
  "Budget",
  "Mid-range",
  "Comfort",
  "Luxury",
  "Ultra Luxury",
  "Business",
  "Family",
  "Couple",
  "Group",
];

const accommodationOptions = [
  "Hostel",
  "Guesthouse",
  "Budget Hotel",
  "Mid-range Hotel",
  "Luxury Hotel",
  "Resort",
  "Boutique Hotel",
  "Villa",
  "Airbnb",
  "Camping",
  "Ryokan",
  "Capsule Hotel",
  "Homestay",
];

const transportOptions = [
  "Public Transport",
  "Car Rental",
  "Train",
  "Domestic Flight",
  "Private Driver",
  "Ride-share",
  "Walking/Cycling",
  "Boat/Ferry",
  "Tour Bus",
  "Mixed",
];

export default function LLMPage() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState<TravelDetails>({
    destination: "Paris, France",
    duration: 4,
    budget: "Mid-range",
    travel_style: "Cultural",
    interests: ["Museums", "Food", "Nature"],
    accommodation: "Mid-range Hotel",
    transportation: "Public Transport",
    special_requests: "None",
  });
  const [interestsText, setInterestsText] = useState("Museums, Food, Nature");

  const generatePlan = async () => {
    setLoading(true);
    setError("");
    setPlan(null);
    setSummary("");
    try {
      const payload: TravelDetails = {
        ...form,
        duration: Number(form.duration) || 1,
        interests: interestsText
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      // Call the Next.js API route
      const res = await fetch("/api/generatePlanWithSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errMsg = "Request failed";
        try {
          const errData = await res.json();
          errMsg = errData.error || errData.detail || errMsg;
        } catch {}
        throw new Error(errMsg);
      }

      const data: ApiResponse = await res.json();
      setPlan(data.plan);
      setSummary(data.summary);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* --- Form --- */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Create a new Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Destination
                <Input
                  className="mt-1"
                  value={form.destination}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, destination: e.target.value }))
                  }
                  placeholder="City, Country"
                />
              </label>
              <label className="text-sm font-medium">
                Duration (days)
                <Input
                  className="mt-1"
                  type="number"
                  min={1}
                  value={form.duration}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, duration: Number(e.target.value) }))
                  }
                />
              </label>
              <label className="text-sm font-medium">
                Travel Style
                <Input
                  className="mt-1"
                  value={form.travel_style}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, travel_style: e.target.value }))
                  }
                  placeholder="Cultural, Adventure, Relaxation..."
                />
              </label>
              <label className="text-sm font-medium">
                Interests (comma-separated)
                <Input
                  className="mt-1"
                  value={interestsText}
                  onChange={(e) => setInterestsText(e.target.value)}
                  placeholder="Museums, Food, Nature"
                />
              </label>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Budget
                <div className="mt-1">
                  <Select
                    value={form.budget}
                    onValueChange={(val) =>
                      setForm((p) => ({ ...p, budget: val }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a budget" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {budgetOptions.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </label>

              <label className="text-sm font-medium">
                Accommodation
                <div className="mt-1">
                  <Select
                    value={form.accommodation}
                    onValueChange={(val) =>
                      setForm((p) => ({ ...p, accommodation: val }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose accommodation" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {accommodationOptions.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </label>

              <label className="text-sm font-medium">
                Transportation
                <div className="mt-1">
                  <Select
                    value={form.transportation}
                    onValueChange={(val) =>
                      setForm((p) => ({ ...p, transportation: val }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose transportation" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {transportOptions.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </label>

              <label className="text-sm font-medium">
                Special Requests
                <Textarea
                  className="mt-1"
                  rows={4}
                  value={form.special_requests}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      special_requests: e.target.value,
                    }))
                  }
                  placeholder="Dietary needs, accessibility, etc."
                />
              </label>
            </div>
          </div>

          <div className="mt-4">
            <Button
              onClick={generatePlan}
              disabled={loading}
              className="rounded-full px-6"
            >
              {loading ? "Generating..." : "Generate Travel Plan"}
            </Button>
            {error && (
              <p className="mt-3 text-sm text-red-600">Error: {error}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* --- Itinerary --- */}
      {plan && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">📅 Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plan.itinerary.map((day, idx) => (
                <div key={idx} className="rounded-md border p-4">
                  <h3 className="font-semibold">{day.day}</h3>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <p>
                      <span className="font-medium">Morning:</span> {day.morning}
                    </p>
                    <p>
                      <span className="font-medium">Afternoon:</span> {day.afternoon}
                    </p>
                    <p>
                      <span className="font-medium">Evening:</span> {day.evening}
                    </p>
                    <p>
                      <span className="font-medium">Accommodation:</span> {day.accommodation}
                    </p>
                    <p>
                      <span className="font-medium">Meals:</span> {day.meals}
                    </p>
                    <p>
                      <span className="font-medium">Cost:</span> {day.estimated_cost}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">💰 Total Estimated Cost</h3>
              <p className="mt-1">{plan.total_estimated_cost}</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">💡 Travel Tips</h3>
                <ul className="mt-2 list-disc pl-5">
                  {plan.travel_tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">🎒 Packing List</h3>
                <ul className="mt-2 list-disc pl-5">
                  {plan.packing_list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">🚨 Emergency Contacts</h3>
              <p>Local Emergency: {plan.emergency_contacts.local_emergency}</p>
              <p>Embassy: {plan.emergency_contacts.embassy}</p>
              <p>Hotel: {plan.emergency_contacts.hotel}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* --- Summary --- */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">📝 Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
