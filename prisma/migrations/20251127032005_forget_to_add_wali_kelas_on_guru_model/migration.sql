/*
  Warnings:

  - A unique constraint covering the columns `[guru_id]` on the table `wali_kelas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guru_id` to the `wali_kelas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wali_kelas` ADD COLUMN `guru_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `wali_kelas_guru_id_key` ON `wali_kelas`(`guru_id`);

-- AddForeignKey
ALTER TABLE `wali_kelas` ADD CONSTRAINT `wali_kelas_guru_id_fkey` FOREIGN KEY (`guru_id`) REFERENCES `guru`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
