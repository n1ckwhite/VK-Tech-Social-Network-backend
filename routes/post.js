const express = require("express");
const {
  addPost,
  editPost,
  deletePost,
  allPost,
  like,
} = require("../controllers/post");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post("/add", auth, addPost);
router.put("/edit/:id", auth, editPost);
router.delete("/delete/:id", auth, deletePost);
router.get("/all", auth, allPost);
router.post("/like/:id", auth, like);
module.exports = router;
