/*
  Warnings:

  - Added the required column `position` to the `PracticeSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PracticeSession` ADD COLUMN `position` ENUM('SixthStringRoot', 'FifthStringRoot') NOT NULL;
