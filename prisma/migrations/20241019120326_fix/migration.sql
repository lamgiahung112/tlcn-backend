/*
  Warnings:

  - You are about to drop the column `colorInHex` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `colorName` on the `Motorbike` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "GenericMotorbike" ADD COLUMN     "colorInHex" CHAR(7),
ADD COLUMN     "colorName" TEXT;

-- AlterTable
ALTER TABLE "Motorbike" DROP COLUMN "colorInHex",
DROP COLUMN "colorName";
