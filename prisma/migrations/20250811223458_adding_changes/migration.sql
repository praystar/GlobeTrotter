/*
  Warnings:

  - You are about to drop the column `city_id` on the `trips` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trip_id,sequence]` on the table `stops` will be added. If there are existing duplicate values, this will fail.
  - Made the column `sequence` on table `stops` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "public"."trips" DROP CONSTRAINT "trips_city_id_fkey";

-- AlterTable
ALTER TABLE "public"."stops" ADD COLUMN     "arrival_date" TIMESTAMP(3),
ADD COLUMN     "departure_date" TIMESTAMP(3),
ALTER COLUMN "sequence" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."trips" DROP COLUMN "city_id";

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE INDEX "activities_city_id_idx" ON "public"."activities"("city_id");

-- CreateIndex
CREATE INDEX "budgets_trip_id_idx" ON "public"."budgets"("trip_id");

-- CreateIndex
CREATE INDEX "city_city_state_country_idx" ON "public"."city"("city", "state", "country");

-- CreateIndex
CREATE INDEX "reviews_trip_id_idx" ON "public"."reviews"("trip_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "public"."reviews"("user_id");

-- CreateIndex
CREATE INDEX "stop_activities_stop_id_idx" ON "public"."stop_activities"("stop_id");

-- CreateIndex
CREATE INDEX "stop_activities_activity_id_idx" ON "public"."stop_activities"("activity_id");

-- CreateIndex
CREATE INDEX "stops_trip_id_idx" ON "public"."stops"("trip_id");

-- CreateIndex
CREATE INDEX "stops_city_id_idx" ON "public"."stops"("city_id");

-- CreateIndex
CREATE UNIQUE INDEX "stops_trip_id_sequence_key" ON "public"."stops"("trip_id", "sequence");

-- CreateIndex
CREATE INDEX "trips_user_id_idx" ON "public"."trips"("user_id");
