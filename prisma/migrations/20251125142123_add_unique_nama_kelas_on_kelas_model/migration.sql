/*
  Warnings:

  - A unique constraint covering the columns `[nama_kelas]` on the table `kelas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `kelas_nama_kelas_key` ON `kelas`(`nama_kelas`);
