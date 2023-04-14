/*
  Warnings:

  - Added the required column `replyToID` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "replyToID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_replyToID_fkey" FOREIGN KEY ("replyToID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
