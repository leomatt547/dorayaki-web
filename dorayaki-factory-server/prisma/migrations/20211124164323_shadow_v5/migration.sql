/*
  Warnings:

  - The primary key for the `bahan_di_resep` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `bahan_di_resep` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bahan_di_resep` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`dorayakiId`, `bahanBakuId`);
