-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SCOOTER', 'HEAVY', 'STROKE');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREATED', 'CONFIRMED', 'DELIVERY_STARTED', 'DELIVERED', 'COMPLETED');

-- CreateTable
CREATE TABLE "ImageResource" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImageResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenericMotorbike" (
    "id" SERIAL NOT NULL,
    "category" "Category" NOT NULL,
    "model" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "engineSpecs" JSONB,
    "chassisSpecs" JSONB,
    "warrantySpecs" JSONB,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GenericMotorbike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenericMotorbikeImage" (
    "id" SERIAL NOT NULL,
    "genericMotorbikeId" INTEGER NOT NULL,
    "imageResourceId" INTEGER NOT NULL,
    "isGallery" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GenericMotorbikeImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenericMotorbikeDetail" (
    "id" SERIAL NOT NULL,
    "genericMotorbikeId" INTEGER NOT NULL,
    "imageResourceId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GenericMotorbikeDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Motorbike" (
    "id" SERIAL NOT NULL,
    "genericMotorbikeId" INTEGER NOT NULL,
    "chassisCode" TEXT,
    "engineCode" TEXT,
    "arrivedToInventoryAt" TIMESTAMP(3),
    "colorInHex" CHAR(7),
    "colorName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Motorbike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "email" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "publicOrderId" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "startedDeliveryAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "paidDepositAt" TIMESTAMP(3),
    "paidFullAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "motorbikeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_publicOrderId_key" ON "Order"("publicOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "GenericMotorbikeImage" ADD CONSTRAINT "GenericMotorbikeImage_genericMotorbikeId_fkey" FOREIGN KEY ("genericMotorbikeId") REFERENCES "GenericMotorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericMotorbikeImage" ADD CONSTRAINT "GenericMotorbikeImage_imageResourceId_fkey" FOREIGN KEY ("imageResourceId") REFERENCES "ImageResource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericMotorbikeDetail" ADD CONSTRAINT "GenericMotorbikeDetail_genericMotorbikeId_fkey" FOREIGN KEY ("genericMotorbikeId") REFERENCES "GenericMotorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenericMotorbikeDetail" ADD CONSTRAINT "GenericMotorbikeDetail_imageResourceId_fkey" FOREIGN KEY ("imageResourceId") REFERENCES "ImageResource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motorbike" ADD CONSTRAINT "Motorbike_genericMotorbikeId_fkey" FOREIGN KEY ("genericMotorbikeId") REFERENCES "GenericMotorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
