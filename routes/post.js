const express = require('express')
const {addPost, editPost} = require("../controllers/post");
const {auth} = require("../middlewares/auth");
const router = express.Router()


router.post('/add', auth , addPost)
router.put('/edit/:id', auth, () => console.log('Изменить пост'))
router.delete('/delete/:id', auth, () => console.log('Удалить пост'))
module.exports = router