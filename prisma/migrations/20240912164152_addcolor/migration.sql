/*
  Warnings:

  - You are about to drop the column `color` on the `MotorbikeVariant` table. All the data in the column will be lost.
  - You are about to drop the column `colorInHex` on the `MotorbikeVariant` table. All the data in the column will be lost.
  - Added the required column `color_id` to the `MotorbikeVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MotorbikeVariant" DROP COLUMN "color",
DROP COLUMN "colorInHex",
ADD COLUMN     "color_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MotorbikeVariant" ADD CONSTRAINT "MotorbikeVariant_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
