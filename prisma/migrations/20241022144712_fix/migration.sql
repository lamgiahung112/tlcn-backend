/*
  Warnings:

  - You are about to drop the `GenericMotorbikeDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GenericMotorbikeDetail" DROP CONSTRAINT "GenericMotorbikeDetail_genericMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "GenericMotorbikeDetail" DROP CONSTRAINT "GenericMotorbikeDetail_imageResourceId_fkey";

-- DropTable
DROP TABLE "GenericMotorbikeDetail";
