/*
  Warnings:

  - You are about to drop the column `itemId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `ItemList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemList" DROP CONSTRAINT "ItemList_userId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "itemId";

-- DropTable
DROP TABLE "ItemList";
