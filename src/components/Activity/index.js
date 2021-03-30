import React from 'react';
import './style.css'

function Activity({title, status, description, responsibleUser, events, onClickActivyEditar}) {
  return (
      <div className="activity" >
          <button className="edit-button" onClick={onClickActivyEditar}>Editar</button>
          <span className={status} >{status === 'Em_andamento'? 'Em andamento': status}</span>
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
          <p className="user">Usuário responsável: {responsibleUser}</p>
          <p>{events}</p>
      </div>
  );
}

export default Activity;