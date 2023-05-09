-- CreateTable
CREATE TABLE "PostFriend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descriptionPost" TEXT NOT NULL,
    "photoPost" TEXT NOT NULL,
    "postLikes" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FriendToPostFriend" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FriendToPostFriend_A_fkey" FOREIGN KEY ("A") REFERENCES "Friend" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FriendToPostFriend_B_fkey" FOREIGN KEY ("B") REFERENCES "PostFriend" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FriendToPostFriend_AB_unique" ON "_FriendToPostFriend"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendToPostFriend_B_index" ON "_FriendToPostFriend"("B");
