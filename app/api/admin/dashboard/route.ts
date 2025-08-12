import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// Mock data for charts - replace with actual database queries

const mockPopularCities = [
  { name: "Paris", value: 35, color: "#8E9C78" },
  { name: "Tokyo", value: 25, color: "#485C11" },
  { name: "New York", value: 20, color: "#C7B697" },
  { name: "London", value: 15, color: "#929292" },
  { name: "Others", value: 5, color: "#DFECC6" }
]

const mockActivities = [
  { activity: "Sightseeing", count: 45 },
  { activity: "Food Tours", count: 32 },
  { activity: "Adventure", count: 28 },
  { activity: "Cultural Tours", count: 22 },
  { activity: "Shopping", count: 18 }
]

const mockUserTrends = [
  { period: "Jan", users: 120 },
  { period: "Feb", users: 180 },
  { period: "Mar", users: 220 },
  { period: "Apr", users: 280 },
  { period: "May", users: 320 },
  { period: "Jun", users: 290 },
  { period: "Jul", users: 350 },
  { period: "Aug", users: 380 }
]

async function getDashboardStats() {
  // Get real data from database
  const totalUsers = await prisma.user.count()
  const totalTrips = await prisma.trip.count()
  const averageTripsPerUser = totalUsers > 0 ? Math.round(totalTrips / totalUsers) : 0
  
  // Get top city by number of trips
  const topCityResult = await prisma.stop.groupBy({
    by: ['city_id'],
    _count: {
      city_id: true
    },
    orderBy: {
      _count: {
        city_id: 'desc'
      }
    },
    take: 1
  })
  
  let topCity = "Unknown"
  if (topCityResult.length > 0) {
    const city = await prisma.city.findUnique({
      where: { city_id: topCityResult[0].city_id }
    })
    topCity = city ? city.city : "Unknown"
  }
  
  return {
    totalUsers,
    totalTrips,
    averageTripsPerUser,
    topCity,
    topActivity: mockActivities[0].activity // Keep mock for now
  }
}

export async function GET() {
  try {
    // Check if user is authenticated and has admin privileges
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Add admin role check here
    // const user = await getUserById(userId)
    // if (!user.isAdmin) {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }

    // Get real users from database
    const users = await prisma.user.findMany({
      select: {
        user_id: true,
        email: true,
        role: true,
        created_at: true,
        updated_at: true,
        profile_photo_url: true,
        trips: {
          select: {
            trip_id: true
          }
        }
      }
    })

    // Transform users to match the expected format
    const transformedUsers = users.map(user => ({
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString(),
      profile_photo_url: user.profile_photo_url,
      trips: user.trips.length
    }))

    return NextResponse.json({
      users: transformedUsers,
      popularCities: mockPopularCities,
      activities: mockActivities,
      userTrends: mockUserTrends,
      stats: await getDashboardStats()
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'updateUser':
        // TODO: Implement user update logic
        return NextResponse.json({ success: true, message: 'User updated successfully' })
      
      case 'deleteUser':
        // Delete user from database
        const userToDelete = data.userId
        await prisma.user.delete({
          where: { user_id: userToDelete }
        })
        return NextResponse.json({ 
          success: true, 
          message: 'User deleted successfully',
          stats: await getDashboardStats() // Return updated stats
        })
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
