/*
  Warnings:

  - You are about to drop the column `guru_id` on the `wali_kelas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `wali_kelas` DROP FOREIGN KEY `wali_kelas_guru_id_fkey`;

-- DropIndex
DROP INDEX `wali_kelas_guru_id_key` ON `wali_kelas`;

-- AlterTable
ALTER TABLE `wali_kelas` DROP COLUMN `guru_id`;
