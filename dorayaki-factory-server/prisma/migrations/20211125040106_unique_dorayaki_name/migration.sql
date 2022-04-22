/*
  Warnings:

  - A unique constraint covering the columns `[nama]` on the table `dorayaki` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `dorayaki_nama_key` ON `dorayaki`(`nama`);
