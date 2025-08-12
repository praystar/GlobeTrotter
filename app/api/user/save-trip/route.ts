import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    console.log('Auth check - userId:', userId)
    
    if (!userId) {
      console.log('No userId found - unauthorized')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const tripData = await request.json()
    console.log('Received trip data:', JSON.stringify(tripData, null, 2))
    
    // Validate required fields
    if (!tripData.description || !tripData.start_date || !tripData.end_date || !tripData.destinations) {
      return NextResponse.json({ 
        error: 'Missing required fields: description, start_date, end_date, destinations' 
      }, { status: 400 })
    }
    
    // Check if user exists in database, create if not
    let user = await prisma.user.findUnique({
      where: { user_id: userId }
    })
    
    console.log('User found in database:', user ? 'Yes' : 'No')
    
    if (!user) {
      console.log('Creating new user in database...')
      // Get user info from Clerk
      const clerkUser = await currentUser()
      if (!clerkUser) {
        return NextResponse.json({ error: 'User not found in Clerk' }, { status: 404 })
      }
      
      console.log('Clerk user info:', {
        email: clerkUser.emailAddresses[0]?.emailAddress,
        imageUrl: clerkUser.imageUrl
      })
      
      // Create user in database
      user = await prisma.user.create({
        data: {
          user_id: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || 'unknown@example.com',
          role: 'USER',
          password_hash: null,
          profile_photo_url: clerkUser.imageUrl || null
        }
      })
      console.log('User created successfully:', user.user_id)
    }
    
    // For now, create a simple trip without stops to test
    console.log('Creating simple trip in database...')
    const newTrip = await prisma.trip.create({
      data: {
        description: tripData.description,
        start_date: new Date(tripData.start_date),
        end_date: new Date(tripData.end_date),
        budget: tripData.budget || null,
        travel_style: tripData.travel_style || null,
        accommodation: tripData.accommodation || null,
        transportation: tripData.transportation || null,
        interests: tripData.interests ? JSON.stringify(tripData.interests) : null,
        special_requests: tripData.special_requests || null,
        plan_summary: tripData.plan_summary || null,
        total_cost: tripData.total_cost || null,
        itinerary: tripData.itinerary ? JSON.stringify(tripData.itinerary) : null,
        travel_tips: tripData.travel_tips ? JSON.stringify(tripData.travel_tips) : null,
        packing_list: tripData.packing_list ? JSON.stringify(tripData.packing_list) : null,
        emergency_contacts: tripData.emergency_contacts ? JSON.stringify(tripData.emergency_contacts) : null,
        user_id: userId
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Trip saved successfully',
      trip: newTrip
    })
  } catch (error) {
    console.error('Save trip API error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 