-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `discount` INTEGER NOT NULL DEFAULT 0,
    `type` ENUM('PERCENTAGE', 'FIXED', 'ITEM') NOT NULL,
    `itemImageResourceId` INTEGER NULL,
    `itemName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Coupon_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceAppointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceTokenId` INTEGER NOT NULL,
    `cancelledAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Coupon` ADD CONSTRAINT `Coupon_itemImageResourceId_fkey` FOREIGN KEY (`itemImageResourceId`) REFERENCES `ImageResource`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceAppointment` ADD CONSTRAINT `ServiceAppointment_serviceTokenId_fkey` FOREIGN KEY (`serviceTokenId`) REFERENCES `ServiceToken`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
