-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Certification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "fileUrl" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Certification" ("category", "color", "date", "description", "id", "issuer", "order", "title") SELECT "category", "color", "date", "description", "id", "issuer", "order", "title" FROM "Certification";
DROP TABLE "Certification";
ALTER TABLE "new_Certification" RENAME TO "Certification";
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "demoUrl" TEXT NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Project" ("color", "demoUrl", "description", "features", "id", "order", "repoUrl", "techStack", "title") SELECT "color", "demoUrl", "description", "features", "id", "order", "repoUrl", "techStack", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
