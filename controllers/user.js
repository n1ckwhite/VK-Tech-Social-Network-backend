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

module.exports = {
    login
}