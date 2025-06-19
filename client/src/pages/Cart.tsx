import React, { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { cartSlice } from '../store/cart/cartReducer'

const Cart = () => {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(state => state.cartState.items)
  const brands = useAppSelector(state => state.brandsState.brands)
  const types = useAppSelector(state => state.typeState.types)
  
  const totalCost = useMemo(()=>{
    let cost = 0
    cartItems.forEach(item =>
      cost += item.device.price
    )
    return cost
  },[cartItems])

  if(cartItems.length>0) return (
    <section className='cart'>
      <div className="cart__container">
        <h1 className="cart__title">Корзина</h1>
        <ul className="cart__list">
          {cartItems.map(item => 
            <li key={item.cartItemId} className="cart__item">
              <img src={`http://localhost:5000/${item.device.img}`} alt="" className="cart__item-img" />
              <h3 className="cart__item-name">{types[item.device.typeId-1].name.slice(0, -1)} {brands[item.device.brandId-1].name} {item.device.name} </h3>
              <p className="cart__item-price">Цена: {totalCost}Р.</p>
              <button className="cart__item-btn" onClick={()=>dispatch(cartSlice.actions.DELETE_CART_ITEM(item.cartItemId))}></button>
            </li>
          )}
        </ul>
        <div className="cart__btns-row">
          <button className="cart__buy-btn">Купить</button>
          <button className="cart__clear-btn" onClick={() => dispatch(cartSlice.actions.CLEAR_CART())}>Очистить корзину</button>
        </div>
      </div>
    </section>
  )

  return(
    <section className='cart'>
      <div className="cart__container">
        <h1 className="cart__title">Корзина пуста</h1>
      </div>
    </section>
  )
}

export default Cart