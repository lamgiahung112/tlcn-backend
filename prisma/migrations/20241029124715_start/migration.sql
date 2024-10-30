-- CreateTable
CREATE TABLE `ImageResource` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `s3Key` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GenericMotorbike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` ENUM('SCOOTER', 'HEAVY', 'STROKE') NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `recommendedPrice` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `colorInHex` CHAR(7) NULL,
    `colorName` VARCHAR(191) NULL,
    `engineSpecs` JSON NULL,
    `chassisSpecs` JSON NULL,
    `warrantySpecs` JSON NULL,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GenericMotorbikeImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `genericMotorbikeId` INTEGER NOT NULL,
    `imageResourceId` INTEGER NOT NULL,
    `isGallery` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Motorbike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `genericMotorbikeId` INTEGER NOT NULL,
    `chassisCode` VARCHAR(191) NULL,
    `engineCode` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `arrivedToInventoryAt` DATETIME(3) NULL,
    `isSold` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `publicOrderId` VARCHAR(191) NOT NULL,
    `status` ENUM('CREATED', 'CANCELLED', 'CONFIRMED', 'DELIVERY_STARTED', 'COMPLETED') NOT NULL DEFAULT 'CREATED',
    `total` INTEGER NOT NULL,
    `cancelReason` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `confirmedAt` DATETIME(3) NULL,
    `startedDeliveryAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `cancelledAt` DATETIME(3) NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerPhone` VARCHAR(191) NOT NULL,
    `customerAddress` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Order_publicOrderId_key`(`publicOrderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Charge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` VARCHAR(191) NOT NULL,
    `orderId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Charge_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `motorbikeId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GenericMotorbikeImage` ADD CONSTRAINT `GenericMotorbikeImage_genericMotorbikeId_fkey` FOREIGN KEY (`genericMotorbikeId`) REFERENCES `GenericMotorbike`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GenericMotorbikeImage` ADD CONSTRAINT `GenericMotorbikeImage_imageResourceId_fkey` FOREIGN KEY (`imageResourceId`) REFERENCES `ImageResource`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Motorbike` ADD CONSTRAINT `Motorbike_genericMotorbikeId_fkey` FOREIGN KEY (`genericMotorbikeId`) REFERENCES `GenericMotorbike`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_motorbikeId_fkey` FOREIGN KEY (`motorbikeId`) REFERENCES `Motorbike`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
