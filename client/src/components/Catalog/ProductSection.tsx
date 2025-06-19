import React, { useMemo } from 'react'
import { useAppSelector } from '../../store'
import DeviceItem from '../DeviceItem'
interface IProductSection{
  devicesOnPage: number,
  setDevicesOnPage: Function,
  setPage: Function,
  brandTypeId: {}
}

// Компонент секции товаров с пагинацией
const ProductSection = ({devicesOnPage, setDevicesOnPage, setPage, brandTypeId}:IProductSection) => {
    const devices = useAppSelector(state => state.devicesState.devices.rows)
    const countDevices = useAppSelector(state => state.devicesState.devices.count)
    const countPages = Math.ceil(countDevices / devicesOnPage)

    // Создаем массив номеров страниц для пагинации
    const pagesArray = useMemo(()=>{
      let arr:number[] = []
      for(let i=1; i<=countPages; i++){
        arr = [...arr, i]
      }
      return arr
    },[devicesOnPage, brandTypeId, countDevices])

    // Обработчик изменения количества товаров на странице
    function setSelect(e:React.ChangeEvent<HTMLSelectElement>){
      setDevicesOnPage(e.currentTarget.value)
      setPage(1)
    }


  return (
    <section className='products'>
        <h2 className="products__title">Товары</h2>

        <div className="products__count-selector">
          <h3>Количество товаров на странице:</h3>
          <select onChange={e=>setSelect(e)} name="" id="">
            <option value="10">10</option>
            <option value="8">8</option>
            <option value="5">5</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="products__items">
        
        {devices.map(device =>
            <DeviceItem key={device.id}  deviceId={device.id}/>
            )
        }
    </div>
    <ul className={countPages>1?"products__pages active": "products__pages"}>
        {
          pagesArray.map(page =>
            <li key={page} onClick={()=>setPage(page)} className='products__pages-list-item'>{page}</li>
          )
        }
    </ul>
  </section>
  )
}

export default ProductSection