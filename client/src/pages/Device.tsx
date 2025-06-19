import React, { useEffect } from 'react'
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchOneDevice } from '../store/devices/fetchDevices';
import { RatingSelector } from '../components/Device/RatingSelector';
import DeviceHead from '../components/Device/DeviceHead';
import DeviceInfo from '../components/Device/DeviceInfo';

const Device = () => {
  const deviceId = Number(useLocation().pathname.slice(-1))
  const dispatch = useAppDispatch()
   
  useEffect(()=>{
    dispatch(fetchOneDevice(deviceId))
  },[])

  const {error,loading} = useAppSelector(state => state.devicesState)
  const device = useAppSelector(state => state.devicesState.devices.rows)[0]


  if(loading) return(
    <section className="device">
      <div className="device__container">
        <h1>Loading...</h1>
      </div>
    </section>
  )

  if(error) return(
    <section className="device">
      <div className="device__container">
        <h1>Error: {error}</h1>
      </div>
    </section>
  )


  if(device) return (
    <section className="device">
      <div className="device__container">
        <DeviceHead/>
        <DeviceInfo/>
      </div>
    </section>
  )
}

export default Device