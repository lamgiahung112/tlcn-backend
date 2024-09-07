/*
  Warnings:

  - The primary key for the `MotorbikeDetails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detail_description_id` on the `MotorbikeDetails` table. All the data in the column will be lost.
  - You are about to drop the `DetailDescription` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Model` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detail` to the `MotorbikeDetails` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `MotorbikeDetails` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `title` to the `MotorbikeDetails` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('IMAGE', 'VIDEO');

-- DropForeignKey
ALTER TABLE "DetailDescription" DROP CONSTRAINT "DetailDescription_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeDetails" DROP CONSTRAINT "MotorbikeDetails_detail_description_id_fkey";

-- AlterTable
ALTER TABLE "Model" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MotorbikeDetails" DROP CONSTRAINT "MotorbikeDetails_pkey",
DROP COLUMN "detail_description_id",
ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "resource_id" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "MotorbikeDetails_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "type" "ResourceType" NOT NULL DEFAULT 'IMAGE';

-- DropTable
DROP TABLE "DetailDescription";

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail_resource_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "modified_at" TIMESTAMP(3) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MotorbikeDetails" ADD CONSTRAINT "MotorbikeDetails_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_thumbnail_resource_id_fkey" FOREIGN KEY ("thumbnail_resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
