import { Queue, Worker } from "bullmq";
import { redis } from "./redis";

export const mainQueue = new Queue("mainQueue", { connection: redis });
export const deadQueue1 = new Queue("deadQueue1", { connection: redis });
export const deadQueue2 = new Queue("deadQueue2", { connection: redis });

async function geminiProcess(data: any) {
  return { result: `Processed: ${data.key}` };
}

new Worker("mainQueue", async job => {
  try {
    const result = await geminiProcess(job.data);
    await redis.set(job.data.key, JSON.stringify(result));
    return result;
  } catch (err) {
    await deadQueue1.add("retry", job.data);
  }
}, { connection: redis });

new Worker("deadQueue1", async job => {
  try {
    const result = await geminiProcess(job.data);
    await redis.set(job.data.key, JSON.stringify(result));
    return result;
  } catch (err) {
    await deadQueue2.add("retry", job.data);
  }
}, { connection: redis });

new Worker("deadQueue2", async job => {
  try {
    const result = await geminiProcess(job.data);
    await redis.set(job.data.key, JSON.stringify(result));
    return result;
  } catch (err) {
    // permanent fail handling
  }
}, { connection: redis });
