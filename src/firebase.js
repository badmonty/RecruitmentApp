import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
      
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyDNOaGTaIsr-x17ZSzltUaW5gQ_8Ko-lkE",
    authDomain: "instagram-clone-8e3e2.firebaseapp.com",
    projectId: "instagram-clone-8e3e2",
    storageBucket: "instagram-clone-8e3e2.appspot.com",
    messagingSenderId: "872884534199",
    appId: "1:872884534199:web:9338478fe31d4dc55e4632",
    measurementId: "G-XPSFVM9YQX"
  

});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage}
//   export default firebaseConfig;









// to deploy into the firebase do the following :- 
// firebase login  (incase of error delete firebase.ps1) 
// firebase init 
// npm run build 
// firebase deploy