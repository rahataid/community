-- CreateEnum
CREATE TYPE "TxnsStatus" AS ENUM ('SUCCESS', 'PENDING', 'FAILED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "DonorType" AS ENUM ('organization', 'individual');

-- CreateTable
CREATE TABLE "Community" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "description" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "logo" TEXT DEFAULT '',
    "budget" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityReportSummary" (
    "id" SERIAL NOT NULL,
    "communityId" INTEGER NOT NULL,
    "total_beneficiaries" TEXT NOT NULL,
    "gender_male" TEXT,
    "gender_female" TEXT,
    "gender_other" TEXT,
    "bank_yes" TEXT,
    "bank_no" TEXT,
    "internet_yes" TEXT NOT NULL,
    "internet_no" TEXT NOT NULL,
    "extra" JSONB NOT NULL,

    CONSTRAINT "CommunityReportSummary_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "_CommunityTypeRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityTypeRelation_AB_unique" ON "_CommunityTypeRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityTypeRelation_B_index" ON "_CommunityTypeRelation"("B");

-- AddForeignKey
ALTER TABLE "CommunityReportSummary" ADD CONSTRAINT "CommunityReportSummary_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTransaction" ADD CONSTRAINT "DonationTransaction_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DonationTransaction" ADD CONSTRAINT "DonationTransaction_doneeId_fkey" FOREIGN KEY ("doneeId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityProject" ADD CONSTRAINT "CommunityProject_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityProject" ADD CONSTRAINT "CommunityProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityTypeRelation" ADD CONSTRAINT "_CommunityTypeRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityTypeRelation" ADD CONSTRAINT "_CommunityTypeRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
