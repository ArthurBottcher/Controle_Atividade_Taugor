import React from 'react';
import { firebaseSingOut } from '../../firebase';
import './style.css';

function Header() {
    function logout(){
        firebaseSingOut()
    }

    return (
      <header>
          <h1>Controle de atividades</h1>
          <button className="logout-button" onClick={logout}>Sair</button>
      </header>
    );
}

export default Header;