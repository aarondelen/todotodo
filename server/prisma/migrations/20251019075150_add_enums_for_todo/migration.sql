/*
  Warnings:

  - Changed the type of `priority` on the `Todo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Todo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('PENDING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PriorityLevel" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "priority",
ADD COLUMN     "priority" "PriorityLevel" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TodoStatus" NOT NULL;
