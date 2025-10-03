-- CreateEnum
CREATE TYPE "CVFileType" AS ENUM ('ORIGINAL', 'PDF', 'WORD', 'HTML', 'JSON', 'MARKDOWN');

-- CreateTable
CREATE TABLE "cv_file" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "type" "CVFileType" NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER,
    "format" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cv_file_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cv_file_cvId_type_idx" ON "cv_file"("cvId", "type");

-- AddForeignKey
ALTER TABLE "cv_file" ADD CONSTRAINT "cv_file_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "cv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
