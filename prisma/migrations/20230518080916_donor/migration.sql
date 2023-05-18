-- CreateEnum
CREATE TYPE "TxnsStatus" AS ENUM ('success', 'pending', 'failed');

-- CreateEnum
CREATE TYPE "SupportedCrypto" AS ENUM ('ETH', 'BTC', 'MATIC');

-- CreateEnum
CREATE TYPE "DonorType" AS ENUM ('organization', 'individual');

-- CreateTable
CREATE TABLE "Donor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "donorType" "DonorType" NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonationTxns" (
    "id" SERIAL NOT NULL,
    "status" "TxnsStatus" NOT NULL,
    "txnDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" INTEGER NOT NULL,
    "doneeId" INTEGER NOT NULL,
    "txnHash" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "crypto" "SupportedCrypto" NOT NULL,

    CONSTRAINT "DonationTxns_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DonationTxns" ADD CONSTRAINT "DonationTxns_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTxns" ADD CONSTRAINT "DonationTxns_doneeId_fkey" FOREIGN KEY ("doneeId") REFERENCES "Communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
