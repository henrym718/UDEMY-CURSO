import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB0J_xYX0SHXizmWnqlsLsfb01hzn3KUzg",
  authDomain: "kaber-1c224.firebaseapp.com",
  databaseURL: "https://kaber-1c224.firebaseio.com",
  projectId: "kaber-1c224",
  storageBucket: "kaber-1c224.appspot.com",
  messagingSenderId: "766189462284",
  appId: "1:766189462284:web:53f3c1fc03b2a6d2bb9f29",
};

export const firebaseapp = firebase.initializeApp(firebaseConfig);
