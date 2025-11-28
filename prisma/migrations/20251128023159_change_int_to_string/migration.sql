-- DropIndex
DROP INDEX `guru_bk_nip_key` ON `guru_bk`;

-- AlterTable
ALTER TABLE `guru_bk` MODIFY `nip` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `siswa` MODIFY `nomor_wali` VARCHAR(191) NOT NULL;
