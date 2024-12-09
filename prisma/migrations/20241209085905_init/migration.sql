-- AlterTable
ALTER TABLE "course" ADD COLUMN     "dualPath" INTEGER,
ADD COLUMN     "mentorship" INTEGER,
ADD COLUMN     "selfPaced" INTEGER;

-- AlterTable
ALTER TABLE "courseEnrollmentForm" ADD COLUMN     "coursePrice" INTEGER;
