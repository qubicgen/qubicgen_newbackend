/*
  Warnings:

  - Changed the type of `passedOutYear` on the `careers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "careers" DROP COLUMN "passedOutYear",
ADD COLUMN     "passedOutYear" TIMESTAMP(3) NOT NULL;
