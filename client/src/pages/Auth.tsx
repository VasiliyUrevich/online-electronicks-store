import React, { useEffect, useState, type ReactEventHandler } from 'react'
import { userLogin, userRegistration } from '../store/user/fetchUserData'
import { useAppDispatch, useAppSelector } from '../store'
import { Navigate } from 'react-router'

const Auth = () => {
  const [isAuthForm, setIsAuthform] = useState(true)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useAppDispatch()

  function changeForm(e:React.MouseEvent){
    e.preventDefault()
    setIsAuthform(!isAuthForm)
  }
 
 
  const {data, error, isAuth} = useAppSelector(state => state.userState)

  function Auth(e:React.MouseEvent){
    e.preventDefault()
    dispatch(userLogin(email, password))
    
    setEmail('')
    setPassword('')
  }
  function Registration(e:React.MouseEvent){
    e.preventDefault()
    dispatch(userRegistration(email, password))
    
    setEmail('')
    setPassword('')
  }


  if(isAuth){
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <section className='login'>
      <div className="login__container">
        <form action="#" className="login__form form-login">
          <h1 className="form-login__title">{isAuthForm? 'Авторизируйтесь' : 'Зарегестрируйтесь'}</h1>
          <div className="form-login__box">
            <div className="form-login__input-row">
              <label htmlFor="email-input" >Введите email</label>
              <input type="text" id='email-input' value={email} onChange={e => setEmail(e.target.value)} placeholder='Введите email'/>
            </div>
            <div className="form-login__input-row">
              <label htmlFor="password-input" >Введите пароль</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} id='password-input' placeholder='Введите пароль'/>
            </div>
            <p className="form-login__alert">{error}</p>
            <a href="№" className="form-login__change-form" onClick={e => changeForm(e)}>{isAuthForm? 'Нет аккаунта, зарегестрируся!' : 'Авторизироваться'}</a>
            {isAuthForm? 
              <button className="form-login__btn" onClick={ e => Auth(e)}>Войти</button>
            : 
            <button className="form-login__btn" onClick={ e => Registration(e)}>Регистрация</button>
            }
          </div>
        </form>
      </div>
    </section>
  )
}

export default Auth