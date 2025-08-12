import Redis from 'ioredis';
import { config } from 'dotenv';

// Load environment variables first
config();

// Redis Cloud connection using endpoint and password
const redis = new Redis({
  host: process.env.REDIS_HOST || 'redis-13510.c8.us-east-1-3.ec2.redns.redis-cloud.com',
  port: parseInt(process.env.REDIS_PORT || '13510'),
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME || 'default',
  maxRetriesPerRequest: null,
  lazyConnect: false,
  enableOfflineQueue: true,
  connectTimeout: 10000,
});

// Handle connection events
redis.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err.message);
  if (err.message.includes('NOAUTH')) {
    console.error('💡 Authentication failed. Please check your Redis password.');
    console.error('   Make sure REDIS_PASSWORD is set in your .env file');
  }
});

redis.on('ready', () => {
  console.log('🚀 Redis ready to accept commands');
});

export default redis;
