-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'admin',

    UNIQUE INDEX `admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wali_kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `mapel` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'wali_kelas',

    UNIQUE INDEX `wali_kelas_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kelas` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `wali_kelas_id` INTEGER NULL,
    `guru_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `kelas_nama_kelas_key`(`nama_kelas`),
    UNIQUE INDEX `kelas_wali_kelas_id_key`(`wali_kelas_id`),
    UNIQUE INDEX `kelas_guru_id_key`(`guru_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guru` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `mapel` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'guru',

    UNIQUE INDEX `guru_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `nomor_wali` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'siswa',
    `kelas_id` INTEGER NOT NULL,

    UNIQUE INDEX `siswa_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `absensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `siswa_id` INTEGER NOT NULL,
    `kelas_id` INTEGER NOT NULL,
    `status` ENUM('hadir', 'sakit', 'izin', 'alfa', 'missing') NOT NULL,
    `clock_in` DATETIME(3) NULL,
    `clock_out` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rekap_absensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siswa_id` INTEGER NOT NULL,
    `kelas_id` INTEGER NOT NULL,
    `bulan` INTEGER NOT NULL,
    `tahun` INTEGER NOT NULL,
    `minggu_ke` INTEGER NOT NULL,
    `total_hadir` INTEGER NOT NULL DEFAULT 0,
    `total_sakit` INTEGER NOT NULL DEFAULT 0,
    `total_izin` INTEGER NOT NULL DEFAULT 0,
    `total_alpha` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `rekap_absensi_siswa_id_kelas_id_minggu_ke_bulan_tahun_key`(`siswa_id`, `kelas_id`, `minggu_ke`, `bulan`, `tahun`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guru_bk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nip` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk', 'siswa') NOT NULL DEFAULT 'guru_bk',

    UNIQUE INDEX `guru_bk_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surat_peringatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siswa_id` INTEGER NOT NULL,
    `rekap_absensi_id` INTEGER NOT NULL,
    `judul_surat` VARCHAR(191) NOT NULL,
    `tanggal_terbit` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `file` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qr_token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expired_at` DATETIME(3) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `kelas_id` INTEGER NOT NULL,
    `qrtype` ENUM('clock_in', 'clock_out') NULL,

    UNIQUE INDEX `qr_token_token_key`(`token`),
    UNIQUE INDEX `qr_token_kelas_id_key`(`kelas_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_wali_kelas_id_fkey` FOREIGN KEY (`wali_kelas_id`) REFERENCES `wali_kelas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_guru_id_fkey` FOREIGN KEY (`guru_id`) REFERENCES `guru`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekap_absensi` ADD CONSTRAINT `rekap_absensi_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekap_absensi` ADD CONSTRAINT `rekap_absensi_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surat_peringatan` ADD CONSTRAINT `surat_peringatan_rekap_absensi_id_fkey` FOREIGN KEY (`rekap_absensi_id`) REFERENCES `rekap_absensi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surat_peringatan` ADD CONSTRAINT `surat_peringatan_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qr_token` ADD CONSTRAINT `qr_token_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
