import React, { useState } from 'react';
import Header from '../../components/Header';
import List from '../../components/List';
import NewActivityModal from '../../components/NewActivityModal';
import './style.css'


function ActivitiesManager() {
    const [modalVisibility, setModalVisibility] = useState(false)
    
    return (
        <>
            <Header/>
            <button className="newActivity" onClick={() => setModalVisibility(true)}>ADICIONAR NOVA ATIVIDADE</button>
            <List/>
            <NewActivityModal isOpen={modalVisibility} onClickClose={()=> setModalVisibility(false)}/>
        </>
    );
}

export default ActivitiesManager;