/*
  Warnings:

  - You are about to drop the `cart_photo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cart_id` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart_photo` DROP FOREIGN KEY `cart_photo_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cart_photo` DROP FOREIGN KEY `cart_photo_photoId_fkey`;

-- AlterTable
ALTER TABLE `photo` ADD COLUMN `cart_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `cart_photo`;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
