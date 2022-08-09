/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `item` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_itemListId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_itemId_fkey";

-- AlterTable
ALTER TABLE "ItemList" ADD COLUMN     "items" TEXT[];

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "item" TEXT NOT NULL;

-- DropTable
DROP TABLE "Item";
