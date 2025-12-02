/*
  Warnings:

  - You are about to drop the column `rekap_absensi_id` on the `absensi` table. All the data in the column will be lost.
  - Added the required column `kelas_id` to the `absensi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `absensi` DROP FOREIGN KEY `absensi_rekap_absensi_id_fkey`;

-- DropIndex
DROP INDEX `absensi_rekap_absensi_id_fkey` ON `absensi`;

-- AlterTable
ALTER TABLE `absensi` DROP COLUMN `rekap_absensi_id`,
    ADD COLUMN `clock_in` DATETIME(3) NULL,
    ADD COLUMN `clock_out` DATETIME(3) NULL,
    ADD COLUMN `kelas_id` INTEGER NOT NULL,
    ALTER COLUMN `status` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
