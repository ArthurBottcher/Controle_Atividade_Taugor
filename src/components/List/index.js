import React, { useEffect, useState } from 'react';
import Activity from '../Activity'
import EditActivityModal from '../EditActivityModal';
import './style.css'
import firebase from 'firebase'

function List() {
    const [activityKey, setActivityKey] = useState()
    const [activityEvents, setActivityEvents] = useState()
    const [cards, setCards] = useState()
    const [filtro, setFiltro] = useState('Todos')

    


     useEffect(()=>{
        firebase.database().ref('/Activities/').on('value',function (snapshot){
            const keys=[] 
            snapshot.forEach(function (item){
                const activities = snapshot.val()
                const activitiesList = []
                keys.push(item.key)
               
                for (let id in activities){
                    activitiesList.push(activities[id])
                }
                for(let i in activitiesList){
                    activitiesList[i].key += keys[i]
                }
                

                setCards(activitiesList)
            })
        })
    },[])

    function filtrar(){
        if(filtro === 'Todos'){
            firebase.database().ref('/Activities').on('value', (snapshot)=>{
                const activities = snapshot.val()
                const activitiesList = []
                for (let id in activities){
                    activitiesList.push(activities[id])
                    
                }
                setCards(activitiesList)
            })
        }
        else{
            firebase.database().ref('/Activities').orderByChild('status').equalTo(filtro).on('value', (snapshot)=>{
                const activities = snapshot.val()
                const activitiesList = []
                for (let id in activities){
                    activitiesList.push(activities[id])
                    
                }
                setCards(activitiesList)
            })
        }
    }

    return (
        <>
            <div className="content-filtro">
            <select  placeholder="Status" value={filtro} onChange={e => setFiltro(e.target.value)}>
                <option value="Pendente">Pendente</option>
                <option value="Em_andamento">Em andamento</option>
                <option value="Finalizada">Finalizada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Todos">Todos</option>
            </select>
            <button onClick={filtrar}>Filtrar</button>
            </div>
            
            <ul>
                {cards ? cards.map(card =>(
                    <Activity
                    key={card.title}
                    title={card.title} 
                    status={card.status} 
                    description={card.description} 
                    responsibleUser={card.responsibleUser}
                    events={card.events}
                    onClickActivyEditar={() => { 
                        setActivityKey(card.key)
                        setActivityEvents(card.events)
                    }}
                    />
                )
                ):""}
                <EditActivityModal isOpen={Boolean(activityKey)} onClickClose={()=> setActivityKey(null)} keyActivity={activityKey} eventsActivities={activityEvents} />

            </ul>
            </> 
    )}

export default List;