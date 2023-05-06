const express = require('express')
const {addPost, editPost, deletePost} = require("../controllers/post");
const {auth} = require("../middlewares/auth");
const router = express.Router()


router.post('/add', auth , addPost)
router.put('/edit/:id', auth, editPost)
router.delete('/delete/:id', auth, deletePost)
module.exports = router