-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

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
CREATE TABLE "Beneficary" (
    "id" SERIAL NOT NULL,
    "gender" "Gender" NOT NULL,
    "walletAddress" TEXT,
    "age" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beneficary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunitiesBeneficary" (
    "id" SERIAL NOT NULL,
    "communityId" INTEGER NOT NULL,
    "summaryType" TEXT NOT NULL,
    "summaryData" JSONB NOT NULL,

    CONSTRAINT "CommunitiesBeneficary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Communities_title_key" ON "Communities"("title");

-- AddForeignKey
ALTER TABLE "CommunitiesBeneficary" ADD CONSTRAINT "CommunitiesBeneficary_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
