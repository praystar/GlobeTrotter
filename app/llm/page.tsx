"use client";

import React, { useState } from "react";
import { differenceInDays, parseISO, format } from "date-fns";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Plane, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Hotel, 
  Car, 
  Heart, 
  Lightbulb, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Globe,
  Clock,
  Star,
  IndianRupee
} from "lucide-react";


interface TravelDetails {
  destinations: string[];
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  budget: string;
  travel_style: string;
  interests: string[];
  accommodation: string;
  transportation: string;
  special_requests: string;
}

interface ItineraryDay {
  day: string;
  city: string;
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

// ==== Option arrays ====
const budgetOptions = ["Backpacker", "Budget", "Mid-range", "Luxury"];
const accommodationOptions = ["Hostel", "Hotel", "Airbnb", "Resort"];
const transportOptions = ["Public Transport", "Car Rental", "Train", "Flight"];
const travelStyleOptions = ["Cultural", "Adventure", "Relaxation", "Food & Wine", "Historical", "Nature", "Urban", "Rural"];

export default function LLMPage() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  
  const [citiesText, setCitiesText] = useState("Delhi, Agra");
  const [startDate, setStartDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return format(tomorrow, "yyyy-MM-dd");
  });
  const [endDate, setEndDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 8);
    return format(nextWeek, "yyyy-MM-dd");
  });
  const [budget, setBudget] = useState("Mid-range");
  const [travelStyle, setTravelStyle] = useState("Cultural");
  const [accommodation, setAccommodation] = useState("Hotel");
  const [transportation, setTransportation] = useState("Train");
  const [interestsText, setInterestsText] = useState("Historical Sites, Food, Culture, Photography");
  const [specialRequests, setSpecialRequests] = useState("");

  const generatePlan = async () => {
    setLoading(true);
    setError("");
    setPlan(null);
    setSummary("");

    try {
      const destinations = citiesText
        .split(",")
        .map((city) => city.trim())
        .filter(Boolean);

      if (destinations.length === 0) {
        throw new Error("Please enter at least one destination");
      }

      // Calculate trip duration
      const days = differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
      if (days <= 0) {
        throw new Error("End date must be after start date");
      }

      const payload: TravelDetails = {
        destinations,
        start_date: startDate,
        end_date: endDate,
        budget,
        travel_style: travelStyle,
        interests: interestsText.split(",").map((s) => s.trim()).filter(Boolean),
        accommodation,
        transportation,
        special_requests: specialRequests || "None",
      };

      const res = await fetch("/api/generatePlanWithSummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Request failed");
      }

      const data: ApiResponse = await res.json();
      setPlan(data.plan);
      setSummary(data.summary);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">


        {/* Form */}
        <Card className="mb-8 shadow-lg border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
                         <CardTitle className="text-2xl flex items-center gap-3 text-primary">
               <Plane className="h-8 w-8" />
               Create Your Multi-City Adventure
             </CardTitle>
             <p className="text-muted-foreground">Plan your perfect trip with AI assistance</p>
             <p className="text-sm text-primary/80 font-medium">💱 All costs will be automatically converted to Indian Rupees (₹)</p>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Destinations */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Destinations
              </label>
              <Input
                className="h-12 text-lg border-2 focus:border-primary focus:ring-primary/20"
                value={citiesText}
                onChange={(e) => setCitiesText(e.target.value)}
                placeholder="e.g., Delhi, Agra, Jaipur"
              />
              <p className="text-xs text-muted-foreground">Enter cities separated by commas</p>
             <p className="text-xs text-muted-foreground">💡 All costs will be automatically converted to Indian Rupees (₹)</p>
                           <p className="text-xs text-muted-foreground">🔄 USD→₹85, EUR→₹92, GBP→₹108, JPY→₹0.58, AUD→₹56, CAD→₹63</p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  Start Date
                </label>
                <Input
                  type="date"
                  className="h-12 border-2 focus:border-primary focus:ring-primary/20"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={format(new Date(), "yyyy-MM-dd")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  End Date
                </label>
                <Input
                  type="date"
                  className="h-12 border-2 focus:border-primary focus:ring-primary/20"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                />
              </div>
            </div>

            {/* Travel Style and Budget */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Star className="h-4 w-4 text-primary" />
                  Travel Style
                </label>
                <Select value={travelStyle} onValueChange={setTravelStyle}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {travelStyleOptions.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

                             <div className="space-y-2">
                 <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                   <IndianRupee className="h-4 w-4 text-primary" />
                   Budget
                 </label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">All costs will be automatically converted to ₹ (Indian Rupees)</p>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Heart className="h-4 w-4 text-primary" />
                Interests
              </label>
              <Input
                className="h-12 text-lg border-2 focus:border-primary focus:ring-primary/20"
                value={interestsText}
                onChange={(e) => setInterestsText(e.target.value)}
                placeholder="e.g., Historical Sites, Food, Culture, Photography"
              />
            </div>

            {/* Accommodation and Transportation */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Hotel className="h-4 w-4 text-primary" />
                  Accommodation
                </label>
                <Select value={accommodation} onValueChange={setAccommodation}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accommodationOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Car className="h-4 w-4 text-primary" />
                  Transportation
                </label>
                <Select value={transportation} onValueChange={setTransportation}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transportOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
                <Lightbulb className="h-4 w-4 text-primary" />
                Special Requests
              </label>
              <Textarea
                className="min-h-[80px] border-2 focus:border-primary focus:ring-primary/20 resize-none"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requirements or preferences..."
              />
            </div>

            {/* Generate Button */}
            <Button 
              onClick={generatePlan} 
              disabled={loading}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Crafting Your Journey...
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-5 w-5" />
                  Generate Travel Plan
                </>
              )}
            </Button>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <p className="text-destructive font-medium">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plan output */}
        {plan && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="shadow-lg border-2 border-primary/10">
              <CardHeader className="bg-gradient-to-r from-secondary/20 to-accent/20 border-b">
                <CardTitle className="text-xl flex items-center gap-2 text-primary">
                  <CheckCircle className="h-6 w-6" />
                  Trip Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg text-foreground">{summary}</p>
                                 <div className="mt-4 flex items-center gap-2">
                   <Badge variant="secondary" className="text-sm">
                     <IndianRupee className="h-3 w-3 mr-1" />
                     {plan.total_estimated_cost}
                   </Badge>
                  <Badge variant="outline" className="text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {plan.itinerary.length} Days
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {plan.itinerary.length} Cities
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary Card */}
            <Card className="shadow-lg border-2 border-primary/10">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
                <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                  📅 Detailed Itinerary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {plan.itinerary.map((day, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/20">
                          <span className="text-primary font-bold text-sm">{idx + 1}</span>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-primary">{day.day}</h3>
                            <Badge variant="outline" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {day.city}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">🌅 Morning</p>
                              <p className="text-sm text-foreground">{day.morning}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">☀️ Afternoon</p>
                              <p className="text-sm text-foreground">{day.afternoon}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">🌙 Evening</p>
                              <p className="text-sm text-foreground">{day.evening}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">🏨 Accommodation</p>
                              <p className="text-sm text-foreground">{day.accommodation}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">🍽️ Meals</p>
                              <p className="text-sm text-foreground">{day.meals}</p>
                            </div>
                          </div>
                          
                                                     <div className="pt-2">
                             <Badge variant="secondary" className="text-xs">
                               <IndianRupee className="h-3 w-3 mr-1" />
                               {day.estimated_cost}
                             </Badge>
                           </div>
                        </div>
                      </div>
                      
                      {idx < plan.itinerary.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-primary/20"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Travel Tips */}
              <Card className="shadow-lg border-2 border-primary/10">
                <CardHeader className="bg-gradient-to-r from-accent/10 to-secondary/10 border-b">
                  <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    💡 Travel Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {plan.travel_tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Packing List */}
              <Card className="shadow-lg border-2 border-primary/10">
                <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10 border-b">
                  <CardTitle className="text-lg flex items-center gap-2 text-primary">
                    🧳 Packing List
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {plan.packing_list.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Emergency Contacts */}
            <Card className="shadow-lg border-2 border-destructive/10">
              <CardHeader className="bg-gradient-to-r from-destructive/5 to-destructive/10 border-b border-destructive/20">
                <CardTitle className="text-lg flex items-center gap-2 text-destructive">
                  🚨 Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">🚔 Local Emergency</p>
                    <p className="text-sm font-mono text-foreground">{plan.emergency_contacts.local_emergency}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">🏛️ Embassy</p>
                    <p className="text-sm font-mono text-foreground">{plan.emergency_contacts.embassy}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">🏨 Hotel</p>
                    <p className="text-sm font-mono text-foreground">{plan.emergency_contacts.hotel}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
