-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "totalFees" DOUBLE PRECISION NOT NULL,
    "preferredMonth" TEXT NOT NULL,
    "referrals" JSONB NOT NULL,
    "balanceFees" DOUBLE PRECISION NOT NULL,
    "discount" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Contact_email_idx" ON "Contact"("email");

-- CreateIndex
CREATE INDEX "Contact_studentEmail_idx" ON "Contact"("studentEmail");

-- CreateIndex
CREATE INDEX "Contact_createdAt_idx" ON "Contact"("createdAt");
