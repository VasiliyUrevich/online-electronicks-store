// Импорт необходимых модулей
const uuid = require('uuid')// Для генерации уникальных идентификаторов
const path = require('path') // Для работы с путями файловой системы
const {Device, DeviceInfo} = require('../models/models') // Импорт моделей БД
const ApiError = require('../error/ApiError') // Импорт класса для обработки ошибок API

class DeviceController{

     /**
     * Создание нового устройства
     *{Object} req - Объект запроса
     * {Object} res - Объект ответа
     * {Function} next - Функция next для передачи ошибок
     */
    async create(req, res, next){
        try{
             // Получаем данные из тела запроса
            let {name, price, brandId, typeId, info} = req.body
             // Получаем файл изображения из запроса
            const {img} = req.files
            
            // Генерируем уникальное имя файла с расширением .jpg
            let fileName = uuid.v4() + ".jpg"
            // Перемещаем загруженный файл в папку static
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            // Создаем запись устройства в базе данных
            const device = await Device.create({name, price, brandId, typeId, img: fileName})
    
            // Если есть дополнительная информация о устройстве
            if (info){
                info = JSON.parse(info)// Парсим JSON строку
                // Для каждого элемента информации создаем запись в DeviceInfo
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id // Связываем с созданным устройством
                    })
                });
            }
            
            return res.json(device)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    
   
     /**
     * Получение списка устройств с возможностью фильтрации и пагинации
     *  req - Объект запроса
     *  res - Объект ответа
     */
    async getAll(req, res){
        // Получаем параметры запроса
        let {brandId, typeId, limit, page} = req.query
       
        // Устанавливаем значения по умолчанию для пагинации
        page = page || 1 // Текущая страница (по умолчанию 1)
        limit = limit || 9 // Количество элементов на странице (по умолчанию 9)

        // Отступ в страницах (если лимит 2 - нам запрос будет выводить 2 элемента, всего у нас их 4, для последних двух укажем страницу 2 и офсет пропустит их )
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})

        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

}


module.exports = new DeviceController()
