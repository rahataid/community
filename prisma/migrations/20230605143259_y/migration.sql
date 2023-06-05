/*
  Warnings:

  - Made the column `description` on table `tbl_communities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tbl_communities" ALTER COLUMN "description" SET NOT NULL;
