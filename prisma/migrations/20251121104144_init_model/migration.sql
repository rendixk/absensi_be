-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk') NOT NULL DEFAULT 'admin',

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wali_kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nip` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `mengajar_kelas` VARCHAR(191) NOT NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk') NOT NULL DEFAULT 'wali_kelas',

    UNIQUE INDEX `wali_kelas_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kelas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kelas` VARCHAR(191) NOT NULL,
    `wali_kelas_id` INTEGER NOT NULL,
    `guru_id` INTEGER NULL,
    `admin_id` INTEGER NOT NULL,

    UNIQUE INDEX `kelas_wali_kelas_id_key`(`wali_kelas_id`),
    UNIQUE INDEX `kelas_guru_id_key`(`guru_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guru` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nip` INTEGER NOT NULL,
    `mapel` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk') NOT NULL DEFAULT 'guru',

    UNIQUE INDEX `guru_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siswa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nis` INTEGER NOT NULL,
    `nama_kelas` VARCHAR(191) NOT NULL,
    `nomor_wali` INTEGER NOT NULL,
    `status` ENUM('hadir', 'sakit', 'izin', 'alfa') NULL,
    `kelas_id` INTEGER NOT NULL,
    `admin_id` INTEGER NOT NULL,

    UNIQUE INDEX `siswa_nis_key`(`nis`),
    UNIQUE INDEX `siswa_kelas_id_key`(`kelas_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `absensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tanggal` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `siswa_id` INTEGER NOT NULL,
    `status` ENUM('hadir', 'sakit', 'izin', 'alfa') NOT NULL DEFAULT 'hadir',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rekap_absensi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kelas_id` INTEGER NOT NULL,
    `siswa_id` INTEGER NOT NULL,
    `guru_bk_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guru_bk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nip` INTEGER NOT NULL,
    `mapel` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('wali_kelas', 'guru', 'admin', 'guru_bk') NOT NULL DEFAULT 'guru_bk',

    UNIQUE INDEX `guru_bk_nip_key`(`nip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surat_peringatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total_alpha` INTEGER NOT NULL,
    `rekap_absensi_id` INTEGER NOT NULL,
    `file` VARCHAR(191) NOT NULL,
    `absensi_id` INTEGER NOT NULL,

    UNIQUE INDEX `surat_peringatan_rekap_absensi_id_key`(`rekap_absensi_id`),
    UNIQUE INDEX `surat_peringatan_absensi_id_key`(`absensi_id`),
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
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_wali_kelas_id_fkey` FOREIGN KEY (`wali_kelas_id`) REFERENCES `wali_kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_guru_id_fkey` FOREIGN KEY (`guru_id`) REFERENCES `guru`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kelas` ADD CONSTRAINT `kelas_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guru` ADD CONSTRAINT `guru_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekap_absensi` ADD CONSTRAINT `rekap_absensi_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekap_absensi` ADD CONSTRAINT `rekap_absensi_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rekap_absensi` ADD CONSTRAINT `rekap_absensi_guru_bk_id_fkey` FOREIGN KEY (`guru_bk_id`) REFERENCES `guru_bk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surat_peringatan` ADD CONSTRAINT `surat_peringatan_absensi_id_fkey` FOREIGN KEY (`absensi_id`) REFERENCES `absensi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qr_token` ADD CONSTRAINT `qr_token_kelas_id_fkey` FOREIGN KEY (`kelas_id`) REFERENCES `kelas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
