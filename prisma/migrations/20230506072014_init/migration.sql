-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "univ" TEXT NOT NULL,
    "age" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "friendId" TEXT NOT NULL,
    "friendName" TEXT NOT NULL,
    "friendPhoto" TEXT NOT NULL,
    "friendAge" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FriendToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FriendToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Friend" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FriendToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FriendToUser_AB_unique" ON "_FriendToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendToUser_B_index" ON "_FriendToUser"("B");
