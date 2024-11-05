/*
  Warnings:

  - Added the required column `challenge` to the `UserCredentials` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserCredentials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "json" TEXT NOT NULL,
    "credentialID" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserCredentials" ("createdAt", "credentialID", "id", "json", "updatedAt", "userId") SELECT "createdAt", "credentialID", "id", "json", "updatedAt", "userId" FROM "UserCredentials";
DROP TABLE "UserCredentials";
ALTER TABLE "new_UserCredentials" RENAME TO "UserCredentials";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
