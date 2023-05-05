const express = require('express')
const {login, register, getUser, editUser} = require("../controllers/user");
const {auth} = require("../middlewares/auth");
const router = express.Router()


router.post('/login', login)
router.post('/register', register)
router.get('/:id', getUser)
router.put('/edit', auth , editUser)
module.exports = router