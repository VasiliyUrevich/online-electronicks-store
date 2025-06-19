import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store'
import { UserSlice } from '../store/user/userReducer'
import { cartSlice } from '../store/cart/cartReducer'

const Header = () => {
    const dispatch =useAppDispatch()
    const navigate = useNavigate()
    const {isAuth, isAdmin} = useAppSelector(state => state.userState)
    const cartcCount = useAppSelector(state => state.cartState.items).length

    const LogOut = () => {
        dispatch(UserSlice.actions.LOG_OUT())
        dispatch(cartSlice.actions.LOG_OUT())
        dispatch(cartSlice.actions.CLEAR_CART())
        navigate('/')
    }

  return (
    <header className='header'>
        <div className="header__container">
            <nav className="header__menu menu">
            <div className="header__logo"><Link to={'/'}>ТехноСтор</Link></div>
                <ul className="menu__list">

                    {
                        isAuth&&isAdmin?
                        <>
                            <li className="menu__item">
                                <Link to={'/cart'} className="menu__link">
                                    Корзина {cartcCount>0? <span>{cartcCount}</span> : ''}
                                </Link>
                            </li>
                            <li className="menu__item"><Link to={'/admin'} className="menu__link">Админ панель</Link></li>
                            <li className="menu__item"><button className="menu__btn" onClick={()=>LogOut()}>Выйти</button></li>
                        </>
                        :
                            isAuth?
                            <>
                                <li className="menu__item">
                                    <Link to={'/cart'} className="menu__link">
                                        Корзина{cartcCount>0? <span>{cartcCount}</span> : ''}
                                    </Link>
                                </li>
                                <li className="menu__item"><button className="menu__btn"  onClick={()=>LogOut()}>Выйти</button></li>
                            </>
                            :
                            <li className="menu__item"><Link to={'/auth'} className="menu__link">Авторизация</Link></li>
                    }
                
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header