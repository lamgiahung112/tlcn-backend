/*
  Warnings:

  - You are about to drop the column `color` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `colorInHex` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Motorbike" DROP COLUMN "color",
DROP COLUMN "colorInHex";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "type";

-- DropEnum
DROP TYPE "ResourceType";

-- CreateTable
CREATE TABLE "MotorbikeVariant" (
    "id" TEXT NOT NULL,
    "motorbike_id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorInHex" TEXT NOT NULL,

    CONSTRAINT "MotorbikeVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantDisplayPicture" (
    "resource_id" TEXT NOT NULL,
    "variant_id" TEXT NOT NULL,

    CONSTRAINT "VariantDisplayPicture_pkey" PRIMARY KEY ("resource_id","variant_id")
);

-- AddForeignKey
ALTER TABLE "MotorbikeVariant" ADD CONSTRAINT "MotorbikeVariant_motorbike_id_fkey" FOREIGN KEY ("motorbike_id") REFERENCES "Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantDisplayPicture" ADD CONSTRAINT "VariantDisplayPicture_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantDisplayPicture" ADD CONSTRAINT "VariantDisplayPicture_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "MotorbikeVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
