/*
  Warnings:

  - You are about to drop the column `quantity` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `GenericMotorbike` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `quantity`;

-- CreateTable
CREATE TABLE `OrderCartItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `genericMotorbikeId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderCartItem` ADD CONSTRAINT `OrderCartItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
