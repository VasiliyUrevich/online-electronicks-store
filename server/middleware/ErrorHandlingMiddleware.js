// Импорт специального класса ошибки ApiError, который определен в ../error/ApiError
const ApiError = require('../error/ApiError')

// Экспорт middleware-функции для обработки ошибок
// В Express.js middleware обработки ошибок принимает 4 параметра:
// err - объект ошибки
// req - объект запроса
// res - объект ответа
// next - функция next для передачи управления следующему middleware
module.exports = function(err, req, res, next) {
    // Проверяем, является ли ошибка экземпляром класса ApiError
    if(err instanceof ApiError) {
        // Если да, возвращаем клиенту статус ошибки и сообщение из ошибки
        // в формате JSON
        return res.status(err.status).json({message: err.message})
    }
    
    // Если ошибка не является экземпляром ApiError,
    // возвращаем стандартную 500 ошибку (Internal Server Error)
    // с общим сообщением "Непредвиденная ошибка"
    return res.status(500).json({message: "Непредвиденная ошибка"})
}