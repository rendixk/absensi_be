/*
  Warnings:

  - Made the column `wali_kelas_id` on table `kelas` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `kelas_wali_kelas_id_fkey`;

-- AlterTable
ALTER TABLE `kelas` MODIFY `wali_kelas_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_wali_kelas_id_fkey` FOREIGN KEY (`wali_kelas_id`) REFERENCES `wali_kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
