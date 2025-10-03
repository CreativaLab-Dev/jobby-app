-- CreateTable
CREATE TABLE "cv_usage" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "createCVWithAI" INTEGER NOT NULL DEFAULT 0,
    "analyzeCV" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cv_usage_candidateId_key" ON "cv_usage"("candidateId");

-- AddForeignKey
ALTER TABLE "cv_usage" ADD CONSTRAINT "cv_usage_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
