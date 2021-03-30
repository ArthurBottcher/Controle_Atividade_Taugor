import React, { useState } from 'react';
import  './style.css'
import { firebaseSingIn } from '../../firebase';
import { useHistory } from 'react-router-dom';


function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function login() {
        try {
            firebaseSingIn(email, password)
            
        } catch (error) {
            console.log(error)
        }
    }

    function goToRegister(){
         history.push('/register')
    }

    return (
        <div className="app">
            <div className="card">
                <h2>Login</h2>
                <input placeholder="Informe seu e-mail" value={email} onChange={e => setEmail(e.target.value)}></input>
                <input placeholder="Informe sua senha" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <button className="primary" onClick={login} type="submit">Entrar</button>
                <p className="secondary" onClick={goToRegister}>Não é cadastrado? Clique aqui para <strong>cadastrar-se</strong></p>
            </div>
        </div>
    );
}

export default Login;