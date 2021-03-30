import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBB-NZCMIrbZUZgHnTgvUzfi_cgE2VHi2k",
    authDomain: "teste-taugor.firebaseapp.com",
    projectId: "teste-taugor",
    storageBucket: "teste-taugor.appspot.com",
    messagingSenderId: "745918253770",
    appId: "1:745918253770:web:837f0415a97a04cb380233",
    measurementId: "G-YPYH3C7P41",
    databaseURL: "https://teste-taugor-default-rtdb.firebaseio.com"
};


export const firebaseImpl = firebase.initializeApp(firebaseConfig);

export function firebaseCreateUser(name, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        firebase.database().ref('/Users').push({
            name: name,
            email: email,
            password: password
        }).then().catch((error)=>console.log((error.code + error.message)))
    })
    .catch((error) => {
        throw new Error (error.code + error.message)
    })
};

export function firebaseSingIn(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        console.log('Usuário logado!')
    })
    .catch((error) => {
        throw new Error (error.code + error.message)
    
    });
}

export function firebaseSingOut(){
    firebase.auth().signOut().then(() => {
        
    }).catch((error) => {
        console.log(error)
    });
}

export function firebaseNewActivity(title, status, description, responsibleUser){
    const month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
    const date = new Date()
    const dateFormated = ((date.getDate() + " " + month[(date.getMonth())] + " " + date.getFullYear())).toString()
    var newAct = firebase.database().ref('/Activities').push()
      newAct.set({
        title: title,
        status: status, 
        description: description,
        responsibleUser: responsibleUser,
        events: 'Data de criação: '+ dateFormated + ' | ',
        key: ''
    })
}

export function firebaseUpdateActivity(key, status, responsibleUser, events){
    const month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
    const date = new Date()
    const dateFormated = ((date.getDate() + " " + month[(date.getMonth())] + " " + date.getFullYear())).toString()
    firebase.database().ref('/Activities').child(key).update({
        status: status,
        responsibleUser: responsibleUser,
        events: events + 'Última atualização: '+ dateFormated + ' | '
    })
}

export function firebaseGetActivities(){
    const activitiesList = []
    firebase.database().ref('/Activities').on('value', (snapshot)=>{
        const activities = snapshot.val()
        for (let id in activities){
            activitiesList.push(activities[id])
        }
    })
    return activitiesList
}