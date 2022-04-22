/*
  Warnings:

  - You are about to drop the column `bahanId` on the `bahan` table. All the data in the column will be lost.
  - Added the required column `bahanBakuId` to the `bahan_di_resep` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bahan` DROP FOREIGN KEY `bahan_bahanId_fkey`;

-- AlterTable
ALTER TABLE `bahan` DROP COLUMN `bahanId`;

-- AlterTable
ALTER TABLE `bahan_di_resep` ADD COLUMN `bahanBakuId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `bahan_di_resep` ADD CONSTRAINT `bahan_di_resep_bahanBakuId_fkey` FOREIGN KEY (`bahanBakuId`) REFERENCES `bahan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
