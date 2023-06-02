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
    "cover" TEXT DEFAULT '',
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "totalDonationsUsd" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
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
CREATE TABLE "Demographics" (
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

    CONSTRAINT "Demographics_pkey" PRIMARY KEY ("id")
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
    "walletAddress" TEXT NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" INTEGER NOT NULL,
    "doneeId" INTEGER NOT NULL,
    "txnHash" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommunityTagRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToCommunity" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityTagRelation_AB_unique" ON "_CommunityTagRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityTagRelation_B_index" ON "_CommunityTagRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToCommunity_AB_unique" ON "_CategoryToCommunity"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToCommunity_B_index" ON "_CategoryToCommunity"("B");

-- AddForeignKey
ALTER TABLE "Demographics" ADD CONSTRAINT "Demographics_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_doneeId_fkey" FOREIGN KEY ("doneeId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityTagRelation" ADD CONSTRAINT "_CommunityTagRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityTagRelation" ADD CONSTRAINT "_CommunityTagRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCommunity" ADD CONSTRAINT "_CategoryToCommunity_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToCommunity" ADD CONSTRAINT "_CategoryToCommunity_B_fkey" FOREIGN KEY ("B") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;
