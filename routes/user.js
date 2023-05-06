const express = require('express')
const {login, register, getUser, editUser, addFriend, deleteFriend, searchUser} = require("../controllers/user");
const {auth} = require("../middlewares/auth");
const router = express.Router()


router.post('/login', login)
router.post('/register', register)
router.get('/:id', getUser)
router.put('/edit', auth , editUser)
router.post('/add/:id', auth, addFriend)
router.delete('/delete/:id', auth, deleteFriend)
router.post('/search', auth, searchUser)
module.exports = router