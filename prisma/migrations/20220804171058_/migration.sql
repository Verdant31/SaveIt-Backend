/*
  Warnings:

  - You are about to drop the column `price` on the `Item` table. All the data in the column will be lost.
  - Added the required column `price` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "price",
ALTER COLUMN "count" DROP NOT NULL,
ALTER COLUMN "count" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
