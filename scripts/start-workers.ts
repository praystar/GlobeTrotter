#!/usr/bin/env tsx

import { worker, dlq1Worker, dlq2Worker } from '../lib/queues';

console.log('Starting BullMQ workers...');

// The workers are already configured in lib/queues.ts
// This script just ensures they're running and handles graceful shutdown

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down workers...');
  await worker.close();
  await dlq1Worker.close();
  await dlq2Worker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down workers...');
  await worker.close();
  await dlq1Worker.close();
  await dlq2Worker.close();
  process.exit(0);
});

console.log('Workers started successfully. Press Ctrl+C to stop.');
console.log('Main queue worker: travel-plan-queue');
console.log('DLQ1 worker: travel-plan-dlq1');
console.log('DLQ2 worker: travel-plan-dlq2');

// Keep the process alive
setInterval(() => {
  // Heartbeat to keep the process running
}, 30000); 