-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isFirstRun" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "language" SET DEFAULT 'pt-BR';
