/*
  Warnings:

  - You are about to drop the column `tagsId` on the `CommunityOnTags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunityOnTags" DROP CONSTRAINT "CommunityOnTags_tagsId_fkey";

-- AlterTable
ALTER TABLE "CommunityOnTags" DROP COLUMN "tagsId";

-- AddForeignKey
ALTER TABLE "CommunityOnTags" ADD CONSTRAINT "CommunityOnTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
