import React, { useState } from 'react'
import { useAppDispatch } from '../../../store'
import { createType } from '../../../store/types/fetchTypes'


// Компонент для создания новых типов
export const CreateTypes = ({isActive, setIsActive}:{isActive: string, setIsActive: Function}) => {
  const dispatch = useAppDispatch()
  const [typeName, setTypeName] = useState('')

  // Обработчик отправки формы
  function modalBtnClick(e:React.MouseEvent){
    e.preventDefault()

    // Проверка на пустое название
    if (!typeName.trim()) {
      alert('Пожалуйста, введите название типа')
      return
    }

    dispatch(createType(typeName.trim()))
    setTypeName('')
  }

  return (
    <div className={isActive=="types"? "admin__modal modal active": "admin__modal modal "}>
      <div className="modal__box">
        <h2 className="modal__title">Добавить новый тип</h2>
        <div className="modal__body">
          <form action="" className="modal__form">
            <label htmlFor="add-type">Название типа</label>
            <input type="" id='add-type' value={typeName} onChange={e => setTypeName(e.target.value)} placeholder='Введите название нового типа '/>
            <button className="modal__btn" onClick={e => modalBtnClick(e)}>Добавить</button>
          </form>
        </div>
        <button className="modal__close-btn" onClick={()=>setIsActive('')}></button>
      </div>
    </div>
  )
}
