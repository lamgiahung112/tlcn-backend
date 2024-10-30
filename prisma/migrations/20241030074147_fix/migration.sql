-- AddForeignKey
ALTER TABLE `OrderCartItem` ADD CONSTRAINT `OrderCartItem_genericMotorbikeId_fkey` FOREIGN KEY (`genericMotorbikeId`) REFERENCES `GenericMotorbike`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
