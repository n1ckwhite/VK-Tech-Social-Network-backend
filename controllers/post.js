const {prisma} = require('../prisma/prisma-client')

const addPost = async (req,res) => {
    try {
        const data = req.body
        if(!data.description || !data.photo) {
            return res.status(400).json({
                message: "Все поля обязательные"
            })
        }
        const post = await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                posts: {
                    create: {
                        likes: 0,
                        description: data.description,
                        photo: data.photo
                    }
                }
            }
        })
        res.status(201).json(post)
    }
    catch {
        return res.status(500).json({
            message: "Что-то пошло не так"
        })
    }
}

const editPost = async (req, res) => {
    try {
    const {id} = req.params
        const {photo,description, likes} = req.body
        if(!id) {
            return res.status(400).json({
                message: "Не удалось отредактировать пост"
            })
        }
        const post = await prisma.post.update({
            where: {
                id,
            },
            data: {
                photo,
                description,
                likes
            }
        })
        res.status(200).json(post)
    }  catch {
        return res.status(500).json({
            message: "Что-то пошло не так"
        })
    }
};

const deletePost = async (req,res) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(400).json({
                message: 'Не удалось удалить пост!'
            })
        }
        const post = await prisma.post.delete({
            where: {
                id
            }
        })
       res.status(200).json(post)
    }

    catch {
        return res.status(500).json({
            message: "Что-то пошло не так"
        })
    }
}




module.exports = {
    addPost,
    editPost,
    deletePost,
}