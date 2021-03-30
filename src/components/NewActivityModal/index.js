import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { firebaseNewActivity } from '../../firebase';
import './style.css';
const portalRoot = document.getElementById('portal-root')

function NewActivityModal({isOpen, onClickClose, users}) {
    const [title, setTitle] = useState('')
    const [status, setStatus] = useState('Pendente')
    const [description, setDescription] = useState('')
    const [responsibleUser, setResponsibleUser] = useState('')

    
    if(!isOpen){
        return null
    }

    function addNewActivity(){
        firebaseNewActivity(title, status, description, responsibleUser)
        setTitle('')
        setStatus('')
        setDescription('')
        setResponsibleUser('')
        onClickClose()
    }
    
    return ReactDOM.createPortal(
      <div className="overlay">
          <div className="modal">
            <button className="close-button" type="button" onClick={onClickClose}>X</button>
            <div className="modal-content">
                <h3>Nova atividade</h3>

                <label>
                    Defina o titulo da atividade:
                    <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)}></input>
                </label>

                <label> Escolha o status da atividade:
                    <select placeholder="Status" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em_andamento">Em andamento</option>
                    <option value="Finalizada">Finalizada</option>
                    <option value="Cancelada">Cancelada</option>
                </select>
                </label>

                <label> Defina uma descrição para a atividade:
                    <input  placeholder="Desrição" value={description} onChange={e => setDescription(e.target.value)}></input>
                </label>
                
                <label> Escolha o responsável pela atividade:
                    <input placeholder="Usuário Responsável" value={responsibleUser} onChange={e => setResponsibleUser(e.target.value)}></input>
                 </label>   
                
                <button className="confirm-button" onClick={addNewActivity} type="submit">Confirmar</button>
            </div>
          </div>
      </div>,
      portalRoot
    )
}

export default NewActivityModal;