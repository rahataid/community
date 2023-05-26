-- CreateEnum
CREATE TYPE "TxnsStatus" AS ENUM ('SUCCESS', 'PENDING', 'FAILED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "DonorType" AS ENUM ('organization', 'individual');

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "establishedDate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manager" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityProject" (
    "id" SERIAL NOT NULL,
    "communityId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "CommunityProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityTransasction" (
    "id" SERIAL NOT NULL,
    "communityId" INTEGER NOT NULL,
    "txnHash" TEXT,
    "txnDate" TIMESTAMP(3),
    "status" "TxnsStatus",

    CONSTRAINT "CommunityTransasction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_title_key" ON "Community"("title");

-- AddForeignKey
ALTER TABLE "CommunitiesBeneficiary" ADD CONSTRAINT "CommunitiesBeneficiary_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTransaction" ADD CONSTRAINT "DonationTransaction_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTransaction" ADD CONSTRAINT "DonationTransaction_doneeId_fkey" FOREIGN KEY ("doneeId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityProject" ADD CONSTRAINT "CommunityProject_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityProject" ADD CONSTRAINT "CommunityProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
