import React, { useState } from 'react'
import { useAppSelector } from '../../store'

interface BrandBarProps{
  activeBrand: string | undefined, 
  setActiveBrand: Function
}
//Компонент для отображения списка брендов и выбора активного бренда
export const BrandBar:React.FC<BrandBarProps> = ({activeBrand, setActiveBrand}) => {
    const brands = useAppSelector(state => state.brandsState.brands)
   
    function btnClick(brandName:string){
      // Если кликнули по уже активному бренду - сбрасываем выбор
      if(activeBrand == brandName){
        setActiveBrand()       
      } else setActiveBrand(brandName)
    }

  return (
    <section className="brands">
    <ul className="brands__list">
      {brands.map(brand=>
          <li key={brand.id} className={activeBrand==brand.name? 'brands__item active':'brands__item'}>
            <button onClick={() => btnClick(brand.name)} className='brands__btn'>{brand.name}</button>
          </li>
      )}
    </ul>
  </section>
  )
}
