/*
  Warnings:

  - You are about to drop the `CommunityOnTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunityOnTags" DROP CONSTRAINT "CommunityOnTags_communityId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityOnTags" DROP CONSTRAINT "CommunityOnTags_tagId_fkey";

-- DropTable
DROP TABLE "CommunityOnTags";

-- CreateTable
CREATE TABLE "_CommunityTagRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommunityTagRelation_AB_unique" ON "_CommunityTagRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunityTagRelation_B_index" ON "_CommunityTagRelation"("B");

-- AddForeignKey
ALTER TABLE "_CommunityTagRelation" ADD CONSTRAINT "_CommunityTagRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommunityTagRelation" ADD CONSTRAINT "_CommunityTagRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
