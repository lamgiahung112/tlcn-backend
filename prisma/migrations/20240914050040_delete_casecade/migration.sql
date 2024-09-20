-- DropForeignKey
ALTER TABLE "MotorBikePictures" DROP CONSTRAINT "MotorBikePictures_motorbike_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorBikePictures" DROP CONSTRAINT "MotorBikePictures_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "Motorbike" DROP CONSTRAINT "Motorbike_model_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeDetails" DROP CONSTRAINT "MotorbikeDetails_motorbike_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeDetails" DROP CONSTRAINT "MotorbikeDetails_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeVariant" DROP CONSTRAINT "MotorbikeVariant_color_id_fkey";

-- DropForeignKey
ALTER TABLE "MotorbikeVariant" DROP CONSTRAINT "MotorbikeVariant_motorbike_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_thumbnail_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "VariantDisplayPicture" DROP CONSTRAINT "VariantDisplayPicture_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "VariantDisplayPicture" DROP CONSTRAINT "VariantDisplayPicture_variant_id_fkey";

-- AddForeignKey
ALTER TABLE "MotorbikeDetails" ADD CONSTRAINT "MotorbikeDetails_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorbikeDetails" ADD CONSTRAINT "MotorbikeDetails_motorbike_id_fkey" FOREIGN KEY ("motorbike_id") REFERENCES "Motorbike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorBikePictures" ADD CONSTRAINT "MotorBikePictures_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorBikePictures" ADD CONSTRAINT "MotorBikePictures_motorbike_id_fkey" FOREIGN KEY ("motorbike_id") REFERENCES "Motorbike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motorbike" ADD CONSTRAINT "Motorbike_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorbikeVariant" ADD CONSTRAINT "MotorbikeVariant_motorbike_id_fkey" FOREIGN KEY ("motorbike_id") REFERENCES "Motorbike"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MotorbikeVariant" ADD CONSTRAINT "MotorbikeVariant_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantDisplayPicture" ADD CONSTRAINT "VariantDisplayPicture_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantDisplayPicture" ADD CONSTRAINT "VariantDisplayPicture_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "MotorbikeVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_thumbnail_resource_id_fkey" FOREIGN KEY ("thumbnail_resource_id") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
