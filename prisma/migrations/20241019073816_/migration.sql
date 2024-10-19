/*
  Warnings:

  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MotorBikePictures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Motorbike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MotorbikeDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MotorbikeVariant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantDisplayPicture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MotorBikePictures" DROP CONSTRAINT "MotorBikePictures_motorbike_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorBikePictures" DROP CONSTRAINT "MotorBikePictures_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "Motorbike" DROP CONSTRAINT "Motorbike_model_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeDetails" DROP CONSTRAINT "MotorbikeDetails_motorbike_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeDetails" DROP CONSTRAINT "MotorbikeDetails_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeVariant" DROP CONSTRAINT "MotorbikeVariant_color_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeVariant" DROP CONSTRAINT "MotorbikeVariant_motorbike_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_thumbnail_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "VariantDisplayPicture" DROP CONSTRAINT "VariantDisplayPicture_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "VariantDisplayPicture" DROP CONSTRAINT "VariantDisplayPicture_variant_id_fkey";

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "Model";

-- DropTable
DROP TABLE "MotorBikePictures";

-- DropTable
DROP TABLE "Motorbike";

-- DropTable
DROP TABLE "MotorbikeDetails";

-- DropTable
DROP TABLE "MotorbikeVariant";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "VariantDisplayPicture";

-- DropEnum
DROP TYPE "Category";
