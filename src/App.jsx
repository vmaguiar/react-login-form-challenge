// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.


import { login } from './utils';
import { useState } from 'react';

import './index.css';


export default function LoginForm() {

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    loginErrorMsg: ''
  })

  const [requesting, setRequisting] = useState(false)


  const handleOnChange = (event) => {
    const {value, id} = event.target
    // console.log(`${event.target.id}: ${event.target.value}`)
    // console.log(event)

    setLoginState((oldLogin) => {
      const newLogin = {...oldLogin, [id]: value, loginErrorMsg: ''}

      return newLogin
    })
  }

  const handleOnClick = () => {
    // const {email, password} = loginState
    // console.log(`${loginState.email} : ${loginState.password}`)

    setRequisting(true)

    login(loginState)
      .then(() => {
        alert('logado com sucesso!!')
      })
      .catch(({message}) => {
        setLoginState((oldLogin) => {
          const newLogin = {...oldLogin, loginErrorMsg: message}
          return newLogin
        })
      }).finally(() => setRequisting(false))
  }

  // const handleDisabledBtn = () => {
  // }


  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {loginState.loginErrorMsg && <div className='errorMessage'>{loginState.loginErrorMsg}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input
            id={'email'}
            type={'email'}
            autoComplete='off'
            value={loginState.email}
            onChange={handleOnChange}
          />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input
            id={'password'}
            type={'password'}
            value={loginState.password}
            onChange={handleOnChange}
          />
        </div>

        <div className='button'>
          <button onClick={handleOnClick} disabled={!loginState.email || loginState.password.length < 6 || requesting}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
