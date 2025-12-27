-- AlterTable
ALTER TABLE `admin` MODIFY `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE `guru` MODIFY `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'guru';

-- AlterTable
ALTER TABLE `guru_bk` MODIFY `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'guru_bk';

-- AlterTable
ALTER TABLE `siswa` ADD COLUMN `avatar` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `wali_kelas` MODIFY `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'wali_kelas';
