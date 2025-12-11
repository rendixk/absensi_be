/*
  Warnings:

  - A unique constraint covering the columns `[siswa_id,kelas_id,bulan,tahun]` on the table `rekap_absensi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `rekap_absensi_siswa_id_kelas_id_bulan_tahun_key` ON `rekap_absensi`(`siswa_id`, `kelas_id`, `bulan`, `tahun`);
