/*
  Warnings:

  - Added the required column `judul_surat` to the `surat_peringatan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `surat_peringatan` ADD COLUMN `judul_surat` VARCHAR(191) NOT NULL;
