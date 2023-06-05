-- CreateEnum
CREATE TYPE "TxnsStatus" AS ENUM ('SUCCESS', 'PENDING', 'FAILED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateTable
CREATE TABLE "tbl_communities" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "country" TEXT NOT NULL,
    "totalDonations_usd" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "managers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "images" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_communityManagers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "walletAddress" TEXT,
    "communities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_communityManagers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_communityDemographics" (
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
    "extras" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_communityDemographics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_communities_address_key" ON "tbl_communities"("address");

-- AddForeignKey
ALTER TABLE "tbl_communities" ADD CONSTRAINT "tbl_communities_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tbl_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_communityDemographics" ADD CONSTRAINT "tbl_communityDemographics_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "tbl_communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
