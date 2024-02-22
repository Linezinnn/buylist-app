/*
  Warnings:

  - Made the column `isChecked` on table `item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `isChecked` BOOLEAN NOT NULL DEFAULT false;
