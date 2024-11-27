-- DropForeignKey
ALTER TABLE `ServiceAppointment` DROP FOREIGN KEY `ServiceAppointment_serviceTokenId_fkey`;

-- AlterTable
ALTER TABLE `ServiceAppointment` MODIFY `serviceTokenId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ServiceAppointment` ADD CONSTRAINT `ServiceAppointment_serviceTokenId_fkey` FOREIGN KEY (`serviceTokenId`) REFERENCES `ServiceToken`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
