import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDGnFs9UmgnzMsmhGqD8IkHuzS_XsoduOU",
    authDomain: "wri-sharepic.firebaseapp.com",
    projectId: "wri-sharepic",
    storageBucket: "wri-sharepic.appspot.com",
    messagingSenderId: "651848536252",
    appId: "1:651848536252:web:9c4121213cca29754780b9"
});

const db = firebaseApp.firestore();         // Access database
const auth = firebase.auth();               // Access authentication
const storage = firebase.storage();         // Access image or file storage

export { db, auth, storage };