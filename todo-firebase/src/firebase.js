
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCEAHvyGiVCRfL96DU15eZWklRr8Yg82ZY",
  authDomain: "todo-app-b5bb3.firebaseapp.com",
  projectId: "todo-app-b5bb3",
  storageBucket: "todo-app-b5bb3.appspot.com",
  messagingSenderId: "863136233624",
  appId: "1:863136233624:web:b38dd9f14e51237c40f8ed",
  databaseURL: "https://todo-app-b5bb3-default-rtdb.firebaseio.com/" //This is to be added by me
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//What is this initializing of firebase?
//This is the initialization of the firebase app with the firebase configuration object.
//This is done using the initializeApp function from the firebase/app module.
//This function takes the firebase configuration object as an argument.