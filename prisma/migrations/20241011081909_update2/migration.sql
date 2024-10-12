/*
  Warnings:

  - You are about to alter the column `payment_status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `payment_status` ENUM('PENDING', 'CONFIRM', 'REJECT') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `enable` BOOLEAN NOT NULL DEFAULT true;
