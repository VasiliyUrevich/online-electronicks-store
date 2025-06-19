import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchDevices } from '../store/devices/fetchDevices'
import { fetchTypes } from '../store/types/fetchTypes'
import { fetchBrands } from '../store/brands/fetchBrands'
import ProductSection from '../components/Catalog/ProductSection'
import { BrandBar } from '../components/Catalog/BrandBar'
import { TypeBar } from '../components/Catalog/TypeBar'

interface brandTypeId{
  brandId: number | undefined,
  typeId: number | undefined
}

const Catalog = () => {
  const [activeType, setActiveType] = useState()
  const [activeBrand, setActiveBrand] = useState()
  const [brandTypeId, setBrandTypeId] = useState<brandTypeId>({brandId: undefined, typeId: undefined})
  const [devicesOnPage, setDevicesOnPage] = useState(10)
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()


  const brands = useAppSelector(state => state.brandsState.brands)
  const types = useAppSelector(state => state.typeState.types)
  
  // Эффект для обновления ID бренда и типа при изменении активных значений
  useEffect(()=>  {
    let BrandId = undefined
    let TypeId = undefined
    if(activeType){
      TypeId = types.filter(type => type.name == activeType)[0].id
    } 
    if(activeBrand){
      BrandId = brands.filter(brand => brand.name == activeBrand)[0].id
    } 
    setBrandTypeId({brandId: BrandId, typeId: TypeId})
    setPage(1)
  },[activeBrand, activeType])
  
   // Эффект для загрузки устройств при изменении ID бренда или типа
  useEffect(()=>{
    dispatch(fetchDevices(brandTypeId.brandId, brandTypeId.typeId, devicesOnPage, page))
  },[brandTypeId, page, devicesOnPage])

  return (
    <div className="catalog">
      <div className='catalog__container'>
        <TypeBar activeType={activeType} setActiveType={setActiveType}/>

        <main className='catalog__main main'>
          
          <BrandBar activeBrand={activeBrand} setActiveBrand={setActiveBrand}/>
          <ProductSection devicesOnPage={devicesOnPage} setDevicesOnPage={setDevicesOnPage} setPage={setPage} brandTypeId={brandTypeId}/>
        </main>
      </div>
    </div>
  )
}

export default Catalog