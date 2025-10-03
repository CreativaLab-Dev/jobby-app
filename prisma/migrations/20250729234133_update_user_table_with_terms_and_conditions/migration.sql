-- AlterTable
ALTER TABLE "user" ADD COLUMN     "acceptedCookiePolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "acceptedPrivacyPolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "acceptedPrivacyPolicyAt" TIMESTAMP(3),
ADD COLUMN     "acceptedSecurityPolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "acceptedSecurityPolicyAt" TIMESTAMP(3),
ADD COLUMN     "acceptedTermsAndConditions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "acceptedTermsAt" TIMESTAMP(3),
ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3);
