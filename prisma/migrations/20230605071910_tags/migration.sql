/*
  Warnings:

  - You are about to drop the `_CommunityTagRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CommunityTagRelation" DROP CONSTRAINT "_CommunityTagRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommunityTagRelation" DROP CONSTRAINT "_CommunityTagRelation_B_fkey";

-- DropTable
DROP TABLE "_CommunityTagRelation";

-- CreateTable
CREATE TABLE "CommunityOnTags" (
    "id" SERIAL NOT NULL,
    "communityId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "tagsId" INTEGER NOT NULL,

    CONSTRAINT "CommunityOnTags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommunityOnTags" ADD CONSTRAINT "CommunityOnTags_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityOnTags" ADD CONSTRAINT "CommunityOnTags_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
