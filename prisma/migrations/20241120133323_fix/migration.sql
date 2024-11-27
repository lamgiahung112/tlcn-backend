/*
  Warnings:

  - You are about to drop the column `chargeTotal` on the `ServiceAppointment` table. All the data in the column will be lost.
  - Made the column `serviceTokenId` on table `ServiceAppointment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ServiceAppointment` DROP FOREIGN KEY `ServiceAppointment_serviceTokenId_fkey`;

-- AlterTable
ALTER TABLE `ServiceAppointment` DROP COLUMN `chargeTotal`,
    MODIFY `serviceTokenId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ServiceAppointment` ADD CONSTRAINT `ServiceAppointment_serviceTokenId_fkey` FOREIGN KEY (`serviceTokenId`) REFERENCES `ServiceToken`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
