// Импорт экземпляра Sequelize и типов данных
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// Определение модели User (Пользователь)
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
    email: {type: DataTypes.STRING, unique: true,}, // Уникальный email
    password: {type: DataTypes.STRING}, // Пароль
    role: {type: DataTypes.STRING, defaultValue: "USER"}, // Роль пользователя (по умолчанию USER)
})

// Определение модели Basket (Корзина)
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
})

// Определение модели BasketDevice (Устройство в корзине)
const BasketDevice = sequelize.define('basket_device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
})

// Определение модели Device (Устройство/Товар)
const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
    name: {type: DataTypes.STRING, unique: true, allowNull: false}, // Название устройства (уникальное, обязательное)
    price: {type: DataTypes.INTEGER, allowNull: false}, // Цена (обязательная)
    rating: {type: DataTypes.INTEGER, defaultValue: 0}, // Рейтинг (по умолчанию 0)
    img: {type: DataTypes.STRING, allowNull: false}, // Путь к изображению (обязательное)
})

// Определение модели Type (Тип устройства)
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
    name: {type: DataTypes.STRING, unique: true, allowNull: false}, // Название типа (уникальное, обязательное)
})

// Определение модели Brand (Бренд)
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
    name: {type: DataTypes.STRING, unique: true, allowNull: false}, // Название бренда (уникальное, обязательное)
})

// Определение модели Rating (Рейтинг)
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
    rate: {type: DataTypes.INTEGER, allowNull: false}, // Оценка (обязательная)
})

// Определение модели DeviceInfo (Характеристики устройства)
const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
    title: {type: DataTypes.STRING, allowNull: false}, // Название характеристики (обязательное)
    description: {type: DataTypes.STRING, allowNull: false}, // Описание характеристики (обязательное)
})

// Определение модели TypeBrand (Связь между типами и брендами)
const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, // Уникальный идентификатор
})

// Установка связей между моделями:

// Пользователь имеет одну корзину (1:1)
User.hasOne(Basket)
Basket.belongsTo(User)

// Пользователь может иметь много оценок (1:M)
User.hasMany(Rating)
Rating.belongsTo(User)

// Корзина может содержать много устройств (1:M)
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

// Тип может содержать много устройств (1:M)
Type.hasMany(Device)
Device.belongsTo(Type)

// Бренд может содержать много устройств (1:M)
Brand.hasMany(Device)
Device.belongsTo(Brand)

// Устройство может иметь много оценок (1:M)
Device.hasMany(Rating)
Rating.belongsTo(Device)

// Устройство может быть во многих корзинах (1:M)
Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

// Устройство может иметь много характеристик (1:M)
// as: 'info' - создает псевдоним для связи
Device.hasMany(DeviceInfo, {as: 'info'});
DeviceInfo.belongsTo(Device)

// Связь многие-ко-многим между типами и брендами (M:N)
// Через промежуточную таблицу TypeBrand
Type.belongsToMany(Brand, {through: TypeBrand })
Brand.belongsToMany(Type, {through: TypeBrand })

// Экспорт всех моделей
module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}