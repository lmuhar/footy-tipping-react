# Migration `20210905061743-new-tables`

This migration has been generated at 9/5/2021, 4:17:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Location" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."TeamName" (
"id" text   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Tip" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"tip" integer   NOT NULL ,
"roundId" text   NOT NULL ,
"userId" text   NOT NULL ,
"correct" boolean   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Game" (
"id" text   NOT NULL ,
"homeTeamId" text   NOT NULL ,
"awayTeamId" text   NOT NULL ,
"locationId" text   NOT NULL ,
"startDateTime" timestamp(3)   NOT NULL ,
"roundId" text   NOT NULL ,
"resultId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Round" (
"id" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"dateStart" timestamp(3)   NOT NULL ,
"dateEnd" timestamp(3)   NOT NULL ,
"roundNumber" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Tip.userId_roundId_unique" ON "public"."Tip"("userId", "roundId")

CREATE UNIQUE INDEX "Game.roundId_locationId_unique" ON "public"."Game"("roundId", "locationId")

ALTER TABLE "public"."Tip" ADD FOREIGN KEY("roundId")REFERENCES "public"."Round"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Tip" ADD FOREIGN KEY("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Game" ADD FOREIGN KEY("homeTeamId")REFERENCES "public"."TeamName"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Game" ADD FOREIGN KEY("awayTeamId")REFERENCES "public"."TeamName"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Game" ADD FOREIGN KEY("locationId")REFERENCES "public"."Location"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Game" ADD FOREIGN KEY("roundId")REFERENCES "public"."Round"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Game" ADD FOREIGN KEY("resultId")REFERENCES "public"."TeamName"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201107073152..20210905061743-new-tables
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
@@ -14,12 +14,67 @@
   admin
   user
 }
-model User {
+model Location {
+  id   String @id @default(cuid())
+  name String
+  game Game[]
+}
+
+model TeamName {
+  id       String @id @default(cuid())
+  name     String
+  gameAway Game[] @relation("gameAway")
+  gameHome Game[] @relation("gameHome")
+  result   Game[] @relation("result")
+}
+
+model Tip {
+  id        String   @id @default(cuid())
+  createdAt DateTime @default(now())
+  tip       Int
+  round     Round    @relation(fields: [roundId], references: [id])
+  roundId   String
+  user      User     @relation(fields: [userId], references: [id])
+  userId    String
+  correct   Boolean?
+
+  @@unique([userId, roundId])
+}
+
+model Game {
+  id            String    @id @default(cuid())
+  homeTeamId    String
+  homeTeam      TeamName  @relation("gameHome", fields: [homeTeamId], references: [id])
+  awayTeamId    String
+  awayTeam      TeamName  @relation("gameAway", fields: [awayTeamId], references: [id])
+  location      Location  @relation(fields: [locationId], references: [id])
+  locationId    String
+  startDateTime DateTime
+  round         Round     @relation(fields: [roundId], references: [id])
+  roundId       String
+  resultId      String?
+  result        TeamName? @relation("result", fields: [resultId], references: [id])
+
+  @@unique([roundId, locationId])
+}
+
+model Round {
   id          String   @id @default(cuid())
   createdAt   DateTime @default(now())
-  username    String   @unique
-  email       String   @unique
-  password    String
-  role        Role     @default(user)
-}
+  dateStart   DateTime
+  dateEnd     DateTime
+  roundNumber Int
+  games       Game[]
+  tips        Tip[]
+}
+
+model User {
+  id        String   @id @default(cuid())
+  createdAt DateTime @default(now())
+  username  String   @unique
+  email     String   @unique
+  password  String
+  role      Role     @default(user)
+  tips      Tip[]
+}
```


