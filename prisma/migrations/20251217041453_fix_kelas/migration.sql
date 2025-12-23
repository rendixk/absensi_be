-- DropForeignKey
ALTER TABLE `kelas` DROP FOREIGN KEY `kelas_wali_kelas_id_fkey`;

-- AlterTable
ALTER TABLE `kelas` MODIFY `wali_kelas_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_wali_kelas_id_fkey` FOREIGN KEY (`wali_kelas_id`) REFERENCES `wali_kelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
