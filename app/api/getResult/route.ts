import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');
    
    if (!key) {
      return NextResponse.json(
        { error: 'Missing key parameter' },
        { status: 400 }
      );
    }
    
    // Check if the result is ready in Redis cache
    const result = await redis.get(`result:${key}`);
    
    if (result) {
      // Result is ready
      const parsedResult = JSON.parse(result);
      
      // Also store the result keyed by input hash for future cache hits
      const inputHash = parsedResult.inputHash;
      if (inputHash) {
        await redis.set(`input:${inputHash}`, JSON.stringify(parsedResult), 'EX', 86400); // 24 hour expiry
      }
      
      return NextResponse.json({
        key,
        result: parsedResult,
        status: 'completed',
        message: 'Result retrieved successfully'
      });
    }
    
    // Check if the job is still processing
    const isProcessing = await redis.get(`processing:${key}`);
    if (isProcessing) {
      return NextResponse.json({
        key,
        status: 'processing',
        message: 'Job is still being processed'
      });
    }
    
    // Result not found and not processing
    return NextResponse.json(
      { error: 'Result not found' },
      { status: 404 }
    );
    
  } catch (error) {
    console.error('Error retrieving result:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve result' },
      { status: 500 }
    );
  }
} 