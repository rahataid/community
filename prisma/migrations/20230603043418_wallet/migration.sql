/*
  Warnings:

  - You are about to drop the column `totalDonationsUsd` on the `Community` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[walletAddress]` on the table `Community` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalDonations_usd` to the `Community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletAddress` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "totalDonationsUsd",
ADD COLUMN     "totalDonations_usd" TEXT NOT NULL,
ADD COLUMN     "walletAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Community_walletAddress_key" ON "Community"("walletAddress");
