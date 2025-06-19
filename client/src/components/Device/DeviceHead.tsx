import React, { useState } from 'react'
import { RatingSelector } from './RatingSelector'
import { useAppDispatch, useAppSelector } from '../../store'
import Raiting from './Raiting'
import { cartSlice } from '../../store/cart/cartReducer'
import { useNavigate } from 'react-router'

// Компонент заголовка страницы устройства с основной информацией
const DeviceHead = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.userState.isAuth)

    // Состояние для отображения селектора рейтинга
    const [isActiveRaiting, setIsActiveRaiting] = useState(false)
    const device = useAppSelector(state => state.devicesState.devices.rows)[0]

    const types = useAppSelector(state => state.typeState.types)
    const typeName = types.filter(type => type.id == device.typeId)[0].name

    const brands = useAppSelector(state => state.brandsState.brands)
    const brandName = brands.filter(brand => brand.id == device.brandId)[0].name
    
    // Проверка на наличие устройства
    if (!device) {
      return <div className="device__error">Устройство не найдено</div>
  }
    
  return (
    <div className="device__head">
        <h1 className="device__title">{typeName.slice(0, -1)} {brandName} <span>{device.name}</span></h1>
        <img src={`http://localhost:5000/${device.img}`} alt="" className="device__img" />
        <div className="device__raiting-row">
            <p className="device__raiting-row-number">Оценка пользователей: <strong>{device.rating}/5</strong> </p>
            <Raiting raiting={device.rating}/>
            <button onClick={() => setIsActiveRaiting(true)} className="device__raiting-btn">Оценить</button>
        </div>
        <RatingSelector isActive={isActiveRaiting} setIsActive={setIsActiveRaiting}/>
        <p className="device__price">Цена: {device.price}Р</p>
        <button className="device__btn" onClick={isAuth? () => dispatch(cartSlice.actions.ADD_CART_ITEM(device)) : ()=>alert('вы не авторизованы')}>В корзину</button>
    </div>
  )
}


export default DeviceHead