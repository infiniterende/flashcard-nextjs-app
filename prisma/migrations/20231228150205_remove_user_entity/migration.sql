/*
  Warnings:

  - You are about to drop the column `userId` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deck" DROP CONSTRAINT "Deck_userId_fkey";

-- DropForeignKey
ALTER TABLE "Flashcard" DROP CONSTRAINT "Flashcard_userId_fkey";

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
