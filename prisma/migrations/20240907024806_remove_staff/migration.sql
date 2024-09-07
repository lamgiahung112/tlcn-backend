/*
  Warnings:

  - You are about to drop the column `author_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_author_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "author_id";

-- DropTable
DROP TABLE "Staff";
