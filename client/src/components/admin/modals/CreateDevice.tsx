import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { createDevice } from '../../../store/devices/fetchDevices'

type InfoType = {
    title: string,
    description: string, 
    number: number // Уникальный идентификатор характеристики
}[]
// Ключи для изменения характеристик
type InfoKey = 'title' | 'description' 

// Компонент для создания новых девайсов
const CreateDevice = ({isActive, setIsActive}:{isActive: string, setIsActive: Function}) => {
    const [info, setInfo] = useState<InfoType>([])// Характеристики устройства
    const [deviceName, setDeviceName] = useState('')
    const [devicePrice, setDevicePrice] = useState<number>(0)
    const [brandId, setBrandId] = useState<number>(1)
    const [typeID, setTypeId] = useState<number>(1)
    const [file, setFile] = useState<File | string>('')// Файл изображения
    
    const dispatch = useAppDispatch()
    const brands = useAppSelector(state => state.brandsState.brands)// Список брендов из store
    const types = useAppSelector(state => state.typeState.types)// Список типов из store

    // Обработчики изменений выпадающих списков
    const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBrandId(Number(e.target.value));
    }
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeId(Number(e.target.value));
    }

       // Добавление новой характеристики
    function addInfo(e:React.MouseEvent){
        e.preventDefault()
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
      // Удаление характеристики
    function deletInfoItem(e:React.MouseEvent, number:number){
        e.preventDefault
        setInfo(info.filter(item => item.number != number))
    }
      // Изменение характеристики
    function changeInfo(key:InfoKey, value:string, number:number){
        setInfo(info.map(i => i.number == number? {...i, [key]: value} : i))
    }

    // Выбор файла изображения
    function selectFile(e:any){
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    // Отправка формы
    function modalBtnClick(e:React.MouseEvent){
        e.preventDefault()

        // Создание FormData для отправки на сервер
        const formData = new FormData()
        formData.append('name', deviceName)
        formData.append('price', `${devicePrice}`)
        formData.append('img', file)
        formData.append('brandId', `${brandId}`)
        formData.append('typeId', `${typeID}`)
        formData.append('info', JSON.stringify(info))

        // Отправка действия создания устройства
        dispatch(createDevice(formData))
        
        // Сброс формы после отправки
        setDeviceName('')
        setDevicePrice(0)
        setBrandId(1)
        setTypeId(1)
        setInfo([])
        setFile('') 
    }
    

    return (
        <div className={isActive=="device"? "admin__modal modal active": "admin__modal modal "}>
          <div className="modal__box">
            <h2 className="modal__title">Добавить новый девайс</h2>
            <div className="modal__body">
                <form action="" className="modal__form">

                    <label htmlFor="types-selector">Выбирете категорию устройства</label>
                    <select name="types" onChange={e => handleTypeChange(e)} id="types-selector">
                        {
                            types.map(type => 
                                <option key={type.id} value={type.id}>{type.name}</option>
                            )
                        }
                    </select>

                    <label htmlFor="brands-selector">Выбирете бренд</label>
                    <select name="brands" onChange={e => handleBrandChange(e)} id="brands-selector">
                        {
                            brands.map(brand => 
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            )
                        }
                    </select>

                    <label htmlFor="add-name">Название устройства</label>
                    <input onChange={e=>setDeviceName(e.target.value)} value={deviceName} type="" id='add-name' placeholder='Введите название нового устройства '/>

                    <label htmlFor="add-price">Цена устройства</label>
                    <input onChange={e=>setDevicePrice(Number(e.target.value))} value={devicePrice} type="number" id='add-price' placeholder='Введите цену нового устройства '/>

                    <input onChange={e => selectFile(e)} type="file" id='add-file' placeholder='Добавьте фото'/>

                    <button className="modal__btn" onClick={e => addInfo(e)}>Добавить свойство. <span> Всего:{info.length}</span></button>
                    <div className="modal__property-box">
                        {info.map(i =>
                            <div key={i.number} className="modal__property">
                                <input 
                                    type="text" 
                                    placeholder='название свойства' id='property-name' 
                                    className="modal__property-input" 
                                    onChange={e=>changeInfo('title', e.target.value, i.number)} 
                                    value={i.title}
                                />
                                <input 
                                    type="text" 
                                    placeholder='значение свойства' 
                                    id='property-description' 
                                    className="modal__property-input" 
                                    onChange={e=>changeInfo('description', e.target.value, i.number)} 
                                    value={i.description}
                                />
                                <button className="modal__property-btn" onClick={e => deletInfoItem(e, i.number)}>Удалить</button>
                            </div>
                        )}
                    </div>
                    

                    <button className="modal__btn" onClick={e=>modalBtnClick(e)}>Добавить</button>    
                </form>
            </div>
            <button className="modal__close-btn" onClick={()=>setIsActive('')}></button>
          </div>
        </div>
      )
}

export default CreateDevice