/*
  Warnings:

  - You are about to drop the column `cart_id` on the `photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `photo` DROP FOREIGN KEY `Photo_cart_id_fkey`;

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `cart_id`;

-- CreateTable
CREATE TABLE `photoOnCart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photoId` INTEGER NOT NULL,
    `cartId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photoOnCart` ADD CONSTRAINT `photoOnCart_photoId_fkey` FOREIGN KEY (`photoId`) REFERENCES `Photo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `photoOnCart` ADD CONSTRAINT `photoOnCart_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
