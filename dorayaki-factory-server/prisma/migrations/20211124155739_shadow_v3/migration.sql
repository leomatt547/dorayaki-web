/*
  Warnings:

  - You are about to drop the column `dorayakiId` on the `bahan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bahan` DROP FOREIGN KEY `bahan_dorayakiId_fkey`;

-- AlterTable
ALTER TABLE `bahan` DROP COLUMN `dorayakiId`,
    ADD COLUMN `bahanId` INTEGER NULL;

-- CreateTable
CREATE TABLE `bahan_di_resep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah` INTEGER NOT NULL DEFAULT 0,
    `dorayakiId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bahan` ADD CONSTRAINT `bahan_bahanId_fkey` FOREIGN KEY (`bahanId`) REFERENCES `bahan_di_resep`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bahan_di_resep` ADD CONSTRAINT `bahan_di_resep_dorayakiId_fkey` FOREIGN KEY (`dorayakiId`) REFERENCES `dorayaki`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
