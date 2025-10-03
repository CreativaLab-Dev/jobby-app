-- CreateEnum
CREATE TYPE "OpportunityCategory" AS ENUM ('BECA_NACIONAL', 'BECA_INTERNACIONAL', 'EMPLEO', 'PRACTICAS');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('PRIMARIA', 'SECUNDARIA', 'TECNICO', 'BACHILLER', 'LICENCIADO', 'MAESTRIA', 'DOCTORADO', 'OTRO');

-- CreateEnum
CREATE TYPE "SkillCategory" AS ENUM ('TECNICA', 'BLANDA', 'IDIOMA');

-- CreateEnum
CREATE TYPE "CVAnalysisStatus" AS ENUM ('ENQUEUED', 'PROCESSING', 'DONE', 'FAILED');

-- CreateTable
CREATE TABLE "UserToken" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "token" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "userTokenId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunitySelection" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpportunitySelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CV" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "createdWithBuilder" BOOLEAN NOT NULL,
    "language" TEXT,
    "fullName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "professionalSummary" TEXT,
    "originalFileUrl" TEXT,
    "downloadedWord" BOOLEAN NOT NULL DEFAULT false,
    "downloadedPdf" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVRevision" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "checksum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CVRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "level" "EducationLevel" NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "graduationYear" INTEGER,
    "grade" DOUBLE PRECISION,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcademicProject" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT,
    "duration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CVAnalysis" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "status" "CVAnalysisStatus" NOT NULL DEFAULT 'ENQUEUED',
    "overallScore" DOUBLE PRECISION NOT NULL,
    "recommendations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CVAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionScore" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "sectionName" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SectionScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldScore" (
    "id" TEXT NOT NULL,
    "sectionScoreId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FieldScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "OpportunityCategory" NOT NULL,
    "deadline" TIMESTAMP(3),
    "requirements" TEXT NOT NULL,
    "matchPercentage" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingClick" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT,
    "tokenId" TEXT,
    "source" TEXT NOT NULL,
    "medium" TEXT,
    "campaign" TEXT,
    "landingPage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketingClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actor" TEXT,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "diff" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserToken_token_key" ON "UserToken"("token");

-- CreateIndex
CREATE INDEX "UserToken_email_idx" ON "UserToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_userTokenId_key" ON "Candidate"("userTokenId");

-- CreateIndex
CREATE INDEX "CV_candidateId_idx" ON "CV"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "CVRevision_cvId_version_key" ON "CVRevision"("cvId", "version");

-- CreateIndex
CREATE INDEX "CVAnalysis_cvId_idx" ON "CVAnalysis"("cvId");

-- CreateIndex
CREATE INDEX "Opportunity_analysisId_idx" ON "Opportunity"("analysisId");

-- CreateIndex
CREATE INDEX "MarketingClick_source_campaign_createdAt_idx" ON "MarketingClick"("source", "campaign", "createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entity_createdAt_idx" ON "AuditLog"("entity", "createdAt");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_userTokenId_fkey" FOREIGN KEY ("userTokenId") REFERENCES "UserToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunitySelection" ADD CONSTRAINT "OpportunitySelection_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CV" ADD CONSTRAINT "CV_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVRevision" ADD CONSTRAINT "CVRevision_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicProject" ADD CONSTRAINT "AcademicProject_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVAnalysis" ADD CONSTRAINT "CVAnalysis_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionScore" ADD CONSTRAINT "SectionScore_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "CVAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldScore" ADD CONSTRAINT "FieldScore_sectionScoreId_fkey" FOREIGN KEY ("sectionScoreId") REFERENCES "SectionScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Opportunity" ADD CONSTRAINT "Opportunity_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "CVAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingClick" ADD CONSTRAINT "MarketingClick_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingClick" ADD CONSTRAINT "MarketingClick_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "UserToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;
