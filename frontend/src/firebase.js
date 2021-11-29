import firebase from 'firebase'
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDx88w-dmZbDukE7Kpgu1DofSf66CXdmk8",
  authDomain: "discordclonelive-55fe2.firebaseapp.com",
  projectId: "discordclonelive-55fe2",
  storageBucket: "discordclonelive-55fe2.appspot.com",
  messagingSenderId: "158085817391",
  appId: "1:158085817391:web:e1bd92e08dd946dd27d2da"
};

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://www.example.com/finishSignUp?cartId=1234',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db