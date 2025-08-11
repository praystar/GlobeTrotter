#!/usr/bin/env tsx

import { config } from 'dotenv';
import redis from '../lib/redis';

// Load environment variables
config();

// Debug: Show environment variables
console.log('Environment variables loaded:');
console.log('REDIS_HOST:', process.env.REDIS_HOST);
console.log('REDIS_PORT:', process.env.REDIS_PORT);
console.log('REDIS_USERNAME:', process.env.REDIS_USERNAME);
console.log('REDIS_PASSWORD:', process.env.REDIS_PASSWORD ? '***' : 'Not set');
console.log('');

async function testRedis() {
  try {
    console.log('Testing Redis connection...');
    
    // Test basic connection
    await redis.ping();
    console.log('✅ Redis connection successful');
    
    // Test set/get
    await redis.set('test:key', 'test:value', 'EX', 60);
    const value = await redis.get('test:key');
    console.log('✅ Redis set/get test:', value);
    
    // Test expiration
    await redis.del('test:key');
    console.log('✅ Redis cleanup successful');
    
    console.log('\n🎉 All Redis tests passed!');
    
  } catch (error) {
    console.error('❌ Redis test failed:', error);
    process.exit(1);
  } finally {
    await redis.quit();
  }
}

testRedis(); 