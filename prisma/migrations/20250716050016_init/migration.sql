/*
  Warnings:

  - You are about to drop the `AcademicProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CV` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CVAnalysis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CVRevision` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Candidate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FieldScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MarketingClick` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Opportunity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpportunitySelection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AcademicProject" DROP CONSTRAINT "AcademicProject_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_cvId_fkey";

-- DropForeignKey
ALTER TABLE "CV" DROP CONSTRAINT "CV_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "CVAnalysis" DROP CONSTRAINT "CVAnalysis_cvId_fkey";

-- DropForeignKey
ALTER TABLE "CVRevision" DROP CONSTRAINT "CVRevision_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_userTokenId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_cvId_fkey";

-- DropForeignKey
ALTER TABLE "FieldScore" DROP CONSTRAINT "FieldScore_sectionScoreId_fkey";

-- DropForeignKey
ALTER TABLE "MarketingClick" DROP CONSTRAINT "MarketingClick_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "MarketingClick" DROP CONSTRAINT "MarketingClick_tokenId_fkey";

-- DropForeignKey
ALTER TABLE "Opportunity" DROP CONSTRAINT "Opportunity_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "OpportunitySelection" DROP CONSTRAINT "OpportunitySelection_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "SectionScore" DROP CONSTRAINT "SectionScore_analysisId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_cvId_fkey";

-- DropTable
DROP TABLE "AcademicProject";

-- DropTable
DROP TABLE "Achievement";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "CV";

-- DropTable
DROP TABLE "CVAnalysis";

-- DropTable
DROP TABLE "CVRevision";

-- DropTable
DROP TABLE "Candidate";

-- DropTable
DROP TABLE "Education";

-- DropTable
DROP TABLE "FieldScore";

-- DropTable
DROP TABLE "MarketingClick";

-- DropTable
DROP TABLE "Opportunity";

-- DropTable
DROP TABLE "OpportunitySelection";

-- DropTable
DROP TABLE "SectionScore";

-- DropTable
DROP TABLE "Skill";

-- DropTable
DROP TABLE "UserToken";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "candidate" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunity_selection" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opportunity_selection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "createdWithBuilder" BOOLEAN NOT NULL DEFAULT false,
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

    CONSTRAINT "cv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certification" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "credentialId" TEXT,
    "credentialUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv_revision" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "checksum" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_revision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education" (
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

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic_project" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT,
    "duration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "academic_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "category" "SkillCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "proficiency" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cv_analysis" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "status" "CVAnalysisStatus" NOT NULL DEFAULT 'ENQUEUED',
    "overallScore" DOUBLE PRECISION NOT NULL,
    "recommendations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cv_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_score" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "sectionName" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "section_score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_score" (
    "id" TEXT NOT NULL,
    "sectionScoreId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "field_score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunity" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "OpportunityCategory" NOT NULL,
    "deadline" TIMESTAMP(3),
    "requirements" TEXT NOT NULL,
    "matchPercentage" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "opportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketing_click" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT,
    "source" TEXT NOT NULL,
    "medium" TEXT,
    "campaign" TEXT,
    "landingPage" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "marketing_click_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" TEXT NOT NULL,
    "actor" TEXT,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "diff" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "payment_token_token_key" ON "payment_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "candidate_userId_key" ON "candidate"("userId");

-- CreateIndex
CREATE INDEX "cv_candidateId_idx" ON "cv"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "cv_revision_cvId_version_key" ON "cv_revision"("cvId", "version");

-- CreateIndex
CREATE INDEX "cv_analysis_cvId_idx" ON "cv_analysis"("cvId");

-- CreateIndex
CREATE INDEX "opportunity_analysisId_idx" ON "opportunity"("analysisId");

-- CreateIndex
CREATE INDEX "marketing_click_source_campaign_createdAt_idx" ON "marketing_click"("source", "campaign", "createdAt");

-- CreateIndex
CREATE INDEX "audit_log_entity_createdAt_idx" ON "audit_log"("entity", "createdAt");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidate" ADD CONSTRAINT "candidate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity_selection" ADD CONSTRAINT "opportunity_selection_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv" ADD CONSTRAINT "cv_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv_revision" ADD CONSTRAINT "cv_revision_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_project" ADD CONSTRAINT "academic_project_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "achievement_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cv_analysis" ADD CONSTRAINT "cv_analysis_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "section_score" ADD CONSTRAINT "section_score_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "cv_analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_score" ADD CONSTRAINT "field_score_sectionScoreId_fkey" FOREIGN KEY ("sectionScoreId") REFERENCES "section_score"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity" ADD CONSTRAINT "opportunity_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "cv_analysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketing_click" ADD CONSTRAINT "marketing_click_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
