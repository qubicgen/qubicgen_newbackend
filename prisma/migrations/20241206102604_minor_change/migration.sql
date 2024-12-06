-- DropForeignKey
ALTER TABLE "brands" DROP CONSTRAINT "brands_courseId_fkey";

-- DropForeignKey
ALTER TABLE "faqs" DROP CONSTRAINT "faqs_courseId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_courseId_fkey";

-- CreateTable
CREATE TABLE "courseBrand" (
    "id" TEXT NOT NULL,
    "courseId" TEXT,
    "brandId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courseBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courseLessons" (
    "id" TEXT NOT NULL,
    "courseId" TEXT,
    "lessonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courseLessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courseFaqs" (
    "id" TEXT NOT NULL,
    "courseId" TEXT,
    "faqId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courseFaqs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courseBrand" ADD CONSTRAINT "courseBrand_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseBrand" ADD CONSTRAINT "courseBrand_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseLessons" ADD CONSTRAINT "courseLessons_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseLessons" ADD CONSTRAINT "courseLessons_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseFaqs" ADD CONSTRAINT "courseFaqs_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseFaqs" ADD CONSTRAINT "courseFaqs_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "faqs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
