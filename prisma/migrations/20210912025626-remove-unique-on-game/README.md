# Migration `20210912025626-remove-unique-on-game`

This migration has been generated at 9/12/2021, 12:56:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."Game.roundId_locationId_unique"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210905061743-new-tables..20210912025626-remove-unique-on-game
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -54,10 +54,8 @@
   round         Round     @relation(fields: [roundId], references: [id])
   roundId       String
   resultId      String?
   result        TeamName? @relation("result", fields: [resultId], references: [id])
-
-  @@unique([roundId, locationId])
 }
 model Round {
   id          String   @id @default(cuid())
```


