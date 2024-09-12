/*
  Warnings:

  - Changed the type of `recommended_price` on the `Motorbike` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Motorbike" DROP COLUMN "recommended_price",
ADD COLUMN     "recommended_price" INTEGER NOT NULL;
