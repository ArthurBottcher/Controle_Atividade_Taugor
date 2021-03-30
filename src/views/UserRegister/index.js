import React, { useState } from 'react';
import  './style.css'
import { firebaseCreateUser } from '../../firebase';
import { useHistory } from 'react-router-dom';

function Register() {
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function register( ){
        try{
            firebaseCreateUser(name, email, password)
            history.push('/')
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className="App">
            <div className="card">
                <h2>Cadastre-se</h2>
                <input aria-label="Seu nome aqui" placeholder="Insira seu nome" value={name} onChange={e => setName(e.target.value)}></input>
                <input placeholder="Insira seu e-mail" value={email} onChange={e => setEmail(e.target.value)}></input>
                <input placeholder="Informe uma senha" type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <p className="hint">A senha deve conter no mínimo 6 caracteres.</p>
                <button className="secondary" onClick={register} type="submit">Cadastrar</button>
            </div>
        </div>
    );
}

export default Register;