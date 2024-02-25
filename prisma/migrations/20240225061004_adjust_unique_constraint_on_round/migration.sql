/*
  Warnings:

  - A unique constraint covering the columns `[roundNumber,seasonId]` on the table `Round` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Round_roundNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Round_roundNumber_seasonId_key" ON "Round"("roundNumber", "seasonId");
