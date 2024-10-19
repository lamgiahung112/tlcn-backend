/*
  Warnings:

  - You are about to drop the column `paidAt` on the `Order` table. All the data in the column will be lost.
  - Added the required column `recommendedPrice` to the `GenericMotorbike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Motorbike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GenericMotorbike" ADD COLUMN     "recommendedPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Motorbike" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paidAt";
