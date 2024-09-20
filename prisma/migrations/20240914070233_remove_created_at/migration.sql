/*
  Warnings:

  - You are about to drop the column `created_at` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Model` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_thumbnail_resource_id_fkey";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "created_at";

-- AlterTable
ALTER TABLE "Model" DROP COLUMN "created_at";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_thumbnail_resource_id_fkey" FOREIGN KEY ("thumbnail_resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
