-- AlterTable
ALTER TABLE `request` ADD COLUMN `status` ENUM('ACCEPTED', 'WAITING', 'REJECTED') NOT NULL DEFAULT 'WAITING';
