/*
  Warnings:

  - You are about to drop the column `location` on the `experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "experience" DROP COLUMN "location",
ADD COLUMN     "duration" TEXT;
