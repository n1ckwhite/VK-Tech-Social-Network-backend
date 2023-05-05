const express = require('express')
const {login, register, getUser} = require("../controllers/user");
const router = express.Router()


router.post('/login', login)
router.post('/register', register)
router.get('/:id', getUser)
router.put('/edit/:id', () => console.log('Изменить описание пользователя'))
module.exports = router