/*
  Warnings:

  - You are about to drop the column `responsabilities` on the `experience` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "experience" DROP COLUMN "responsabilities",
ADD COLUMN     "responsibilities" TEXT;
