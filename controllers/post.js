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
        const p = await prisma.post.update({
            where: {
                id: req.body.id
            },
            data: { description: true},
        })
        res.status(204).json(p)

    } catch(error) {
        // res.status(400).json({ message: "Неудалось редактировать сотрудника" });
        console.log(error)
    }
};


module.exports = {
    addPost,
    editPost
}