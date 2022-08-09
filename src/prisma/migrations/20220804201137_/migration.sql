/*
  Warnings:

  - You are about to drop the column `purchaseListId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `PurchaseList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_purchaseListId_fkey";

-- DropForeignKey
ALTER TABLE "PurchaseList" DROP CONSTRAINT "PurchaseList_userId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchaseListId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "PurchaseList";
