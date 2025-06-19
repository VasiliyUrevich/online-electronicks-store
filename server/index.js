require('dotenv').config()
// подключение express
const express = require('express')
// export from db
const sequelize = require('./db')
// импортируем модели из models
const models = require('./models/models')
const cors =require('cors')
const fileUpload =require('express-fileupload')
const router = require('./routes/index')
// middleware с ошибками( должен регистрироваться последним )
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path =require('path')


const PORT = process.env.PORT || 5000

// создаем объект приложения
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// обработка ошибок
app.use(errorHandler)


// функция подключения к бд
const start = async () => {
    try{
        // c 
        await sequelize.authenticate()
        await sequelize.sync()
        // начинаем прослушивать подключения на 3000 порту
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch(e){
        console.log(e)
    }
}


start()


