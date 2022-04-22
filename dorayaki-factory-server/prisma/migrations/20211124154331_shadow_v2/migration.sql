/*
  Warnings:

  - You are about to drop the `bahan_di_resep` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bahan_di_resep` DROP FOREIGN KEY `bahan_di_resep_bahanId_fkey`;

-- DropForeignKey
ALTER TABLE `bahan_di_resep` DROP FOREIGN KEY `bahan_di_resep_resepId_fkey`;

-- AlterTable
ALTER TABLE `bahan` ADD COLUMN `dorayakiId` INTEGER NULL;

-- DropTable
DROP TABLE `bahan_di_resep`;

-- AddForeignKey
ALTER TABLE `bahan` ADD CONSTRAINT `bahan_dorayakiId_fkey` FOREIGN KEY (`dorayakiId`) REFERENCES `dorayaki`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
