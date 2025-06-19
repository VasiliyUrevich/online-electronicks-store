import React from 'react'
import { useAppSelector } from '../../store'

interface TypeBarProps{
  activeType: string | undefined,
  setActiveType: Function
}

// Компонент боковой панели с фильтрацией по типам товаров
export const TypeBar:React.FC<TypeBarProps> = ({activeType, setActiveType}) => {
    const types = useAppSelector(state => state.typeState.types)

    // Обработчик изменения активного типа
    function changeType(typeName:string){
       // Если кликаем по уже активному типу - сбрасываем выбор
      if(typeName == activeType){
        setActiveType()
      } else {
        // Иначе устанавливаем новый активный тип
        setActiveType(typeName)
      }
    }

    
  return (
    <aside className='catalog__sidebar sidebar'>
      <ul className="sidebar__list">
          {types.map(type=>
              <li onClick={() => changeType(type.name)} key={type.id} className={activeType == type.name? "sidebar__item active" : "sidebar__item"}>
                  <p className='sidebar__item-name'>{type.name}</p>
              </li>
          )}
      </ul>
    </aside>
  )
}
