/*
  Warnings:

  - You are about to drop the column `address` on the `parents` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `parents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `parents` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `parents` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `parents` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `parents` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `teachers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "parents_email_key";

-- DropIndex
DROP INDEX "parents_phone_key";

-- DropIndex
DROP INDEX "parents_username_key";

-- DropIndex
DROP INDEX "students_email_key";

-- DropIndex
DROP INDEX "students_phone_key";

-- DropIndex
DROP INDEX "students_username_key";

-- DropIndex
DROP INDEX "teachers_email_key";

-- DropIndex
DROP INDEX "teachers_phone_key";

-- DropIndex
DROP INDEX "teachers_username_key";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "parents" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "surname",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "img",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "surname",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "img",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "surname",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "emailVerified",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
