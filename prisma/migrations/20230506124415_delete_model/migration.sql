/*
  Warnings:

  - You are about to drop the `PostFriend` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FriendToPostFriend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PostFriend";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FriendToPostFriend";
PRAGMA foreign_keys=on;
