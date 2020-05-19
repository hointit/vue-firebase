import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

import "firebase/auth";
// import "firebase/firestore";
import "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAhimBXQsSSXbsrEg2Q1wG2cxLqELanA7M",
    authDomain: "vjp-com.firebaseapp.com",
    databaseURL: "https://vjp-com.firebaseio.com/",
    projectId: "vjp-com",
    storageBucket: "vjp-com.appspot.com",
    messagingSenderId: "454526136890",
    appId: "1:454526136890:web:e6026439f077f8aff53b03",
    measurementId: "G-FMKX9Q3ZP6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var fb = {
    database: firebase.database(),
    auth: firebase.auth(),
}
export default fb;