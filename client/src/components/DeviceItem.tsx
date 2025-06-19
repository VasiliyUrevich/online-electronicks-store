import React from 'react'
import { useAppSelector } from '../store'
import { Navigate, useNavigate } from 'react-router'

const DeviceItem = ({deviceId}: {deviceId: number}) => {
const devices = useAppSelector(state => state.devicesState.devices.rows)
const device = devices.filter(device => device.id == deviceId)[0]

const types = useAppSelector(state => state.typeState.types)
const type = types.filter(type => type.id == device.typeId)[0]

const brands = useAppSelector(state => state.brandsState.brands)
const brand = brands.filter(brand => brand.id == device.brandId)[0]

const navigate = useNavigate()

return (
    <div  className="item" onClick={() => navigate(`/device/${deviceId}`)}>
        <div className="item__box">
            <img src={`http://localhost:5000/${device.img}`} alt="" className="item__img" />
            <div className="item__content">
            <div className="item__type-row">
                <p className="item__type">{type.name} </p>
                <p className="item__brand"> {brand.name.length>6? `${brand.name.slice(0, 6)}...` : brand.name}</p>
                <span className='item__raiting'>{device.rating}</span>
            </div>
            <div className="item__name-row">
                <h2 className="item__name">{device.name}</h2>
            </div>
            </div>
        </div>
    </div>
  )
}

export default DeviceItem