/*
  Warnings:

  - Added the required column `mapel` to the `wali_kelas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wali_kelas` ADD COLUMN `mapel` VARCHAR(191) NOT NULL,
    MODIFY `mengajar_kelas` VARCHAR(191) NULL;
