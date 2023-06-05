/*
  Warnings:

  - You are about to drop the column `manager` on the `Community` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Community" DROP COLUMN "manager";

-- CreateTable
CREATE TABLE "CommunityManager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,

    CONSTRAINT "CommunityManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityonCommunityManager" (
    "id" SERIAL NOT NULL,
    "communityId" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,

    CONSTRAINT "CommunityonCommunityManager_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommunityonCommunityManager" ADD CONSTRAINT "CommunityonCommunityManager_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityonCommunityManager" ADD CONSTRAINT "CommunityonCommunityManager_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "CommunityManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
