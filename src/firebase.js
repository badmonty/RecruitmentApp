import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
      
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: "AIzaSyCIJdTZO8kBU10QBAuf3FckhhWDT2MbvKE",
    authDomain: "recruitmentapp-1fd3b.firebaseapp.com",
    projectId: "recruitmentapp-1fd3b",
    storageBucket: "recruitmentapp-1fd3b.appspot.com",
    messagingSenderId: "45723745502",
    appId: "1:45723745502:web:28a6421f44e932d5c2d64f",
    measurementId: "G-Z65T22BCTK"
  

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