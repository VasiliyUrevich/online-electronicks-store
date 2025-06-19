const {Sequelize} = require('sequelize')

// сюда предаем пользователя под которым будем подключаться в бд, пароль и тд.
module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)