import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDx88w-dmZbDukE7Kpgu1DofSf66CXdmk8",
    authDomain: "discordclonelive-55fe2.firebaseapp.com",
    projectId: "discordclonelive-55fe2",
    storageBucket: "discordclonelive-55fe2.appspot.com",
    messagingSenderId: "158085817391",
    appId: "1:158085817391:web:e1bd92e08dd946dd27d2da"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db