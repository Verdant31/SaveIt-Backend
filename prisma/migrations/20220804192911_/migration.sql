/*
  Warnings:

  - Made the column `purchaseListId` on table `Purchase` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_purchaseListId_fkey";

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "purchaseListId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_purchaseListId_fkey" FOREIGN KEY ("purchaseListId") REFERENCES "PurchaseList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
