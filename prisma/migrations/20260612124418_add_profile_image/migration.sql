-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "heroStatement" TEXT NOT NULL,
    "cvUrl" TEXT NOT NULL DEFAULT '/documents/CV.pdf',
    "profileImage" TEXT NOT NULL DEFAULT '/images/profile.png',
    "email" TEXT NOT NULL DEFAULT '',
    "whatsapp" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "github" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Profile" ("cvUrl", "email", "github", "heroStatement", "id", "linkedin", "name", "summary", "title", "website", "whatsapp") SELECT "cvUrl", "email", "github", "heroStatement", "id", "linkedin", "name", "summary", "title", "website", "whatsapp" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
