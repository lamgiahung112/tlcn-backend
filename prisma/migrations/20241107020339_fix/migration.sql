/*
  Warnings:

  - You are about to drop the `Charge` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paypalOrderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Charge` DROP FOREIGN KEY `Charge_orderId_fkey`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `paypalOrderId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Charge`;

-- CreateIndex
CREATE UNIQUE INDEX `Order_paypalOrderId_key` ON `Order`(`paypalOrderId`);
