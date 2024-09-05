/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('STROKE', 'SCOOTER', 'HEAVYBIKE');

-- DropTable
DROP TABLE "Admin";

-- CreateTable
CREATE TABLE "MotorbikeModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MotorbikeModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailDescription" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "resource_id" TEXT,

    CONSTRAINT "DetailDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MotorbikeDetails" (
    "detail_description_id" TEXT NOT NULL,
    "motorbike_id" TEXT NOT NULL,

    CONSTRAINT "MotorbikeDetails_pkey" PRIMARY KEY ("motorbike_id","detail_description_id")
);

-- CreateTable
CREATE TABLE "MotorBikePictures" (
    "resource_id" TEXT NOT NULL,
    "motorbike_id" TEXT NOT NULL,

    CONSTRAINT "MotorBikePictures_pkey" PRIMARY KEY ("resource_id","motorbike_id")
);

-- CreateTable
CREATE TABLE "Motorbike" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "model_id" TEXT NOT NULL,
    "recommended_price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "colors" JSONB[],
    "engineSpecs" JSONB NOT NULL,
    "chassisSpecs" JSONB NOT NULL,
    "sizeSpecs" JSONB NOT NULL,
    "warrantySpecs" JSONB NOT NULL,

    CONSTRAINT "Motorbike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetailDescription" ADD CONSTRAINT "DetailDescription_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorbikeDetails" ADD CONSTRAINT "MotorbikeDetails_motorbike_id_fkey" FOREIGN KEY ("motorbike_id") REFERENCES "Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorbikeDetails" ADD CONSTRAINT "MotorbikeDetails_detail_description_id_fkey" FOREIGN KEY ("detail_description_id") REFERENCES "DetailDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorBikePictures" ADD CONSTRAINT "MotorBikePictures_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorBikePictures" ADD CONSTRAINT "MotorBikePictures_motorbike_id_fkey" FOREIGN KEY ("motorbike_id") REFERENCES "Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
