const {prisma} = require('../prisma/prisma-client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = async (req,res) => {
    try {
    const {email,password} = req.body
        if(!email || !password) {
            return res.status(400).json({
                message: 'Пожалуйста, заполните обязательные поля!'
            })
        }
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })
        const isPasswordCorrect = user && await bcrypt.compare(password,user?.password)
        const secret = process.env.JWT_SECRET
        if(isPasswordCorrect && user && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({id: user.id}, secret, {expiresIn: '30d'})
            })
        } else {
            res.status(400).json({
                message: 'Введен некорректный логин или пароль!'
            })
        }
    } catch {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
}

const register = async (req,res) => {
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password) {
           return res.status(400).json({
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
                    posts: {},
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
                res.status(400).json({ message: "Не удалось создать пользователя" });
            }
        }
    } catch {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
}

const getUser = async (req,res) => {
    try {
        const {id} = req.params
        const user = await prisma.user.findUnique({
            where: {
               id
            },
            include: {
                posts: true
            }
        })
       res.status(200).json(user)
    }
    catch{
        res.status(500).json({ message: "Что-то пошло не так" });
    }
}

const editUser = async (req,res) => {
    try {
        const {id,photo,city,description,univ,age} = req.body
        if(!id) {
            return res.status(400).json({
                message: 'Не удалось отредактировать профиль'
            })
        }
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                photo,
                city,
                description,
                univ,
                age
            }
        })
        res.status(200).json(user)
    }

    catch{
         res.status(500).json({ message: "Что-то пошло не так" });

    }
}

module.exports = {
    login,
    register,
    getUser,
    editUser
}