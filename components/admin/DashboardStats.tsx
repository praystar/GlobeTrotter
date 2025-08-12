"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Activity, TrendingUp, Calendar, Globe } from "lucide-react"

interface StatsData {
  totalUsers: number
  totalTrips: number
  averageTripsPerUser: number
  topCity: string
  topActivity: string
}

interface DashboardStatsProps {
  stats: StatsData
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "#8E9C78",
      bgColor: "#F8F9FA"
    },
    {
      title: "Total Trips",
      value: stats.totalTrips,
      icon: Globe,
      color: "#8E9C78",
      bgColor: "#F8F9FA"
    },
    {
      title: "Avg Trips/User",
      value: stats.averageTripsPerUser,
      icon: Activity,
      color: "#485C11",
      bgColor: "#F8F9FA"
    },
    {
      title: "Top City",
      value: stats.topCity,
      icon: MapPin,
      color: "#8E9C78",
      bgColor: "#F8F9FA"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} style={{ backgroundColor: '#FFFFFF', borderColor: '#8E9C78' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium" style={{ color: '#929292' }}>
                {stat.title}
              </CardTitle>
              <div className="p-2 rounded-lg" style={{ backgroundColor: stat.bgColor }}>
                <Icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: '#000000' }}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
