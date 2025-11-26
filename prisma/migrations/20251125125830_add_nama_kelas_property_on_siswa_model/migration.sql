/*
  Warnings:

  - Added the required column `nama_kelas` to the `siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `siswa` ADD COLUMN `nama_kelas` VARCHAR(191) NOT NULL;
