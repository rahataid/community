/*
  Warnings:

  - You are about to drop the `Communities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DonationTxns` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunitiesBeneficiary" DROP CONSTRAINT "CommunitiesBeneficiary_communityId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityProject" DROP CONSTRAINT "CommunityProject_communityId_fkey";

-- DropForeignKey
ALTER TABLE "DonationTxns" DROP CONSTRAINT "DonationTxns_doneeId_fkey";

-- DropForeignKey
ALTER TABLE "DonationTxns" DROP CONSTRAINT "DonationTxns_donorId_fkey";

-- DropTable
DROP TABLE "Communities";

-- DropTable
DROP TABLE "DonationTxns";

-- DropEnum
DROP TYPE "SupportedCrypto";

-- CreateTable
CREATE TABLE "DonationTransaction" (
    "id" SERIAL NOT NULL,
    "status" "TxnsStatus" NOT NULL,
    "txnDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" INTEGER NOT NULL,
    "doneeId" INTEGER NOT NULL,
    "txnHash" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DonationTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommunitiesBeneficiary" ADD CONSTRAINT "CommunitiesBeneficiary_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTransaction" ADD CONSTRAINT "DonationTransaction_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTransaction" ADD CONSTRAINT "DonationTransaction_doneeId_fkey" FOREIGN KEY ("doneeId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityProject" ADD CONSTRAINT "CommunityProject_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
