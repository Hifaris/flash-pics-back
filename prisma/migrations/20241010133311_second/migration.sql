/*
  Warnings:

  - You are about to drop the column `image_url` on the `photo` table. All the data in the column will be lost.
  - Added the required column `cartTotal` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Keyword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `cartTotal` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updatedAt` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `keyword` ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `updatedAt` TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE `photo` DROP COLUMN `image_url`,
    ADD COLUMN `asset_id` VARCHAR(191) NULL,
    ADD COLUMN `public_id` VARCHAR(191) NULL,
    ADD COLUMN `secure_url` VARCHAR(191) NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
