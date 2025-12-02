/*
  Warnings:

  - You are about to drop the column `absensi_id` on the `surat_peringatan` table. All the data in the column will be lost.
  - You are about to drop the column `total_alpha` on the `surat_peringatan` table. All the data in the column will be lost.
  - Added the required column `rekap_absensi_id` to the `surat_peringatan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siswa_id` to the `surat_peringatan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `surat_peringatan` DROP FOREIGN KEY `surat_peringatan_absensi_id_fkey`;

-- DropIndex
DROP INDEX `surat_peringatan_absensi_id_key` ON `surat_peringatan`;

-- AlterTable
ALTER TABLE `surat_peringatan` DROP COLUMN `absensi_id`,
    DROP COLUMN `total_alpha`,
    ADD COLUMN `rekap_absensi_id` INTEGER NOT NULL,
    ADD COLUMN `siswa_id` INTEGER NOT NULL,
    ADD COLUMN `tanggal_terbit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `tingkat_sp` ENUM('SP1', 'SP2', 'SP3') NOT NULL DEFAULT 'SP1';

-- AddForeignKey
ALTER TABLE `surat_peringatan` ADD CONSTRAINT `surat_peringatan_rekap_absensi_id_fkey` FOREIGN KEY (`rekap_absensi_id`) REFERENCES `rekap_absensi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surat_peringatan` ADD CONSTRAINT `surat_peringatan_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
