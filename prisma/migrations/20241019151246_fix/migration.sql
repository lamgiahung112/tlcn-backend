/*
  Warnings:

  - You are about to drop the column `paidDepositAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paidFullAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPaid` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paidDepositAt",
DROP COLUMN "paidFullAt",
DROP COLUMN "totalPaid",
ADD COLUMN     "paidAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Charge" (
    "id" SERIAL NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Charge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Charge_transaction_id_key" ON "Charge"("transaction_id");
