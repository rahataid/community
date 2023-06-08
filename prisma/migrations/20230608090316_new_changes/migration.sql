/*
  Warnings:

  - You are about to drop the column `totalDonations_usd` on the `tbl_communities` table. All the data in the column will be lost.
  - Added the required column `localCurrency` to the `tbl_communities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_communities" DROP COLUMN "totalDonations_usd",
ADD COLUMN     "fundRaisedLocal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "fundRaisedUsd" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "localCurrency" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Gender";
