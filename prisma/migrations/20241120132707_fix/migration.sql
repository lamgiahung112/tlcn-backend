/*
  Warnings:

  - Added the required column `motorbikeId` to the `ServiceAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ServiceAppointment` ADD COLUMN `motorbikeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ServiceAppointment` ADD CONSTRAINT `ServiceAppointment_motorbikeId_fkey` FOREIGN KEY (`motorbikeId`) REFERENCES `Motorbike`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
