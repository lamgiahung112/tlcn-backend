/*
  Warnings:

  - You are about to drop the column `motorbikeId` on the `ServiceAppointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ServiceAppointment` DROP FOREIGN KEY `ServiceAppointment_motorbikeId_fkey`;

-- AlterTable
ALTER TABLE `ServiceAppointment` DROP COLUMN `motorbikeId`,
    ADD COLUMN `chargeTotal` INTEGER NOT NULL DEFAULT 0;
