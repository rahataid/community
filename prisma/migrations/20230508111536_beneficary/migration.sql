-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'O');

-- CreateTable
CREATE TABLE "Beneficary" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "walletAddress" TEXT,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "tokensAssigned" INTEGER NOT NULL DEFAULT 0,
    "tokensClaimed" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beneficary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunitiesBeneficary" (
    "id" SERIAL NOT NULL,
    "beneficaryId" INTEGER NOT NULL,
    "communityId" INTEGER NOT NULL,

    CONSTRAINT "CommunitiesBeneficary_pkey" PRIMARY KEY ("id")
);
