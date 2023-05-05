const {prisma} = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = (req,res) => {
    try {
    const {email,password} = req.body
        if(email && password) {
            res.status(200).json({
                email,
                password
            })
        } else {
            res.status(400).json({
                message: 'Введены неправильные данные!'
            })
        }
    }
    catch {
        res.status(500).json({
            message: "Что-то пошло не так :("
        })
    }
}

const register = async (req,res) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password) {
            res.status(400).json({
                message: 'Данные введены некорректно!'
            })
        }
        const registeredUser = await prisma.user.findFirst({
            where: {
                email
            },
        })
        if(registeredUser) {
            res.status(400).json({
                message: 'Пользователь с таким e-mail уже существует'
            })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    photo: 'null',
                    city: 'null',
                    description: 'null',
                    univ: 'null',
                    age: 0,
                },
            })
            const secret = process.env.JWT_SECRET
            if (user && secret) {
                res.status(201).json({
                    id: user.id,
                    email: user.email,
                    name,
                    token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
                });
            } else {
                return res.status(400).json({ message: "Не удалось создать пользователя" });
            }
        }
    }
    catch(error) {
    console.log(error.message)
    }
}

module.exports = {
    login,
    register
}