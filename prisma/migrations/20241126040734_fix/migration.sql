-- AlterTable
ALTER TABLE `Coupon` ADD COLUMN `expiredAt` DATETIME(3) NULL,
    ADD COLUMN `maxUsage` INTEGER NULL;
