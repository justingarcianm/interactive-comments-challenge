/*
  Warnings:

  - Added the required column `score` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "score" INTEGER NOT NULL;
