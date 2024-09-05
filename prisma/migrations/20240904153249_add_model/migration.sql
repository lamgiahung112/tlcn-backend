/*
  Warnings:

  - You are about to drop the `MotorbikeModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MotorbikeModel";

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Motorbike" ADD CONSTRAINT "Motorbike_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
