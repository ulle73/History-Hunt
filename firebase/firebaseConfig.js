import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAnHGgfWGEt3z-rSL6NOTmIPWxlGecXclg",
  authDomain: "historyhunt-12cfa.firebaseapp.com",
  databaseURL: "https://historyhunt-12cfa-default-rtdb.firebaseio.com",
  projectId: "historyhunt-12cfa",
  storageBucket: "historyhunt-12cfa.appspot.com",
  messagingSenderId: "442645597739",
  appId: "1:442645597739:web:402e7b53d88bf1dfe4246e",
  measurementId: "G-9S8ZTTJYMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export { app, storage };
