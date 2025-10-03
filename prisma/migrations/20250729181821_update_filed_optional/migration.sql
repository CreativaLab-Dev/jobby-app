-- AlterTable
ALTER TABLE "academic_project" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "achievement" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "certification" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "issuer" DROP NOT NULL,
ALTER COLUMN "issueDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "education" ALTER COLUMN "level" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "institution" DROP NOT NULL;

-- AlterTable
ALTER TABLE "experience" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "company" DROP NOT NULL;

-- AlterTable
ALTER TABLE "skill" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL;
