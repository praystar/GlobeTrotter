-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('TRANSPORT', 'FOOD', 'HOTEL');

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" SERIAL NOT NULL,
    "password_hash" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_photo_url" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."admin" (
    "admin_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "top_cities" TEXT,
    "city_id" INTEGER,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("admin_id")
);

-- CreateTable
CREATE TABLE "public"."city" (
    "city_id" SERIAL NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT NOT NULL,
    "image_url" TEXT,
    "description" TEXT,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "public"."trips" (
    "trip_id" SERIAL NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "user_id" INTEGER NOT NULL,
    "city_id" INTEGER,
    "admin_id" INTEGER,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "public"."budgets" (
    "budget_id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "category" "public"."Category" NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("budget_id")
);

-- CreateTable
CREATE TABLE "public"."activities" (
    "activity_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cost" DOUBLE PRECISION,
    "image_url" TEXT,
    "duration" INTEGER,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "public"."stops" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "sequence" INTEGER,

    CONSTRAINT "stops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."stop_activities" (
    "id" SERIAL NOT NULL,
    "stop_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,

    CONSTRAINT "stop_activities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "public"."admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stop_activities_stop_id_activity_id_key" ON "public"."stop_activities"("stop_id", "activity_id");

-- AddForeignKey
ALTER TABLE "public"."admin" ADD CONSTRAINT "admin_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."city"("city_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."city"("city_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."trips" ADD CONSTRAINT "trips_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("admin_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."budgets" ADD CONSTRAINT "budgets_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activities" ADD CONSTRAINT "activities_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stops" ADD CONSTRAINT "stops_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("trip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stops" ADD CONSTRAINT "stops_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "public"."city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stop_activities" ADD CONSTRAINT "stop_activities_stop_id_fkey" FOREIGN KEY ("stop_id") REFERENCES "public"."stops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."stop_activities" ADD CONSTRAINT "stop_activities_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("activity_id") ON DELETE CASCADE ON UPDATE CASCADE;
