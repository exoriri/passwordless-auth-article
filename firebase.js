import firebase from 'firebase/app';

import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyAWDuG2xVkgcPryHMYkcLtAIlv2u3V94w4",
    authDomain: "passwordless-article.firebaseapp.com",
    projectId: "passwordless-article",
    storageBucket: "passwordless-article.appspot.com",
    messagingSenderId: "937656271110",
    appId: "1:937656271110:web:47b8bd2fbb243a4ac61e87",
    measurementId: "G-99ZEBGL6KQ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

export default firebase;