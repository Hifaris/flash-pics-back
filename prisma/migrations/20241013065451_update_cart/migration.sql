/*
  Warnings:

  - Added the required column `price` to the `photoOnCart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `photoOnCart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `photooncart` ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NOT NULL;
