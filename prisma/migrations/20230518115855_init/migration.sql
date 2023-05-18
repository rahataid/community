-- CreateEnum
CREATE TYPE "TxnsStatus" AS ENUM ('success', 'pending', 'failed');

-- CreateEnum
CREATE TYPE "SupportedCrypto" AS ENUM ('ETH', 'BTC', 'MATIC');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "DonorType" AS ENUM ('organization', 'individual');

-- CreateTable
CREATE TABLE "Communities" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "establishedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" SERIAL NOT NULL,
    "gender" "Gender" NOT NULL,
    "walletAddress" TEXT,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunitiesBeneficiary" (
    "id" SERIAL NOT NULL,
    "summaryType" TEXT NOT NULL,
    "summaryData" JSONB NOT NULL,
    "communityId" INTEGER NOT NULL,

    CONSTRAINT "CommunitiesBeneficiary_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Communities_title_key" ON "Communities"("title");

-- AddForeignKey
ALTER TABLE "CommunitiesBeneficiary" ADD CONSTRAINT "CommunitiesBeneficiary_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTxns" ADD CONSTRAINT "DonationTxns_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTxns" ADD CONSTRAINT "DonationTxns_doneeId_fkey" FOREIGN KEY ("doneeId") REFERENCES "Communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
