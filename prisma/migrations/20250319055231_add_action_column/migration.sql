-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "key" TEXT,
    "value" JSONB,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);
