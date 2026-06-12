-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "heroStatement" TEXT NOT NULL,
    "cvUrl" TEXT NOT NULL DEFAULT '/documents/CV.pdf',
    "email" TEXT NOT NULL DEFAULT '',
    "whatsapp" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "github" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Education" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "responsibilities" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "techStack" TEXT NOT NULL,
    "demoUrl" TEXT NOT NULL,
    "repoUrl" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);
