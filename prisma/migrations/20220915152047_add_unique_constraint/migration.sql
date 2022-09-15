/*
  Warnings:

  - A unique constraint covering the columns `[userId,gameId]` on the table `Tip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tip_userId_gameId_key" ON "Tip"("userId", "gameId");
