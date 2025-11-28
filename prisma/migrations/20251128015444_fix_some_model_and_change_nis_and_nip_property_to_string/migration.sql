-- DropIndex
DROP INDEX `guru_nip_key` ON `guru`;

-- DropIndex
DROP INDEX `siswa_nis_key` ON `siswa`;

-- DropIndex
DROP INDEX `wali_kelas_nip_key` ON `wali_kelas`;

-- AlterTable
ALTER TABLE `guru` MODIFY `nip` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `siswa` MODIFY `nis` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wali_kelas` MODIFY `nip` VARCHAR(191) NOT NULL;
