/*
  Warnings:

  - You are about to drop the column `colors` on the `Motorbike` table. All the data in the column will be lost.
  - Added the required column `color` to the `Motorbike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorInHex` to the `Motorbike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motorbike" DROP COLUMN "colors",
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "colorInHex" TEXT NOT NULL;
