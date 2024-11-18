-- CreateTable
CREATE TABLE `ServiceToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motorbikeId` INTEGER NOT NULL,
    `minMonth` INTEGER NOT NULL,
    `maxMonth` INTEGER NOT NULL,
    `maxOdometer` INTEGER NOT NULL,
    `usedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceToken` ADD CONSTRAINT `ServiceToken_motorbikeId_fkey` FOREIGN KEY (`motorbikeId`) REFERENCES `Motorbike`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
