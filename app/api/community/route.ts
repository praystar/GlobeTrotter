import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET - Fetch all community reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            email: true,
            profile_photo_url: true
          }
        },
        trip: {
          include: {
            stops: {
              include: {
                city: true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    // Transform the data to match the frontend Review type
    const transformedReviews = reviews.map(review => ({
      review_id: review.review_id,
      user_id: review.user_id,
      trip_id: review.trip_id,
      stars: review.stars,
      description: review.description,
      created_at: review.created_at.toISOString().split('T')[0],
      user: {
        email: review.user.email,
        profile_photo_url: review.user.profile_photo_url
      },
      trip: {
        description: review.trip.description,
        city: review.trip.stops[0]?.city ? {
          city: review.trip.stops[0].city.city,
          country: review.trip.stops[0].city.country
        } : {
          city: "Unknown",
          country: "Unknown"
        }
      }
    }))

    return NextResponse.json({
      success: true,
      reviews: transformedReviews
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch reviews',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// POST - Create a new community review
export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { destination, stars, description } = await request.json()
    
    // Validate required fields
    if (!destination || !description || !stars || stars < 1 || stars > 5) {
      return NextResponse.json({ 
        error: 'Missing or invalid fields: destination, description, and stars (1-5) are required' 
      }, { status: 400 })
    }

    // Check if user exists in database, create if not
    let user = await prisma.user.findUnique({
      where: { user_id: userId }
    })
    
    if (!user) {
      // Get user info from Clerk
      const clerkUser = await currentUser()
      if (!clerkUser) {
        return NextResponse.json({ error: 'User not found in Clerk' }, { status: 404 })
      }
      
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
    }

    // Create or find a city for the destination
    const cityName = destination.split(',')[0]?.trim() || destination
    const countryName = destination.split(',')[1]?.trim() || "Unknown"
    
    let city = await prisma.city.findFirst({
      where: {
        city: cityName,
        country: countryName
      }
    })
    
    if (!city) {
      city = await prisma.city.create({
        data: {
          city: cityName,
          country: countryName,
          state: null,
          image_url: null,
          description: null
        }
      })
    }

    // Create a simple trip for the review (since we don't have trip details)
    const trip = await prisma.trip.create({
      data: {
        description: destination,
        start_date: new Date(),
        end_date: new Date(),
        user_id: userId,
        stops: {
          create: {
            city_id: city.city_id,
            sequence: 1,
            arrival_date: new Date(),
            departure_date: new Date()
          }
        }
      }
    })

    // Create the review
    const review = await prisma.review.create({
      data: {
        user_id: userId,
        trip_id: trip.trip_id,
        stars: stars,
        description: description
      },
      include: {
        user: {
          select: {
            email: true,
            profile_photo_url: true
          }
        },
        trip: {
          include: {
            stops: {
              include: {
                city: true
              }
            }
          }
        }
      }
    })

    // Transform the review to match frontend format
    const transformedReview = {
      review_id: review.review_id,
      user_id: review.user_id,
      trip_id: review.trip_id,
      stars: review.stars,
      description: review.description,
      created_at: review.created_at.toISOString().split('T')[0],
      user: {
        email: review.user.email,
        profile_photo_url: review.user.profile_photo_url
      },
      trip: {
        description: review.trip.description,
        city: {
          city: review.trip.stops[0]?.city.city || "Unknown",
          country: review.trip.stops[0]?.city.country || "Unknown"
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Review created successfully',
      review: transformedReview
    })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ 
      error: 'Failed to create review',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 