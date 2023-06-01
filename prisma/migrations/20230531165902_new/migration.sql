-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "cover" TEXT DEFAULT '',
ADD COLUMN     "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];
