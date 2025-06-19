import React, { useState } from 'react'
import CreateBrands from '../components/admin/modals/CreateBrands'
import CreateDevice from '../components/admin/modals/CreateDevice'
import { CreateTypes } from '../components/admin/modals/CreateTypes'

const Admin = () => {
  const [isActive, setIsActive] = useState('')

  return (
    <section className='admin'>
      <div className="admin__container">
        <button className='admin__add-btn' onClick={()=>setIsActive('types')}>Создать тип</button>
        <button className='admin__add-btn' onClick={()=>setIsActive('brands')}>Создать бренд</button>
        <button className='admin__add-btn' onClick={()=>setIsActive('device')}>Добавить девайс</button>
        <CreateBrands isActive={isActive} setIsActive={setIsActive}/>
        <CreateDevice isActive={isActive} setIsActive={setIsActive}/>
        <CreateTypes isActive={isActive} setIsActive={setIsActive}/>
      </div>
    </section>
  )
}

export default Admin