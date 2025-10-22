/*
  Warnings:

  - You are about to drop the column `title` on the `experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cv" ADD COLUMN     "address" TEXT,
ADD COLUMN     "linkedin" TEXT;

-- AlterTable
ALTER TABLE "education" ADD COLUMN     "honors" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "year" TEXT;

-- AlterTable
ALTER TABLE "experience" DROP COLUMN "title",
ADD COLUMN     "location" TEXT,
ADD COLUMN     "position" TEXT;
