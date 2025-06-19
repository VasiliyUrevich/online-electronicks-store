import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store'
import { createBrand } from '../../../store/brands/fetchBrands'

// Компонент для создания новых брендов
const CreateBrands = ({isActive, setIsActive}:{isActive: string, setIsActive: Function}) => {
  const dispatch = useAppDispatch()
  const [brandName, setBrandName] = useState('')
    
// Обработчик клика по кнопке добавления бренда
function modalBtnClick(e:React.MouseEvent){
    e.preventDefault()

    if (!brandName.trim()) {
      alert('Пожалуйста, введите название типа')
      return
    }

    dispatch(createBrand(brandName.trim()))
    setBrandName('')
}

  return (
    // Модальное окно, которое становится видимым при isActive == "brands"
    <div className={isActive=="brands"? "admin__modal modal active": "admin__modal modal "}>
        <div className="modal__box">
            <h2 className="modal__title">Добавить новый бренд</h2>
            <div className="modal__body">
                <form action="" className="modal__form">
                    <label htmlFor="add-brand">Название бренда</label>
                    <input type="text" id='add-brand' value={brandName} onChange={e => setBrandName(e.target.value)} placeholder='Введите название нового бренда '/>
                    <button className="modal__btn" onClick={e => modalBtnClick(e)}>Добавить</button>
                </form>
            </div>
            <button className="modal__close-btn" onClick={()=>setIsActive('')}></button>
        </div>
  </div>
  )
}

export default CreateBrands