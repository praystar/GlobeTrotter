import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// Mock data - replace with actual database queries
const mockTrips = [
  {
    trip_id: 1,
    description: "Tokyo Cherry Blossom",
    start_date: "2025-03-20T00:00:00Z",
    end_date: "2025-03-29T00:00:00Z",
    user_id: "user123",
    stops: [
      {
        city: { city: "Tokyo", country: "Japan" }
      }
    ]
  },
  {
    trip_id: 2,
    description: "Beach Escape",
    start_date: "2025-06-05T00:00:00Z",
    end_date: "2025-06-12T00:00:00Z",
    user_id: "user123",
    stops: [
      {
        city: { city: "Phuket", country: "Thailand" }
      }
    ]
  },
  {
    trip_id: 3,
    description: "Bali Retreat",
    start_date: "2024-01-10T00:00:00Z",
    end_date: "2024-01-17T00:00:00Z",
    user_id: "user123",
    stops: [
      {
        city: { city: "Bali", country: "Indonesia" }
      }
    ]
  },
  {
    trip_id: 4,
    description: "Iceland Northern Lights",
    start_date: "2024-12-15T00:00:00Z",
    end_date: "2024-12-19T00:00:00Z",
    user_id: "user123",
    stops: [
      {
        city: { city: "Reykjavik", country: "Iceland" }
      }
    ]
  }
]

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch trips from database
    const userTrips = await prisma.trip.findMany({
      where: { user_id: userId },
      include: {
        stops: {
          include: {
            city: true
          }
        }
      },
      orderBy: { start_date: 'asc' }
    })

    const now = new Date()

    const upcomingTrips = userTrips.filter(trip => 
      trip.start_date && new Date(trip.start_date) > now
    )

    const completedTrips = userTrips.filter(trip => 
      trip.end_date && new Date(trip.end_date) < now
    )

    const ongoingTrips = userTrips.filter(trip => {
      if (!trip.start_date || !trip.end_date) return false
      const startDate = new Date(trip.start_date)
      const endDate = new Date(trip.end_date)
      return startDate <= now && endDate >= now
    })

    return NextResponse.json({
      upcoming: upcomingTrips,
      completed: completedTrips,
      ongoing: ongoingTrips
    })
  } catch (error) {
    console.error('User trips API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tripData = await request.json()
    
    // TODO: Replace with actual database insertion
    // const newTrip = await prisma.trip.create({
    //   data: {
    //     description: tripData.description,
    //     start_date: new Date(tripData.start_date),
    //     end_date: new Date(tripData.end_date),
    //     user_id: userId,
    //     // Add other fields as needed
    //   }
    // })

    // For now, add to mock data
    const newTrip = {
      trip_id: mockTrips.length + 1,
      description: tripData.description,
      start_date: tripData.start_date,
      end_date: tripData.end_date,
      user_id: userId,
      stops: tripData.destinations.map((dest: string, index: number) => ({
        city: {
          city: dest.split(',')[0]?.trim() || dest,
          country: dest.split(',')[1]?.trim() || "Unknown"
        }
      }))
    }

    mockTrips.push(newTrip)

    return NextResponse.json({ 
      success: true, 
      message: 'Trip saved successfully',
      trip: newTrip
    })
  } catch (error) {
    console.error('Save trip API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 