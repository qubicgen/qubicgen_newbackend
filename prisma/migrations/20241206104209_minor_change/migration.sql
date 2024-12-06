/*
  Warnings:

  - You are about to drop the `courseBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courseFaqs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courseLessons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "courseBrand" DROP CONSTRAINT "courseBrand_brandId_fkey";

-- DropForeignKey
ALTER TABLE "courseBrand" DROP CONSTRAINT "courseBrand_courseId_fkey";

-- DropForeignKey
ALTER TABLE "courseFaqs" DROP CONSTRAINT "courseFaqs_courseId_fkey";

-- DropForeignKey
ALTER TABLE "courseFaqs" DROP CONSTRAINT "courseFaqs_faqId_fkey";

-- DropForeignKey
ALTER TABLE "courseLessons" DROP CONSTRAINT "courseLessons_courseId_fkey";

-- DropForeignKey
ALTER TABLE "courseLessons" DROP CONSTRAINT "courseLessons_lessonId_fkey";

-- DropTable
DROP TABLE "courseBrand";

-- DropTable
DROP TABLE "courseFaqs";

-- DropTable
DROP TABLE "courseLessons";

-- AddForeignKey
ALTER TABLE "brands" ADD CONSTRAINT "brands_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
