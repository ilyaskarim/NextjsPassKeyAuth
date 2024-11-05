/*
  Warnings:

  - You are about to drop the `UserCredentials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserCredentials";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Passkey" (
    "cred_id" TEXT NOT NULL PRIMARY KEY,
    "cred_public_key" BLOB NOT NULL,
    "user_id" INTEGER NOT NULL,
    "webauthn_user_id" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "backup_eligible" BOOLEAN NOT NULL,
    "backup_status" BOOLEAN NOT NULL,
    "transports" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used" DATETIME,
    CONSTRAINT "Passkey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Passkey_webauthn_user_id_key" ON "Passkey"("webauthn_user_id");
