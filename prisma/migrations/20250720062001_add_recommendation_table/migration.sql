/*
  Warnings:

  - You are about to drop the column `recommendations` on the `cv_analysis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cv_analysis" DROP COLUMN "recommendations";

-- CreateTable
CREATE TABLE "recommendation" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "recommendation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "recommendation" ADD CONSTRAINT "recommendation_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "cv_analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
