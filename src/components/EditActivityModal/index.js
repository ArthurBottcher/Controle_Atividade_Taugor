import React, { useState } from 'react';
import reactDom from 'react-dom';
import { firebaseUpdateActivity } from '../../firebase';
import './style.css'
const portalRoot = document.getElementById('portal-root')

function EditActivityModal({isOpen, onClickClose, keyActivity, eventsActivities}) {
    const [status, setStatus] = useState('')
    const [responsibleUser, setResponsibleUser] = useState('')

    if(!isOpen){
        return null
    }

    function updateActivity(){
        firebaseUpdateActivity(keyActivity, status, responsibleUser, eventsActivities)
        setResponsibleUser('')
        setStatus('')
        onClickClose()
        
    }

    return reactDom.createPortal(
      <div className="overlay">
          <div className="modal">
            <button className="close-button" type="button" onClick={onClickClose}>X</button>
            <div className="modal-content">
                <h3>Editar Atividade</h3>
                <label> Escolha o status da atividade:
                    <select  placeholder="Status" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="Pendente">Pendente</option>
                        <option value="Em_andamento">Em andamento</option>
                        <option value="Finalizada">Finalizada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </label>
                
                <label>
                    Escolha o responsável pela atividade:
                    <input placeholder="Usuário Responsável" value={responsibleUser} onChange={e => setResponsibleUser(e.target.value)}></input>
                </label>
                    
                <button className="confirm-button" type="submit" onClick={updateActivity}>Confirmar</button>
            </div>
          </div>
      </div>,
      portalRoot
    )
}

export default EditActivityModal;