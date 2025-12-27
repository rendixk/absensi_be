-- AlterTable
ALTER TABLE `siswa` ADD COLUMN `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'siswa';
